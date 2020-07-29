const express = require('express');

const app = express();

app.use((req,res,next) => {
  console.log('First middleware');
  next();
});

app.use('/users', (req,res,next) => {
  console.log('Second middleware only executed for /users');
  res.send('<h1>Assignment 2 complete: Users</h1>');
})

app.use((req,res,next) => {
  console.log('Third middleware executed for all except /users');
  res.send('<h1>Assignment 2 complete: All except users</h1>');
})

app.listen(3000,() => console.log('Up an running...'));
