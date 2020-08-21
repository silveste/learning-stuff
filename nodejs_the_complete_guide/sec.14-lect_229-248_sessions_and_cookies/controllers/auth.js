const User = require('../models/user');

exports.getLogin = (req, res, next) => {
  res.render('auth/login', {
    path: '/login',
    pageTitle: 'Login',
    isAuth: req.session.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  const { password, email } = req.body;
  User.findOne({ password, email })
    .then(user => {
      if(user){
        req.session.userId = user._id;
        req.session.isLoggedIn = true;
      } else {
        req.session.userId = null;
        req.session.isLoggedIn = false;
      }
      req.session.save(() => res.redirect('/'));
    });
};

exports.postLogout = (req, res, next) => {
  const { password, email } = req.body;
  req.session.destroy(() => res.redirect('/'));
};
