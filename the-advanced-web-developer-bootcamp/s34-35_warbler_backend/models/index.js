const mongoose = require('mongoose');
mongoose.set('debug', (process.env.NODE_ENV !== 'production'));
mongoose.Promise = Promise;
mongoose.connect('mongodb:' + process.env.DB_PATH, {
  keepAlive: true,
  useMongoClient: true
});


module.exports.User = require('./user');
