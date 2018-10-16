const db = require ('../models');

//User id is obtained from the route /api/:id/messages
module.exports.createMessage = async function(req, res, next){
  try {
    let message = await db.Message.create({
      text: req.body.text,
      user: req.params.id
    });
    let foundUser = await db.User.findById(req.params.id);
    foundUser.messages.push(message.id);
    await foundUser.save();
    //The api will return also information about the user that creates the message
    //avoiding the client to create another db request
    let foundMessage = await db.Message.findById(message._id).populate('user', {
      username: true,
      profileImageUrl: true
    });
    return res.status(200).json(foundMessage);
  } catch (e){
    return next(e);
  }
};

//Message id is obtained from the route /api/users/:id/messages/:message_id
module.exports.getMessage = async function(req, res, next){
  try {
    let message = await db.Message.find(req.params.message_id);
    return res.status(200).json(message);
  } catch (e){
    return next(e);
  }
};

//Message id is obtained from the route /api/users/:id/messages/:message_id
module.exports.deleteMessage = async function(req, res, next){
  try {
    let foundMessage = await db.Message.findById(req.params.message_id);
    await foundMessage.remove();
    return res.status(200).json(foundMessage);
  } catch (e){
    return next(e);
  }
};
