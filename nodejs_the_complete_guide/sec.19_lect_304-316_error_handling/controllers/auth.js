const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { validationResult } = require('express-validator/check');

exports.getLogin = (req, res, next) => {
  // FIX: Error format is not working as expected. check errors.array
  const errors = validationResult(req);
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    input: { email: '', password: '' },
    validationErrors: errors.array()
  });
};

exports.getSignup = (req, res, next) => {
  const errors = validationResult(req);
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    input: { email: '', password: '', confirmPassword: '' },
    validationErrors: errors.array()
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(422).render('auth/login', {
      path: '/login',
      pageTitle: 'login',
      errorMessage: errors.array()[0].msg,
      input: { email: '', password: '' },
      validationErrors: errors.array() // Note that this is showing the exact errors to the client (not secure)
    });
  }
  req.session.isLoggedIn = true;
  req.session.user = req.user;
  return req.session.save(err => {
    console.log(err);
    return res.redirect('/');
  });
};

exports.postSignup = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  console.log(email);
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(422).render('auth/signup', {
      path: '/signup',
      pageTitle: 'Signup',
      errorMessage: errors.array()[0].msg,
      input: { email, password, confirmPassword },
      validationErrors: errors.array()
    });
  }
  bcrypt
    .hash(password, 12)
    .then(hashsedPwd => {
      const user = new User({
        email,
        password: hashsedPwd,
        cart: { items: [] }
      });
      return user.save();
    })
    .then(() => res.redirect('/login'))
    .catch(e =>  console.log(e));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};

exports.getReset = (req, res, next) => {
  res.render('auth/reset', {
    path: '/reset',
    pageTitle: 'Reset Password'
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (err,buffer) => {
    if (err) {
      console.log(err);
      return res.redirect('/reset');
    }
    const token = buffer.toString('hex');
    User.findOne({email: req.body.email})
      .then(user => {
        if (!user) {
          req.flash('error',`No account found for ${req.body.email}`);
          return res.redirect('/reset');
        }
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 3600000; //1 Hour
        return user.save()
          .then(result => {
            //Send email with Token
            console.log(token);
            res.redirect('/');
          })
      })
      .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
  });
}

exports.getNewPassword = (req, res, next) => {
  const resetToken = req.params.token;
  User.findOne({
    resetToken,
    resetTokenExpiration: { $gt:  Date.now() }
   })
    .then(user => {
      if(!user) return res.redirect('/');
      res.render('auth/new-password', {
        path: '/new-password',
        pageTitle: 'New Password',
        userId: user._id.toString(),
        pwdToken: resetToken
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}

exports.postNewPassword = (req, res, next) => {
  const { password, userId, pwdToken } = req.body;
  User.findOne({
    _id: userId,
    resetToken: pwdToken,
    resetTokenExpiration: { $gt:  Date.now() }
  })
    .then(user => {
      if(!user){
        req.flash('error', 'Something went wrong, Please confirm again your email');
        return res.redirect('/reset');
      }
      return bcrypt.hash(password, 12)
        .then(hashedPwd => {
          user.password = hashedPwd,
          user.resetToken = null;
          user.resetTokenExpiration = null;
          return user.save();
        })
        .then(() => res.redirect('/login'))
        .catch(err => {
          const error = new Error(err);
          error.httpStatusCode = 500;
          return next(error);
        });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
}
