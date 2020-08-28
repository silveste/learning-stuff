const fs = require('fs');
const path = require('path');

const pdfDocument = require('pdfkit');

const Product = require('../models/product');
const Order = require('../models/order');

const ITEMS_PER_PAGE = 2;

exports.getProducts = (req, res, next) => {
  const page = Number(req.query.page || 1);
  let totalProducts;
  Product.find()
    .countDocuments()
    .then(result => {
      totalProducts = result;
      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products',
        totalProducts,
        hasNext: ITEMS_PER_PAGE * page < totalProducts,
        hasPrevious: page > 1,
        page,
        next: page + 1,
        previous: page - 1,
        last: Math.ceil(totalProducts / ITEMS_PER_PAGE),
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getIndex = (req, res, next) => {
  const page = Number(req.query.page || 1);
  let totalProducts;
  Product.find()
    .countDocuments()
    .then(result => {
      totalProducts = result;
      return Product.find()
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: 'Shop',
        path: '/',
        totalProducts,
        hasNext: ITEMS_PER_PAGE * page < totalProducts,
        hasPrevious: page > 1,
        page,
        next: page + 1,
        previous: page - 1,
        last: Math.ceil(totalProducts / ITEMS_PER_PAGE),
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCart = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items;
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: products,
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .removeFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          email: req.user.email,
          userId: req.user
        },
        products: products
      });
      return order.save();
    })
    .then(result => {
      return req.user.clearCart();
    })
    .then(() => {
      res.redirect('/orders');
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getOrders = (req, res, next) => {
  Order.find({ 'user.userId': req.user._id })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getInvoice = (req, res, next) => {
  const { orderId } = req.params;
  Order.findById(orderId)
    .then(order => {
      if (!order) return next(new Error('No order found'));
      if (order.user.userId.toString() !== req.user._id.toString()) return next(new Error('Unauthorized'));
      const invoiceName = `Invoice-${orderId}.pdf`;
      const invoicePath = path.join('data','invoices', invoiceName);

      const pdfDoc = new pdfDocument();
      // The invoice will be also stored in the server
      pdfDoc.pipe(fs.createWriteStream(invoicePath));
      pdfDoc.pipe(res);

      pdfDoc.fontSize(26).text('Invoice', {underline: true});
      pdfDoc.fontSize(12).text('-----------------------------------');
      let totalPrice = 0;
      order.products.forEach(p => {
        const { quantity, product } = p;
        const { title, price } = product
        totalPrice += (price*quantity);
        pdfDoc.text(`${title} - ${quantity} x $${price}`)
      });
      pdfDoc.text('-----------------------------------');
      pdfDoc.fontSize(16).text(`Total Price: $${totalPrice}`);
      pdfDoc.end();
      // Serving the whole file after read it
      // fs.readFile(invoicePath, (err,data) => {
      //   if(err) return next(new Error(err));
      //   res.setHeader('Content-Type', 'application/pdf');
      //   res.setHeader('Content-disposition', `inline; fileName="${invoiceName}"`);
      //   res.send(data);
      // })

      //Serving the file as a stream, avoiding loading all of it in the server memory
      // const file = fs.createReadStream(invoicePath);
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-disposition', `inline; fileName="${invoiceName}"`);
      // file.pipe(res);
    })
    .catch(e => next(e))

}
