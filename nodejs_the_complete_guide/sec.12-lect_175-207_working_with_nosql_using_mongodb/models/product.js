const { getDb, getMongoId } = require('../util/database');
class Product {
  constructor (title, price, description, imageUrl, userId, id) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this.userId = userId;
    this._id = id ? getMongoId(id) : null;
  }



  save() {
    const db = getDb();
    if (this._id) {
      return db.collection('products').updateOne({ _id: this._id }, { $set: this });
    } else {
      return db.collection('products')
        .insertOne(this);
    }
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('products')
      .find()
      .toArray();
  }

  static findById(id) {
    const db = getDb();
    return db.collection('products').find({ _id: getMongoId(id) }).next();
  }

  static deleteById(id) {
    const db = getDb();
    return db.collection('products').deleteOne({_id: getMongoId(id) })
  }
}

module.exports = Product;
