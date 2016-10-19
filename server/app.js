var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded( { extended: true } );
var bpJason = bodyParser.json();
var path = require('path');
var port = process.env.PORT || 3000;


app.use( express.static( 'public' ) );

app.listen(port, function(){
  console.log('server up on 3000');
});


app.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "../public/", file));
});
