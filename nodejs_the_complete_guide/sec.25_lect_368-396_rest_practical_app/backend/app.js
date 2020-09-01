const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const router = express.Router();

const app = express();

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'images') ,
  filename: (req, file ,cb) => cb(null, new Date().toISOString() + '-' + file.originalname)
});

const fileFilter = (req, file, cb) => {
  switch (file.mimetype) {
      case 'image/png':
      case 'image/jpg':
      case 'image/jpeg':
      case 'image/gif':
        cb(null,true);
        break;
      default:
        cb(null,false);
  }
}

app.use(bodyParser.json());
app.use(multer({storage: fileStorage, fileFilter}).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res ,next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})

app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

app.use((error,req,res,next) => {
  console.log(error);
  const { statusCode, message, errors } = error;
  res.status(statusCode).json({ message, errors });
})

mongoose.connect('mongodb://localhost/blog')
  .then(() => app.listen(8080))
  .catch(e => console.log(e));
