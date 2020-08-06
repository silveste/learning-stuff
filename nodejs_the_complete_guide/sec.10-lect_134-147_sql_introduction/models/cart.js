const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct (id, price) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(fileContent);
      }
      const matchIndex = cart.products.findIndex(p => p.id === id);
      if (matchIndex >= 0) {
        const product = cart.products[matchIndex];
        cart.products.splice(matchIndex,1, {
          ...product,
          qty: product.qty + 1,
        });
      } else {
        cart.products = [...cart.products,{ id, qty: 1 }]
      }
      cart.totalPrice += Number(price);
      fs.writeFile(p, JSON.stringify(cart), err => {
        console.log(err);
      })
    });
  }

  static deleteProduct(id, price) {
    fs.readFile(p, (err, fileContent) => {
      if (err) return;
      const cart = JSON.parse(fileContent);
      const updatedCart = { ...cart };
      const product = cart.products.find(p => p.id === id);
      if (product) {
        updatedCart.totalPrice = cart.totalPrice - (price*product.qty);
        updatedCart.products = cart.products.filter(p => p.id !== id);
        fs.writeFile(p, JSON.stringify(updatedCart), err => {
          console.log(err);
        });
      }
    });
  }

  static getCart(cb) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if(err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
}
