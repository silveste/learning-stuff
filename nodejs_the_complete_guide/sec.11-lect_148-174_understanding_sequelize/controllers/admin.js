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
  req.user.createProduct({ title, imageUrl, price, description })
  //Product.create({ title, imageUrl, price, description, userId: req.user.id })
    .then(() => res.redirect('/'))
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode) {
    return res.redirect('/');
  }
  const { productId: id } = req.params;
  req.user.getProducts({ where: { id } })
  //Product.findByPk(id)
    .then(([product]) => {
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
  Product.update({ title, imageUrl, price, description },{ where: { id } })
    .then(() => res.redirect('/admin/products'))
    .catch(e => console.log(e));
};

exports.getProducts = (req, res, next) => {
  req.user.getProducts()
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
  //Using this way as only users that are owners will have access to delte the product. NOT IDEAL as a different user can tweak the code in the frontend to delete other users products
  //Product.destroy({ where: { id }); Alternative way
  Product.findByPk(id)
    .then(product => product.destroy())
    .then(() => res.redirect('/admin/products'))
    .catch(err => console.log(err));
}
