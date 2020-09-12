const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Post = require('../models/post');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const { clearImage } = require('../util/file');

module.exports = {
  createUser: async function({ userInput }, req) {
    const { email, name, password } = userInput;
    const errors = [];
    if(!validator.isEmail(email)) errors.push({message: 'E-mail Invalid'});
    if(validator.isEmpty(password) || !validator.isLength(password, { min: 5 })) errors.push({message: 'Password too short'});
    const existingUser = await User.findOne({ email });
    if (existingUser) errors.push({message: 'User already exists'});
    if (errors.length > 0) {
      const error = new Error('Invalid Input');
      error.errors = errors;
      error.code = 422;
      throw error;
    }
    const hashedPwd = await bcrypt.hash(password, 12);
    const user = new User({ email, name, password: hashedPwd });
    const createdUser = await user.save();
    return { ...createdUser._doc, _id: createdUser._id.toString() }
  },

  login: async function({ email, password }) {
    const user = await User.findOne({ email });
    let errors = []
    if(!user) errors.push({message: 'User not found'});
    const isEqual = await bcrypt.compare(password, user.password);
    if(!isEqual) errors.push({message: 'Invalid credentials'});
    if(errors.length > 0) {
      const error = new Error('Unauthorised user');
      error.errors = errors;
      error.code = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString()
      },
      'somesupersecretsecret',
      { expiresIn: '1h' }
    );
    return { token, userId: user._id.toString() };
  },

  createPost: async function({ postInput }, req) {
    if (!req.isAuth) {
      const error = new Error('Not authenticated');
      error.code = 401;
      throw error;
    }
    const { title, content, imageUrl } = postInput;
    const errors = [];
    if(validator.isEmpty(title) || !validator.isLength(title, { min: 5 })) {
      errors.push({message: 'Invalid title'});
    }
    if(validator.isEmpty(content) || !validator.isLength(content, { min: 5 })) {
      errors.push({message: 'Invalid content'});
    }
    if(errors.length > 0) {
      const error = new Error('Invalid input(s)');
      error.errors = errors;
      error.code = 422;
      throw error;
    }
    const creator = await User.findById(req.userId);
    if (!creator) {
      const error = new Error('Invalid user');
      error.errors = [{message: 'Invalid post creator'}]
      error.code = 401;
      throw error;
    }
    const post = new Post({ title, content, imageUrl, creator });
    const createdPost = await post.save();
    console.log(creator);
    creator.posts.push(createdPost);
    await creator.save();
    return {
      ...createdPost._doc,
      _id: createdPost._id.toString(),
      updatedAt: createdPost.updatedAt.toISOString(),
      createdAt: createdPost.createdAt.toISOString(),
    }
  },

  posts: async function({ page }, req) {
    if (!req.isAuth) {
      const error = new Error('Not authenticated');
      error.code = 401;
      throw error;
    }
    if (!page) {
      page = 1;
    }
    const perPage = 2;
    const totalPosts = await Post.find().countDocuments();
    const postsMong = await Post.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * perPage)
      .limit(perPage)
      .populate('creator');
    const posts = postsMong.map(postMong => {
      return {
        ...postMong._doc,
        _id: postMong._id.toString(),
        updatedAt: postMong.updatedAt.toISOString(),
        createdAt: postMong.createdAt.toISOString(),
      }
    });
    return { posts, totalPosts }
  },

  post: async function({id}, req) {
    if (!req.isAuth) {
      const error = new Error('Not authenticated');
      error.code = 401;
      throw error;
    }
    const post = await Post.findById(id).populate('creator');
    if (!post) {
      const error = new Error('No post found!');
      error.code = 404;
      throw error;
    }
    return {
      ...post._doc,
      _id: post._id.toString(),
      updatedAt: post.updatedAt.toISOString(),
      createdAt: post.createdAt.toISOString(),
    }
  },

  updatePost: async function({id, postInput}, req) {
    if (!req.isAuth) {
      const error = new Error('Not authenticated');
      error.code = 401;
      throw error;
    }
    const post = await Post.findById(id).populate('creator');
    if (!post) {
      const error = new Error('No post found!');
      error.code = 404;
      throw error;
    }
    if(post.creator._id.toString === req.userId.toString()) {
      const error = new Error('Not authorised');
      error.code = 403;
      throw error;
    }
    const { title, imageUrl, content } = postInput;
    let errors = [];
    if(validator.isEmpty(title) || !validator.isLength(title, { min: 5 })) {
      errors.push({message: 'Invalid title'});
    }
    if(validator.isEmpty(content) || !validator.isLength(content, { min: 5 })) {
      errors.push({message: 'Invalid content'});
    }
    if(errors.length > 0) {
      const error = new Error('Invalid input(s)');
      error.errors = errors;
      error.code = 422;
      throw error;
    }
    post.title = title;
    post.content = content;
    if(imageUrl !== 'undefined') {
      post.imageUrl = imageUrl;
    }
    const updatedPost = await post.save();
    return {
      ...updatedPost._doc,
      _id: updatedPost._id.toString(),
      updatedAt: updatedPost.updatedAt.toISOString(),
      createdAt: updatedPost.createdAt.toISOString(),
    }
  },

  deletePost: async function({id},req) {
    if (!req.isAuth) {
      const error = new Error('Not authenticated');
      error.code = 401;
      throw error;
    }
    const post = await Post.findById(id);
    if(post.creator.toString() !== req.userId.toString()) {
      const error = new Error('Not authorised');
      error.code = 403;
      throw error;
    }
    clearImage(post.imageUrl);
    await Post.findByIdAndRemove(id);
    const user = await User.findById(req.userId);
    user.posts.pull(id);
    await user.save();
    return true;
  },

  user: async function(args,req) {
    if (!req.isAuth) {
      const error = new Error('Not authenticated');
      error.code = 401;
      throw error;
    }
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('No user found!');
      error.code = 404;
      throw error;
    }
    return {
      ...user._doc,
      _id: user._id.toString()
    }
  },

  updateStatus: async function({status}, req) {
    if (!req.isAuth) {
      const error = new Error('Not authenticated');
      error.code = 401;
      throw error;
    }
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error('No user found!');
      error.code = 404;
      throw error;
    }
    user.status = status;
    await user.save();
    return {
      ...user._doc,
      _id: user._id.toString()
    }
  }
}
