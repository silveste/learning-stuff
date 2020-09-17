const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) =>{
  User.find()
    .then(users => {
      req.user = users[0]
      next();
    })
    .catch(e => console.log(e));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb://localhost/shop')
  .then(() => User.find())
  .then(result => {
    if(result.length === 0) {
      const user = new User({
        name: 'myname',
        email: 'myname@myemail.com',
        cart: {
          items: []
        }
      });
      return user.save();
    }
  })
  .then(() => app.listen(3000))
  .catch(e => console.log(e));
