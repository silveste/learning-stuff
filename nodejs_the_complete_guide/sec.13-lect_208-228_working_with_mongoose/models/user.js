const { model, Schema } = require('mongoose');


const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  cart: {
    items: [
        {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true }
      }
    ]
  }
});

userSchema.methods.addToCart = function(product){
  const productId = product._id;
  const items = [...this.cart.items];
  const index = items.findIndex(i => i.productId.toString() === productId.toString());
  if (index >= 0) {
    const { quantity } = items[index];
    items[index] = { productId, quantity: quantity + 1 }
  } else {
    items.push({ productId, quantity: 1 })
  }
  this.cart = { items };
  return this.save();
};

userSchema.methods.deleteFromCart = function(productId){
  this.cart.items = this.cart.items.filter(item => item.productId.toString() !== productId.toString());
  return this.save();
}

userSchema.methods.clearCart = function() {
  this.cart = { items: [] };
  return this.save();
}

// userSchema.methods.addOrder = function() {
//   const db = getDb();
//   return this.getCart()
//     .then(cartProducts => {
//       const order = {
//         items: cartProducts,
//         user: {
//           _id: this._id,
//           name: this.name,
//           email: this.email
//         }
//       }
//       return db.collection('orders').insertOne(order);
//     })
//     .then(() => {
//       const cart = { items: [] };
//       this.cart = cart;
//       return db.collection('users').updateOne({ _id: this._id }, { $set: { cart } });
//     });
// }

// const { getDb, getMongoId } = require('../util/database');
//
// class User {
//   constructor(username, email, cart, id) {
//     this.name = username,
//     this.email = email,
//     this.cart = cart,
//     this._id = id ? getMongoId(id) : null
//   }
//
//   save() {
//     const db = getDb();
//     return db.collection('users').insertOne(this)
//   }
//

//
//   deleteFromCart(productId) {
//     if (this.cart) {
//       const items = this.cart.items.filter(item => item.productId.toString() !== productId.toString());
//       const db = getDb();
//       return db.collection('users').updateOne({ _id: this._id }, { $set: { cart: { items } } });
//     }
//   }
//
//

//
//   getOrders() {
//     const db = getDb();
//     return db.collection('orders').find({'user._id': this._id }).toArray();
//   }
//
//   static findById(id) {
//     const db = getDb();
//     return db.collection('users').findOne({ _id: getMongoId(id) });
//   }
//
//   static fetchAll() {
//     const db = getDb();
//     return db.collection('users')
//       .find()
//       .toArray();
//   }
// }

module.exports = model('User',userSchema);
