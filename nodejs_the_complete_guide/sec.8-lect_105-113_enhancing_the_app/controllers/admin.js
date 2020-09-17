const Product = require('../models/product');
exports.getAddProduct = (req, res, next) => {
 res.render('admin/add-product', {
   pageTitle: 'Admin | Add Product',
   path: '/admin/add-product',
   activeAddProduct: true,
   css: ['product.css','forms.css']
 });
}

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => res.render('admin/product-list',{
    prods: products,
    pageTitle: 'Admin | Products',
    path: '/admin/products',
  }));
}
