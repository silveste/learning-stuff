const db = require('../util/database');

const Cart = require('./cart');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;

  }

  save() {
    const {title, price, imageUrl, description} = this;
    return db.query(
      'INSERT INTO products (title, price, imageUrl, description) VALUES (?,?,?,?)',
      [title, price, imageUrl, description]
    );
  }

  static deleteById(id) {
  }

  static fetchAll() {
    return db.query('SELECT * FROM products');
  }

  static findById(id) {
    return db.query('SELECT * FROM products WHERE products.id = ?', id);
  }
};
