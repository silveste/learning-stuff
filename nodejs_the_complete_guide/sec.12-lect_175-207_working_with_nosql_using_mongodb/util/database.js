const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = cb => {
  MongoClient.connect('mongodb://localhost/shop')
    .then(client => {
      console.log('Connected to mongodb server!');
      _db = client.db();
      cb();
    })
    .catch(e => {
      throw e;
    });
}

const getDb = () => {
  if(_db) return _db;
  throw new Error('No database found');
}

const getMongoId = id => {
  if (id instanceof mongodb.ObjectId) return id;
  return new mongodb.ObjectId(id);
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
exports.getMongoId = getMongoId;
