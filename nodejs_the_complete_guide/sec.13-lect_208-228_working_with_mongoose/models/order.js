const { Schema, model } = require('mongoose');

const orderSchema = new Schema({
  products: [{
    data: { type: Object, required: true },
    quantity: { type: Number, required: true }
  }],
  user: {
    name: { type: String, required: true },
    refId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  }
});

module.exports = model('Order', orderSchema);
