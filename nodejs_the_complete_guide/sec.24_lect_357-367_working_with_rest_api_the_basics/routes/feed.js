const express = require('express');

const controller = require('../controllers/feed');

const router = express.Router();

//GET /feed/posts
router.get('/posts', controller.getPosts);

//POST /feed/posts
router.post('/posts', controller.postPosts);

module.exports = router;
