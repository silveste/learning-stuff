const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')

const app = express();

const users = [];


app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/users',(req,res) => res.render('users', {pageTitle: 'Assignment 4 | Users', users, path: '/users' }));
app.post('/users',(req,res) => {
  const { user } = req.body;
  users.push(user);
  res.redirect('/');
});
app.get('/',(req,res) => res.render('index', {pageTitle: 'Assignment 4 | Index', path: '/'}));

app.listen(3000,() => console.log ('Up an running'));
