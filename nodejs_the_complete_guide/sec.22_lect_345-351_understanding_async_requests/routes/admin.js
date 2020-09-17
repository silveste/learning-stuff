const path = require('path');

const express = require('express');
const { body } = require('express-validator/check');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

//All admin routes are for logged users
router.use(isAuth);

// /admin/add-product => GET
router.get('/add-product',  adminController.getAddProduct);

// /admin/products => GET
router.get('/products', adminController.getProducts);

// /admin/add-product => POST
router.post(
  '/add-product',
  [
    body('title')
      .trim()
      .isString()
      .isLength({min: 3}),
    body('price')
      .isFloat(),
    body('description')
      .trim()
      .isLength({min: 5, max: 400})
  ] ,
  adminController.postAddProduct
);

router.get('/edit-product/:productId', adminController.getEditProduct);

router.post(
  '/edit-product',
  [
    body('title')
      .isString()
      .isLength({min: 3})
      .trim(),
    body('price')
      .isFloat(),
    body('description')
      .isLength({min: 5, max: 400})
      .trim(),
  ],
  adminController.postEditProduct
);

router.delete('/product/:productId', adminController.deleteProduct);

module.exports = router;
