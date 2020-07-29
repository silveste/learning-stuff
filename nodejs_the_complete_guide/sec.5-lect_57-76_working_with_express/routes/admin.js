const path = require('path');
const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();


router.get('/add-product',(req,res, next) => {
 console.log('Second middleware, sending the form...');
 /* Replaced by res.sendFile
 res.send(`
   <form action="/product" method="POST">
     <input type="text" name="title"/>
     <button type="submit">Add Product</button>
   </form>
 `);
 */
 res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {
  console.log('Request body...');
  console.log(req.body);
  res.redirect('/')
})

module.exports = router;
