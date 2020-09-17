const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'public')));

app.use((req,res,next) => {
  console.log('This is the first middleware, so it\'s executed first allways');
  next();
});

/* Moved int admin route

  *  app.use('/add-product',(req,res, next) => {
  *    console.log('Second middleware, sending the form...');
  *    res.send(`
  *      <form action="/product" method="POST">
  *        <input type="text" name="title"/>
  *        <button type="submit">Add Product</button>
  *      </form>
  *    `);
  *  });


  *  app.post('/product', (req, res, next) => {
  *    console.log('Request body...');
  *    console.log(req.body);
  *    res.redirect('/')
  *  })

*/

app.use(adminRoutes);


app.use('/test',(req,res) => {
  console.log('Here, I\'m testing the routes');
  res.send('<h1>Hello from test!!</h1>');
});

app.use((req,res,next) => {
  console.log('This middleware is not executed for the route /test');
  next()
});

/* Moved int shop route
  *  router.use((req,res) => {
  *    console.log('Here, if the other middlewares called next (or has been omitted) we\'ll send the response (note that if path is ommitted, / is the default)');
  *    res.send('<h1>Hello from everywhere!!</h1>');
  *  });
*/
app.use(shopRoutes);

app.use((req,res,next) => {
  /* Replaced by sendFile
  res.status(404).send('<h1>404</h1>');
  */
  console.log('We reached the 404');
  res.sendFile(path.join(__dirname,'views','404.html'));
})

app.listen(3000, () => console.log('Up and running...'));
