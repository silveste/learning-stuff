const express = require('express');
const { body } = require('express-validator');

const controller = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

//GET /feed/posts
router.get('/posts', isAuth, controller.getPosts);

//POST /feed/posts
router.post(
  '/posts',
  isAuth,
  [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 })
  ],
  controller.postPosts
);

//GET /feed/post/:postId
router.get('/posts/:postId', isAuth, controller.getPost);

router.put(
  '/posts/:postId',
  isAuth,
  [
    body('title').trim().isLength({ min: 5 }),
    body('content').trim().isLength({ min: 5 })
  ],
  controller.putPost);

//DELETE /feed/post/:postId
router.delete('/posts/:postId', isAuth, controller.deletePost);

module.exports = router;
