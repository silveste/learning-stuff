const jwt = require('jsonwebtoken');

//Make sure the user is logged - Authentication
module.exports.loginRequired = function(req, res, next){
  //Usually the token comes in the headers. The header name is authorization
  //and usually has the following format:
  //Bearer TOKENCODE
  //To get the token we'll split the string. As the header authorization could be empty
  //we'll enclose the statement in a try catch block as undefined.split will cause an exception
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, payload){
      if (payload){
        return next();
      } else{
        throw new Error();
      }
    });
  } catch (e){
    return next({ status: 401, message: 'Please login first' });
  }
};

//Make sure is the correct user - Autorization
module.exports.matchUser = function(req, res, next){
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, payload){
      if (payload && payload.id === req.params.id){
        return next();
      } else {
        throw new Error();
      }
    });
  } catch (e){
    return next({ status: 401, message: 'Unauthorized' });
  }
};
