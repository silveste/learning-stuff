//Handlers for authentication

const db = require('../models'); //When leaving off the file node look for index.js
const jwt = require('jsonwebtoken');


const signing = function(){};

const signup = async function(req,res,next){
  try {
    let user = await db.User.create(req.body);
    let {id, username, profileImageUrl} = user;
    //jwt.sign requires two parameters to create the token
    //A payload: An object with user information is passed so that when
    //decoding the token we can find information about the user
    //A secret key usually retrieved from environment variables
    let token = jwt.sign({
      id,
      username,
      profileImageUrl
    }, process.env.SECRET_KEY);
    return res.status(200).json({
      id,
      username,
      profileImageUrl,
      token
    });
  } catch (err){
    //If validation fails the error code 11000 is generated (I think it comes from mongoose)
    if(err.code === 11000) {
      err.message = 'Sorry, the username and/or email is taken';
    }
    return next({
      status: 400,
      message: err.message
    });
  }
};

module.exports = {signing, signup};
