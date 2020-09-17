const Product = require('../models/product');
const Cart = require('../models/cart');

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
    .then(([product]) => res.render(
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
  Cart.getCart(cart =>{
    Product.fetchAll(products => {
      const detailedProds = products.reduce((acc,val) => {
        const cartProduct = cart.products.find(p => p.id === val.id);
        if (cartProduct) {
          acc.push({
            ...val,
            qty: cartProduct.qty
          });
        }
        return acc;
      },[]);
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        totalPrice: cart.totalPrice,
        products: detailedProds
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const { productId: id, } = req.body;
  Product.findById(id, (product) => {
    Cart.addProduct(id, product.price);
  })
  console.log(id);
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req,res,next) => {
  const { productId: id } = req.body;
  Product.findById(id, p => {
    Cart.deleteProduct(id, p.price);
    res.redirect('/cart');
  });
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
