const express = require('express');
const router = express.Router({mergeParams: true}); //merge params allow to get access to the id inside the router

const {
  createMessage,
  getMessage,
  deleteMessage
} = require('../handlers/messages');

// prefix - /api/users/:id/messages
router.route('/').post(createMessage);

// prefix - /api/users/:id/messages/:message_id
router
  .route('/:message_id')
  .get(getMessage)
  .delete(deleteMessage);

module.exports = router;
