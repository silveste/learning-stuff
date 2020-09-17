const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('validation-failed.');
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }
  const { email, password, name } = req.body;
  bcrypt.hash(password, 12)
    .then(sPassword => {
      const user = new User({ email, name, password: sPassword });
      return user.save()
    })
    .then(result => res.status(201).json({ message: 'User created', userId: result._id }))
    .catch(e => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
}

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  let currentUser;
  User.findOne({ email })
    .then(user => {
      if(!user) {
        const error = new Error('User unauthorized');
        error.statusCode = 401;
        error.errors = [{message: 'E-mail not found'}]
        throw error
      }
      currentUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isPasswordValid => {
      if(!isPasswordValid) {
        const error = new Error('User unauthorized');
        error.statusCode = 401;
        error.errors = [{message: 'Invalid E-mail or password'}];
        throw error;
      }
      const { email, _id } = currentUser;
      const userId = _id.toString();
      const token = jwt.sign(
        { email, userId },
        'secret',
        { expiresIn: '1h' }
      );
      res.status(200).json({ token, userId })
    })
    .catch(e => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
}

exports.getStatus = (req, res, next) => {
  User.findById(req.userId)
    .then(user => {
      if(!user) {
        const error = new Error('User unauthorized');
        error.statusCode = 401;
        error.errors = [{message: 'Invalid user Id'}]
        throw error
      }
      const { status } = user;
      res.status(200).json({status});
    })
    .catch(e => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
}

exports.putStatus = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('validation-failed.');
    error.statusCode = 422;
    error.errors = errors.array();
    throw error;
  }
  const { status } = req.body;
  User.findById(req.userId)
    .then(user => {
      if(!user) {
        const error = new Error('User unauthorized');
        error.statusCode = 401;
        error.errors = [{message: 'Invalid user Id'}]
        throw error
      }
      user.status = status;
      return user.save()
    })
    .then(res.status(200).json({message: 'status updated'}))
    .catch(e => {
      if (!e.statusCode) {
        e.statusCode = 500;
      }
      next(e);
    });
}
