const fs = require('fs');
const path = require('path');
const rootPath = require('../util/path');

const p = path.join(rootPath,'data','products.json');

const getProductsFromFile = cb => {
  fs.readFile(p,(err,fileContent) => {
    if(err) {
      return cb([]);
    }
    cb(JSON.parse(fileContent));
  });
}
const products = [];

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imgUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    const p = path.join(rootPath,'data','products.json');
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      });
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
}
