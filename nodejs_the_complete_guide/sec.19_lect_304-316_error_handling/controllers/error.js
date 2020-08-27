exports.get404 = (req, res, next) => {
  res.status(404).render('404', {
    pageTitle: 'Page Not Found',
    path: '/404'
  });
};

exports.get500 = (err, req, res, next) => {
  res.status(err.httpStatusCode || 500).render('500', {
    pageTitle: 'Error!',
    path: '/500'
  });
};
