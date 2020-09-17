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
  const product = new Product(null, title, imageUrl, description, price);
  product.save()
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode) {
    return res.redirect('/');
  }
  const { productId: id } = req.params;
  Product.findById(id, product => {
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
    productId: id,
    title,
    imageUrl,
    price,
    description
   } = req.body;
  const product = new Product(id, title, imageUrl, description, price);
  product.save();
  res.redirect('/admin/products');
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
  .catch(err => console.log(err));;
};

exports.deleteProduct = (req, res, next ) => {
  const { productId: id } = req.body;
  Product.deleteById(id);
  res.redirect('/admin/products');
}
