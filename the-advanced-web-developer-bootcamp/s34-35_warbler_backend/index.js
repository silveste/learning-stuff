/*ENV vars from .env, note that dotenv is installed as a dev dependency
The if is required to avoid crashing in production alternatively could be
executed as a script in package json i.e.
"scripts": {
  "start-dev": "node -r dotenv/config index.js"
},
Note that .env file is not included in the repository
*/
(process.env.NODE_ENV !== 'production') ? require('dotenv').config(): null;

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const errorHandler = require('./handlers/error');

const PORT = process.env.PORT || 8081;
const HOSTNAME = process.env.HOSTNAME || 'http://localhost';

app.use(cors());
app.use(bodyParser.json());

//Error handler - Should be after all routes, so that if non of the routes is
//reached the error handler will be executed
app.use(function(req, res ,next){
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use(errorHandler);
app.listen(PORT, function(){
  console.log(`Server is starting on ${HOSTNAME}:${PORT}`);
});
