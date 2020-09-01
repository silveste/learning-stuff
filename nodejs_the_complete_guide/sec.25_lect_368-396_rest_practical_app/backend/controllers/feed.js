const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator') ;
const Post = require('../models/post');
const User = require('../models/user');

exports.getPosts = (req, res ,next) => {
  const currentPage = req.query.page || 1;
  const perPage = 2;
  let totalItems;
  Post.find()
    .countDocuments()
    .then(count => {
      totalItems = count;
      return Post.find().populate('creator').skip((currentPage - 1) * perPage).limit(perPage);
    })
    .then(posts => res.status(200).json({
      message: 'Feched sucessfully',
      totalItems,
      posts
    }))
    .catch(e => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
}

exports.postPosts = (req, res ,next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty() || !req.file) {
    const error = new Error('validation failed');
    error.statusCode = 422;
    error.errors = [];
    if(!errors.isEmpty()) error.errors.push(...errors.array());
    if(!req.file) error.errors.push({message: 'no image provided'});
    throw error;
  }
  const { title, content } = req.body;
  const imageUrl = req.file.path;

  const post = new Post({
    title,
    content,
    creator: req.userId,
    imageUrl,
  })
  post.save()
    .then(() => User.findById(req.userId))
    .then(user => {
      user.posts.push(post);
      return user.save();
    })
    .then(user => {
      res.status(201)
        .json({
          message: 'Post created sucessfully!',
          post,
          creator: { _id: user._id, name: user.name }
        })
    })
    .catch(e => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
}

exports.getPost = (req, res, next ) => {
  const { postId } = req.params;
  Post.findById(postId)
    .then(post => {
      if(!post) {
        const error = new Error('Post not found');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        message: 'Post fetched',
        post
      })
    })
    .catch(e => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
}

exports.putPost = (req, res ,next) => {
  const { postId } = req.params;
  const { title, content, image } = req.body;
  let imageUrl = image;
  if (req.file) imageUrl = req.file.path
  const errors = validationResult(req);
  if (!errors.isEmpty() || !imageUrl) {
    const error = new Error('validation failed');
    error.statusCode = 422;
    error.errors = [];
    if(!errors.isEmpty()) error.errors.push(...errors.array());
    if(!imageUrl) error.errors.push({message: 'no image provided'});
    throw error;
  }
  Post.findById(postId)
    .then(post => {
      if(!post) {
        const error = new Error('Post not found');
        error.statusCode = 404;
        throw error;
      }
      if(post.creator.toString() !== req.userId) {
        const error = new Error('Unauthorised user');
        error.statusCode = 403;
        error.errors = [{message: 'Post not updated'}];
        throw error;
      }
      if(imageUrl !== post.imageUrl) clearImage(imageUrl);
      post.title = title;
      post.imageUrl = imageUrl;
      post.content = content;
      return post.save();
    })
    .then(post => {
      res.status(200).json({
        message: 'Post updated',
        post
      });
    })
    .catch(e => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
}

exports.deletePost = (req, res, next) => {
  const { postId } = req.params;
  Post.findById(postId)
    .then(post => {
      if(!post) {
        const error = new Error('Post not found');
        error.statusCode = 404;
        throw error;
      }
      if(post.creator.toString() !== req.userId) {
        const error = new Error('Unauthorised user');
        error.statusCode = 403;
        error.errors = [{message: 'Post not updated'}];
        throw error;
      }
      clearImage(post.imageUrl);
      return Post.findByIdAndRemove(postId);
    })
    .then(() => User.findById(req.userId))
    .then(user => {
      user.posts.pull(postId);
      return user.save();
    })
    .then(result => res.status(200).json({ message: 'Post deleted' }))
    .catch(e => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
}

const clearImage = fileUri => {
  filePath = path.join(__dirname, '..', fileUri);
  fs.unlink(filePath, e => console.log(e));
}
