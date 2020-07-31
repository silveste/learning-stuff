const Product = require('../models/product');
exports.getAddProduct = (req, res, next) => {
 res.render('add-product', {
   pageTitle: 'Add Product',
   path: '/admin/add-product',
   activeAddProduct: true,
   css: ['product.css','forms.css']
 });
}
exports.postAddProduct = (req, res, next) => {
  const { title } = req.body
  const product = new Product(title);
  product.save();
  res.redirect('/');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => res.render('shop',{
    prods: products,
    pageTitle: 'Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    css: ['product.css']
  }));
}
