const express = require('express');
const { body } = require('express-validator');

const controller = require('../controllers/auth');
const User = require('../models/user');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

//PUT /auth/signup
router.put(
  '/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Invalid email')
      .custom((value, { req }) => {
        return User.findOne({email: value}).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-mail address already exists');
          }
        })
      })
      .normalizeEmail(),
    body('password').trim().isLength({min: 5}),
    body('name').trim().not().isEmpty()
  ],
  controller.signup
);

//PUT /auth/signup
router.post('/login', controller.login);

//GET /admin/status
router.get('/status', isAuth, controller.getStatus);

//PUT /admin/status
router.put(
  '/status',
  isAuth,
  [
    body('status').trim().not().isEmpty()
  ],
  controller.putStatus
);

module.exports = router;
