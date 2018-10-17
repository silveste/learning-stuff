const mongoose = require('mongoose');
mongoose.set('debug', (process.env.NODE_ENV !== 'production'));
mongoose.Promise = Promise;
mongoose.connect('mongodb:' + process.env.DB_PATH, { //Format: //localhost/warbler
  keepAlive: true,
  useNewUrlParser: true
  // useMongoClient: true //userMongoClient is not neccessary in mongoose 5.x
});

module.exports.User = require('./user');
module.exports.Message = require('./message');
