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


app.get('/getEmployees', function(req, res){
  console.log('in getEmployees route');

  pg.connect(connectionString, function (err, client, done){
    if(err){
      console.log(err);
    } else{
      console.log('connected via getEmployees');
      var employeeResultsArray = [];
      var queryResults = client.query('SELECT * FROM employees');
      queryResults.on('row', function(row){
        employeeResultsArray.push(row);
      });
      queryResults.on('end', function(){
        done();
        return res.json(employeeResultsArray);
      }); // end queryResults
    } //end else
  }); //end connect
}); //end /getEmployees



app.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "../public/", file));
});
