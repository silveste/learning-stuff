const Product = require('../models/product');
const Order = require('../models/order');

exports.getProducts = (req, res, next) => {
  Product.findAll()
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
  Product.findByPk(productId)
    .then((product) => res.render(
      'shop/product-detail',
      { pageTitle: product.title, path: '/products', product }
    ))
    .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
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
    .then(cart => cart.getProducts())
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
  let userCart;
  let quantity = 1;
  req.user.getCart()
    .then(cart => {
      userCart = cart
      return cart.getProducts({ where: { id } })
    })
    .then(([product]) => {
      if(product) {
        quantity = product.cartItem.quantity + 1;
        return product;
      }
      return Product.findByPk(id);
    })
    .then(product => userCart.addProduct(product, { through: { quantity } }))
    .then(() => res.redirect('/cart'))
    .catch(e => console.log(e));
};

exports.postCartDeleteProduct = (req,res,next) => {
  const { productId: id } = req.body;
  req.user.getCart()
    .then(cart => cart.getProducts({ where: { id } }))
    .then(([product]) => product.cartItem.destroy())
    .then(() => res.redirect('/cart'))
    .catch(e => console.log(e));
}

exports.postOrder = (req,res,next) => {
  let orderProducts;
  let fetchedCart;
  req.user.getCart()
    .then(cart => {
      fetchedCart = cart;
      return cart.getProducts()
    })
    .then(products => {
      orderProducts = products.map(product => {
        product.orderItem = { quantity: product.cartItem.quantity };
        return product;
      });
      return req.user.createOrder();
    })
    .then(order => order.addProducts(orderProducts))
    .then(() => fetchedCart.setProducts(null))
    .then(() => res.redirect('/orders'))
    .catch(e => console.log(e))
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders({ include: ['products'] })
    .then(orders => res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders
    }))
    .catch(e => console.log(e))
  ;
};
