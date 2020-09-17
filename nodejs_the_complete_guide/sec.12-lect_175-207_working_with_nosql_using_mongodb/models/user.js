const { getDb, getMongoId } = require('../util/database');

class User {
  constructor(username, email, cart, id) {
    this.name = username,
    this.email = email,
    this.cart = cart,
    this._id = id ? getMongoId(id) : null
  }

  save() {
    const db = getDb();
    return db.collection('users').insertOne(this)
  }

  addToCart(product) {
    const productId = getMongoId(product._id);
    let items = [{ productId, quantity: 1 }];
    if (this.cart) {
      items = [...this.cart.items];
      const index = items.findIndex(i => i.productId.toString() === product._id.toString());
      if (index >= 0) {
        const { productId, quantity } = items[index];
        items[index] = { productId, quantity: quantity + 1 }
      } else {
        items.push({ productId, quantity: 1 })
      }
    }
    const cart = { items };
    const db = getDb();
    return db.collection('users').updateOne({ _id: this._id }, { $set: { cart } });
  }

  deleteFromCart(productId) {
    if (this.cart) {
      const items = this.cart.items.filter(item => item.productId.toString() !== productId.toString());
      const db = getDb();
      return db.collection('users').updateOne({ _id: this._id }, { $set: { cart: { items } } });
    }
  }

  getCart() {
    const db = getDb();
    const { items } = this.cart;
    const productIds = items.map(p => p.productId)
    return db.collection('products')
      .find({ _id: {$in: productIds} })
      .toArray()
      .then(products => products.map(p => {
        return {
          ...p,
          quantity: items.find(i => i.productId.toString() === p._id.toString()).quantity
        }
      }));
  }

  addOrder() {
    const db = getDb();
    return this.getCart()
      .then(cartProducts => {
        const order = {
          items: cartProducts,
          user: {
            _id: this._id,
            name: this.name,
            email: this.email
          }
        }
        return db.collection('orders').insertOne(order);
      })
      .then(() => {
        const cart = { items: [] };
        this.cart = cart;
        return db.collection('users').updateOne({ _id: this._id }, { $set: { cart } });
      });
  }

  getOrders() {
    const db = getDb();
    return db.collection('orders').find({'user._id': this._id }).toArray();
  }

  static findById(id) {
    const db = getDb();
    return db.collection('users').findOne({ _id: getMongoId(id) });
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('users')
      .find()
      .toArray();
  }
}

module.exports = User;
