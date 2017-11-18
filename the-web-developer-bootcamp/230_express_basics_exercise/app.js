/* global require */

var express = require('express');
var app = express();

/* ---------------------------
    ROUTES
___________________________ */

app.get('/', function(req, res){
  res.send('Hi there, welcome to my assignment');
});

app.get('/speak/:animal', function(req, res){
  var animal = req.params.animal;
  if (animal in say ){
    res.send('The ' + animal + ' says \'' + say[animal] + '\'' );
  } else {
    res.send('The ' + animal + ' doesn\'t want to speak');
  }
});

app.get('/repeat/:word/:number', function(req,res){
  var number = parseInt(req.params.number);
  var text = req.params.word + ' ';
  for (var i = 1; i < number; i++){
    text += req.params.word + ' ';
  }
  res.send(text);
});

app.get('*', function(req, res){
  res.send('Sorry, page not found... What are you doing with your life?');
});

/* ----------------------------
    REQUEST LISTENER
------------------------------- */
app.listen(3000, function(){
    console.log('Serving on port 3000');
});

/* ----------------------------
    APP LOGIC
------------------------------- */

var say = {
  pink: 'Oink',
  cow: 'Muuuuu',
  dog: 'Woof Woof',
  cat: 'Miau',
  snake: 'Szzzzz'
};
