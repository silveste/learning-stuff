var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');


var todoRoutes = require('./routes/todos');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req,res){
    res.sendFile("index.html");
});

app.use('/api/todos', todoRoutes);


app.listen(port, function(){
    if(process.env.C9_HOSTNAME) {
        console.log("API running on https://" + process.env.C9_HOSTNAME);
    } else {
        console.log("API running on http://localhost:" + port);
    }

});
