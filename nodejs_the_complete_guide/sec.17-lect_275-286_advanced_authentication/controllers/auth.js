const crypto = require('crypto');

const bcrypt = require('bcryptjs');
const User = require('../models/user');


exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login'
  });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup'
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email })
    .then(user => {
      if (!user) {
        req.flash('error', 'Invalid credentials');
        return res.redirect('/login');
      }
      bcrypt
        .compare(password, user.password)
        .then(result => {
          if(result) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save(err => {
              console.log(err);
              return res.redirect('/');
            });
          }
          return res.redirect('/login');
        })
        .catch(e => {
          console.log(e);
          return res.redirect('/login');
        })
    })
    .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  User.findOne({ email })
    .then(user => {
      req.flash('error', 'E-mail exists already');
      if(user) return res.redirect('/signup')
      return bcrypt
        .hash(password, 12)
        .then(hashsedPwd => {
          const user = new User({
            email,
            password: hashsedPwd,
            cart: { items: [] }
          });
          return user.save();
        });
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
      .catch(e => console.log(e))
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
    .catch(e => console.log(e))
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
        .catch(e => console.log(e))
    })
    .catch(e => console.log(e))
}
