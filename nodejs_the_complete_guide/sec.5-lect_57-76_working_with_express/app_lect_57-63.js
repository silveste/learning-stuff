const express = require('express');

const app = express();

app.use((req,res,next) => {
  console.log('This is the first middleware, so it\'s executed first');
  next();
});

app.use((req,res,next) => {
  console.log('This is the second middleware, only executed if the first called next()');
  next()
});

app.use('/test',(req,res) => {
  console.log('Here, I\'m testing the routes');
  res.send('<h1>Hello from test!!</h1>');
});

app.use((req,res,next) => {
  console.log('This middleware is not executed for the route /test');
  next()
});

app.use((req,res) => {
  console.log('Here, if the other middlewares called next (or has been omitted) we\'ll send the response (note that if path is ommitted, / is the default)');
  res.send('<h1>Hello!! from everywhere!!</h1>');
})

app.listen(3000);
