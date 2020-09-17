const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const { mongoConnect } = require('./util/database');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next) =>{
  User.fetchAll()
    .then(users => {
      const { name, email, cart, _id } = users[0];
      req.user = new User(name, email, cart, _id);
      next();
    })
    .catch(e => console.log(e));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
  User.fetchAll()
    .then(result => {
      if(result.length === 0) {
        const user = new User('myname', 'myname@myemail.com');
        return user.save();
      }
    })
    .then(() => app.listen(3000))
    .catch(e => console.log(e));
});
