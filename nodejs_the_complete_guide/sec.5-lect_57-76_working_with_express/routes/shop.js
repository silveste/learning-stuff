const path = require('path');
const express = require('express');
const router = express.Router();

const rootDir = require('../util/path');

router.get('/',(req,res) => {
  console.log('Here, we get the / exact match, with .use matches the beginning so the paragraph below catches all routes that start with route \'/\')');
  /* Replaced by sendFile
  res.send('<h1>Hello from shop routes app.get!!</h1>');
  */
  /* Replaced by path using util/path
  res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
  */
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

/* Commented to show error handler
 *  router.use((req,res) => {
 *    console.log('Here, if the other middlewares called next (or has been omitted) we\'ll send the response (note that if path is ommitted, / is the default)');
 *    res.send('<h1>Hello from shop routes app.use!!</h1>');
 *  });
*/

module.exports = router;
