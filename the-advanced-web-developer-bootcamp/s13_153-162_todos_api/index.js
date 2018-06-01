var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000
    
    
    
app.get('/', function(req,res){
    res.send("Helllloooooo")
});


app.listen(port, function(){
    if(process.env.C9_HOSTNAME) {
        console.log("API running on https://" + process.env.C9_HOSTNAME);
    } else {
        console.log("API running on https://localhost:" + port);
    }
    
});