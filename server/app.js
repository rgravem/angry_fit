var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded( { extended: true } );
var bpJason = bodyParser.json();
var path = require('path');
var port = process.env.PORT || 3000;
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/angryFit';


app.use( express.static( 'public' ) );

app.listen(port, function(){
  console.log('server up on 3000');
});

////////////////////Get Existing Customers from DB/////////////////////////////
app.get('/getExistingCustomers', function(req, res){
  console.log('in getExistingCustomers route');

  pg.connect(connectionString, function (err, client, done){
    if(err){
      console.log(err);
    } else{
      console.log('connected via getExistingCustomers');
      var existingCustomersArray = [];
      var queryResults = client.query('SELECT * FROM customers');
      queryResults.on('row', function(row){
        existingCustomersArray.push(row);
      });
      queryResults.on('end', function(){
        done();
        return res.json(existingCustomersArray);
      }); // end queryResults
    } //end else
  }); //end pg.connect
}); //end getExistingCustomers


app.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "../public/", file));
});
