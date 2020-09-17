const express = require('express');
const { check, body } = require('express-validator/check');
const bcrypt = require('bcryptjs');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.get('/reset', authController.getReset);

router.get('/new-password/:token', authController.getNewPassword);

router.post(
  '/login',
  [
    body('email', 'Invalid credentials')
      .isEmail()
      .custom((value, { req }) => User.findOne({ email: value })
        .then(user => {
          if(user) {
            return bcrypt.compare(req.body.password, user.password)
              .then(result => {
                if(!result) return Promise.reject();
                req.user = user;
              });
          }
          return Promise.reject();
      }))
      .normalizeEmail(),
    body('password').trim()
    ],
  authController.postLogin);

router.post(
  '/signup',
  [ //Array is optional, it helps to keep the code in the same group or to externalize all checks
    check('email') // We could use body here as well
      .isEmail().withMessage('Invalid E-mail') //withMessage sets a message for tonly the check that is preceding
      .custom((value, { req }) => User.findOne({ email: value })
          .then(user => {
            if(user) return Promise.reject('E-mail already exists');
          })
      )
      .normalizeEmail(),
      body('password', 'Please enter a password with at least 5 chars') // Message set as 2nd arg is set for all checks
        .trim()
        .isLength({min: 5}),
      body('confirmPassword')
        .trim()
        .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error('Passwords do not match!');
        }
        return true;
      })
  ],
  authController.postSignup
);

router.post('/logout', authController.postLogout);

router.post('/reset', authController.postReset);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
