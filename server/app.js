const firebase = require('firebase');
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
app.use(bpJason);
app.use(urlencodedParser);

app.listen(port, function(){
  console.log('server up on 3000');
});

firebase.initializeApp({
  serviceAccount: "./server/firebase-service-account.json",
  databaseURL:"https://angryfit-90fce.firebaseio.com/"
});

app.get("/privateData", function(req, res){

  /* This is where the magic happens. We pull the idtoken off of the request,
  verify it against our private_key, and then we return the decodedToken */
  firebase.auth().verifyIdToken(req.headers.id_token).then(function(decodedToken) {
    /* Whatever you do in here is protected by your authorization.
    WARNING: So far you are returning secret data to ANYONE who is logged in
    there is still more work to be done if you want to implement roles
    You can use the decodedToken and some logic to do that. */

    console.log(decodedToken); // Here you can see the information firebase gives you about the user
    res.send("Welcome back " + decodedToken.name + " you are now logged in!");
  })
  .catch(function(error) {
    // If the id_token isn't right, you end up in this callback function
    res.send("No secret data for you!");
  });
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
      var queryResults = client.query('select * FROM customers ORDER BY lower(lastName);');
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

/////////////////////////////Add New Customer to DB////////////////////////////////
app.post( '/addNewCustomer', function( req, res ){
  console.log( 'in addNewCustomer', req.body );
  newCustomerInfo = req.body;
  console.log('newCustomerInfo Object:', newCustomerInfo);

  var firstName = newCustomerInfo.firstName;
  var lastName = newCustomerInfo.lastName;
  var email = newCustomerInfo.email;
  var phoneNumber = newCustomerInfo.phoneNumber;
  var streetAddress = newCustomerInfo.streetAddress;
  var unitNumber = newCustomerInfo.unitNumber;
  var city = newCustomerInfo.city;
  var state = newCustomerInfo.state;
  var zip = newCustomerInfo.zip;

  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    }//end error check
    else{
      console.log("connected to DB");

      var newCustomerToSend = [];

      client.query('INSERT INTO customers (firstName, lastName, email, phoneNumber, streetAddress, unitNumber, city, state, zip) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);', [firstName, lastName, email, phoneNumber, streetAddress, unitNumber, city, state, zip]);

      //Query the DB
      var queryResults = client.query('SELECT * From customers');
      //run for each row in the query
      queryResults.on("row", function(row){
        newCustomerToSend.push(row);
      }); //end of row
      queryResults.on('end', function(){
        //we're done
        done();
        //return result as JSON version of array
        return res.json(newCustomerToSend);
      });//end of end
    }// end of else
  });// end pg connect
});//end of post

/////////////////////////Edit Existing Customer in DB///////////////////////////
app.post( '/editExistingCustomer', function( req, res ){
  console.log( 'in editExistingCustomer' );
  editCustomerInfo = req.body;
  console.log('editCustomerInfo:', editCustomerInfo);
  //assemble object to send
  var firstName = editCustomerInfo.firstName;
  var lastName = editCustomerInfo.lastName;
  var email = editCustomerInfo.email;
  var phoneNumber = editCustomerInfo.phoneNumber;
  var streetAddress = editCustomerInfo.streetAddress;
  var unitNumber = editCustomerInfo.unitNumber;
  var city = editCustomerInfo.city;
  var state = editCustomerInfo.state;
  var zip = editCustomerInfo.zip;
  var id = editCustomerInfo.id; //we need to define where this comes from, it will likely be from a get route that finds that specific customer's information

  pg.connect(connectionString, function(err, client, done){
    //check for error
    if(err){
      console.log(err);
    }//end error check
    else{
      console.log("connected to DB");
      //array to hold results
      var editCustomerInfoToSend = [];
      //send update to DB

      //query uses the customer id number in the DB to determine which customer info should be edited
      client.query('UPDATE customers SET firstName = ($1), lastName = ($2), email = ($3), phoneNumber = ($4), streetAddress = ($5), unitNumber = ($6), city = ($7), state = ($8), zip = ($9) WHERE id = ($10)', [firstName, lastName, email, phoneNumber, streetAddress, unitNumber, city, state, zip, id]);

      //Query the DB
      var queryResults = client.query('SELECT * From customers');
      //run for each row in the query
      queryResults.on("row", function(row){
        editCustomerInfoToSend.push(row);
      }); //end of row
      queryResults.on('end', function(){
        //we're done
        done();
        //return result as JSON version of array
        return res.json(editCustomerInfoToSend);

      });//end of end
    }// end of else
  });// end pg connect
}); //end of editing current customer

app.get('/customer', function(req, res){
  console.log('q is:', req.query.q);
  var searchIn = req.query.q;
  console.log('query:', searchIn);
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log('error getting search');
      res.sendStatus(500);
    }else{
      console.log('connected via search');
      var searchCustomersArray = [];
      var queryResults = client.query('SELECT * FROM customers WHERE UPPER(lastname) LIKE UPPER('+"'%"+searchIn+"%'"+')');
      queryResults.on('row', function(row){
        searchCustomersArray.push(row);
      });
      queryResults.on('end', function(){
        done();
        return res.json(searchCustomersArray);
      }); // end queryResults
    } //end else
  }); //end pg.connect
}); // end search


/////////////////////////////Add  form1_existingFit to DB////////////////////////////////
app.post( '/addFormOne', function( req, res ){
  console.log( 'in addFormOne', req.body );

  var date = req.body.date;
  var employeeID = req.body.employeeID;
  var injuries = req.body.injuries;
  var complaints = req.body.complaints;
  var surgeries = req.body.surgeries;
  var averageRideLength = req.body.averageRideLength;
  var upcomingRaces = req.body.upcomingRaces;
  var currentBikeBrand = req.body.currentBikeBrand;
  var saddleHeight = req.body.saddleHeight;
  var saddleHeightOverBars = req.body.saddleHeightOverBars;
  var saddleAngle = req.body.saddleAngle;
  var saddleSetback = req.body.saddleSetback;
  var SaddlehandlebarReach = req.body.SaddlehandlebarReach;
  var stemLength = req.body.stemLength;
  var stemAngle = req.body.stemAngle;
  var handlebarWidth = req.body.handlebarWidth;
  var handlebarBrand = req.body.handlebarBrand;
  var pedalBrandModel = req.body.pedalBrandModel;
  var shoeBrand = req.body.shoeBrand;
  var brakeLevel = req.body.brakeLevel;
  var crankLength = req.body.crankLength;
  var notes = req.body.notes;

  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    }//end error check
    else{
      console.log("connected to DB");

      var newFormOneToSend = [];

      client.query('INSERT INTO form1_existingFit (date, employeeID, injuries, complaints, surgeries, averageRideLength, upcomingRaces, currentBikeBrand, saddleHeight, saddleHeightOverBars, saddleAngle, saddleSetback, SaddlehandlebarReach, stemLength, stemAngle, handlebarWidth, handlebarBrand, pedalBrandModel, shoeBrand, brakeLevel, crankLength, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22);', [date, employeeID, injuries, complaints, surgeries, averageRideLength, upcomingRaces, currentBikeBrand, saddleHeight, saddleHeightOverBars, saddleAngle, saddleSetback, SaddlehandlebarReach, stemLength, stemAngle, handlebarWidth, handlebarBrand, pedalBrandModel, shoeBrand, brakeLevel, crankLength, notes]);

      //Query the DB
      var queryResults = client.query('SELECT * FROM form1_existingFit ORDER BY form1id DESC LIMIT 1');
      //run for each row in the query
      queryResults.on("row", function(row){
        newFormOneToSend.push(row);
      }); //end of row
      queryResults.on('end', function(){
        //we're done
        done();
        //return result as JSON version of array
        return res.json(newFormOneToSend);

      });//end of end
    }// end of else
  });// end pg connect
});//end of post

/////////////////////////////Add Form 2: New Fit to DB////////////////////////////////
app.post( '/addForm2NewFit', function( req, res ){
  // console.log( 'in addForm2NewFit', req.body );
  newForm2Object = req.body;
  console.log('newForm2Object Object:', newForm2Object);
  var form2Date = newForm2Object.form2Date;
  var saddleHeight = newForm2Object.saddleHeight;
  var saddleHeightOverBars = newForm2Object.saddleHeightOverBars;
  var saddleToHandlebarReach = newForm2Object.saddleToHandlebarReach;
  var saddleAngle = newForm2Object.saddleAngle;
  var saddleForeAft = newForm2Object.saddleForeAft;
  var saddleBrandAndWidth = newForm2Object.saddleBrandAndWidth;
  var handleBarBrandAndModel = newForm2Object.handleBarBrandAndModel;
  var stemLength =newForm2Object.stemLength;
  var stemAngle =newForm2Object.stemAngle;
  var handleBarWidth = newForm2Object.handleBarWidth;
  var pedalBrandAndModel = newForm2Object.pedalBrandAndModel;
  var showBrandModelSize = newForm2Object.showBrandModelSize;
  var brakeLevelPosition = newForm2Object.brakeLevelPosition;
  var crankLength = newForm2Object.crankLength;
  var standover = newForm2Object.standover;
  var stack = newForm2Object.stack;

  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    }//end error check
    else{
      console.log("connected to DB");

      var form2ToSend = [];

      client.query('INSERT INTO  form2_newFit (form2Date, saddleHeight, saddleHeightOverBars, saddleToHandlebarReach, saddleAngle, saddleForeAft, saddleBrandAndWidth, handleBarBrandAndModel, stemLength, stemAngle, handleBarWidth, pedalBrandAndModel, showBrandModelSize, brakeLevelPosition, crankLength, standover, stack) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17);', [form2Date, saddleHeight, saddleHeightOverBars, saddleToHandlebarReach, saddleAngle, saddleForeAft, saddleBrandAndWidth, handleBarBrandAndModel, pedalBrandAndModel, stemLength, stemAngle, handleBarWidth, showBrandModelSize, brakeLevelPosition, crankLength, standover, stack]);

      //Query the DB
      var queryResults = client.query('SELECT * From  form2_newFit');
      //run for each row in the query
      queryResults.on("row", function(row){
        form2ToSend.push(row);
      }); //end of row
      queryResults.on('end', function(){
        //we're done
        done();
        //return result as JSON version of array
        return res.json(form2ToSend);

      });//end of end
    }// end of else
  });// end pg connect
});//end of post

///////////////////////////////// form3_customFrameGeometry//////////////
app.post('/addFrameGeometry', function(req, res){
  console.log('req.body:', req.body);

  var date = req.body.date;
  var inseam = req.body.inseam;
  var torso = req.body.torso;
  var arm = req.body.arm;
  var footLength = req.body.footLength;
  var effectiveTopTube = req.body.effectiveTopTube;
  var standover = req.body.standover;
  var seatTubeLength = req.body.seatTubeLength;
  var seatTubeAngle = req.body.seatTubeAngle;
  var headTubeLength = req.body.seatTubeLength;
  var headTubeAngle = req.body.headTubeAngle;
  var stack = req.body.stack;
  var reach = req.body.reach;
  var wheelBase = req.body.wheelBase;
  var chainstayLength = req.body.chainstayLength;
  var bbDrop = req.body.bbDrop;
  var axleToCrown = req.body.axleToCrown;
  var mechanicalTrail = req.body.mechanicalTrail;
  var forkOffset = req.body.forkOffset;

      pg.connect(connectionString, function(err, client, done){
      //check for error
      if(err){
        console.log(err);
      }//end error check
      else{
        console.log("connected to DB");
        //array to hold results
        var frameGeomoetry = [];
        //send update to DB

        //query uses the customer id number in the DB to determine which customer info should be edited
        client.query('INSERT INTO form3_customFrameGeometry (date, inseam, torso, arm, footLength, effectiveTopTube, standover, seatTubeLength, seatTubeAngle, headTubeLength, headTubeAngle, stack, reach, wheelBase, chainstayLength, bbDrop, axleToCrown, mechanicalTrail, forkOffset) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19);', [date, inseam, torso, arm, footLength, effectiveTopTube, standover, seatTubeLength, seatTubeAngle, headTubeLength, headTubeAngle, stack, reach, wheelBase, chainstayLength, bbDrop, axleToCrown, mechanicalTrail, forkOffset]);
        //Query the DB
        var queryResults = client.query('SELECT * FROM form3_customFrameGeometry ORDER BY id DESC LIMIT 1;');
        //run for each row in the query
        queryResults.on("row", function(row){
          frameGeomoetry.push(row);
        }); //end of row
        queryResults.on('end', function(){
          //we're done
          done();
          //return result as JSON version of array
          return res.json(frameGeomoetry);

        });//end of end
      }// end of else
    });// end pg connect
});

/////////////////////////////////////  form4_customFrameDetails post route/////////////////////
app.post('/addFrameDetails', function (req, res){
  console.log("This is what the server got:", req.body);

  var date = req.body.date;
  var bikeStyle = req.body.bikeStyle;
  var bottomBracketShell = req.body.bottomBracketShell;
  var brakeCompatability= req.body.brakeCompatability;
  var brakeMount = req.body.brakeMount;
  var wheelSize = req.body.wheelSize;
  var specialFrameOptions = req.body.specialFrameOptions;
  var headTubeSize = req.body.headTubeSize;
  var forkType = req.body.forkType;
  var seatDropper = req.body.seatDropper;
  var drivetrain = req.body.drivetrain;
  var paintColor = req.body.paintColor;
  var fullCoverageFenders = req.body.fullCoverageFenders;
  var fendersPainted = req.body.fendersPainted;
  var frameNotes = req.body.frameNotes;
  var frameOptions= req.body.frameOptions;
  var paintNotes = req.body.paintNotes;

  pg.connect(connectionString, function(err, client, done){
  //check for error
    if(err){
      console.log(err);
    }//end error check
    else{
    console.log("connected to DB");
    //array to hold results
    var frameDetails = [];
    //send update to DB
    //query uses the customer id number in the DB to determine which customer info should be edited
    client.query('INSERT INTO  form4_customFrameDetails (date, bikeStyle, bottomBracketShell, brakeCompatability, brakeMount, wheelSize, specialFrameOptions, headTubeSize, forkType, seatDropper, drivetrain, paintColor, fullCoverageFenders, fendersPainted, frameNotes, frameOptions, paintNotes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17);', [date, bikeStyle, bottomBracketShell, brakeCompatability, brakeMount, wheelSize, specialFrameOptions, headTubeSize, forkType, seatDropper, drivetrain, paintColor, fullCoverageFenders, fendersPainted,frameNotes, frameOptions, paintNotes]);
    //Query the DB
    var queryResults = client.query('SELECT * FROM  form4_customFrameDetails ORDER BY id DESC LIMIT 1;');
    //run for each row in the query
    queryResults.on("row", function(row){
      frameDetails.push(row);
    }); //end of row
    queryResults.on('end', function(){
      //we're done
      done();
      //return result as JSON version of array
      return res.json(frameDetails);

      });//end of end
    }// end of else
  });// end pg connect
});

//////////////////////////////generic app.get///////////////////////////////////
app.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "../public/", file));
});
