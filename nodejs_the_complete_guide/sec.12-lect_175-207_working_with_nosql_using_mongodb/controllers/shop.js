const Product = require('../models/product');
//const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
  .catch(err => console.log(err));;
};

exports.getProduct = (req, res ,next) => {
  const { productId } = req.params;
  Product.findById(productId)
    .then((product) => res.render(
      'shop/product-detail',
      { pageTitle: product.title, path: '/products', product }
    ))
    .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll()
  .then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
  .catch(err => console.log(err));
};

exports.getCart = (req, res, next) => {
  req.user.getCart()
    .then(products => {
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        //totalPrice: cart.totalPrice,
        products: products,
      });
    })
    .catch(e => console.log(e));
};

exports.postCart = (req, res, next) => {
  const { productId: id, } = req.body;
  Product.findById(id)
    .then(product => req.user.addToCart(product))
    .then(result => res.redirect('/cart'))
    .catch(e => console.log(e));
};

exports.postCartDeleteProduct = (req,res,next) => {
  const { productId: id } = req.body;
  req.user.deleteFromCart(id)
    .then(() => res.redirect('/cart'))
    .catch(e => console.log(e));
}

exports.postOrder = (req,res,next) => {
  let orderProducts;
  let fetchedCart;
  req.user.addOrder()
    .then(() => res.redirect('/orders'))
    .catch(e => console.log(e))
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders()
    .then(orders => res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders
    }))
    .catch(e => console.log(e))
  ;
};
