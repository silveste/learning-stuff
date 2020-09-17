const mongodb = require('mongodb');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body;
  const product = new Product(title, price, description, imageUrl, req.user._id);
  product.save()
  .then(result => {
    console.log('Product created');
    res.redirect('/admin/products');
  })
  .catch(e => console.log(e));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode) {
    return res.redirect('/');
  }
  const { productId: id } = req.params;
  Product.findById(id)
    .then(product => {
      if(!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode === 'true',
        product
      });
    });
};

exports.postEditProduct = (req, res, next) => {
  const {
    productId,
    title,
    imageUrl,
    price,
    description
   } = req.body;
  const product = new Product(title, price, description, imageUrl, req.user._id, productId);
  product.save()
    .then(() => res.redirect('/admin/products'))
    .catch(e => console.log(e));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
  .then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  })
  .catch(err => console.log(err));
};

exports.deleteProduct = (req, res, next ) => {
  const { productId: id } = req.body;
  Product.deleteById(id)
    .then(() => res.redirect('/admin/products'))
    .catch(err => console.log(err));
}
