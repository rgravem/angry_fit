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

////////////////////////////////////////////////////////////////// GET ROUTES ////////////////////////////////////////////////////////////////////////////////////////////
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


/////////////////////////////Get all customers from DB////////////////////////////////
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

////////////////////////////////////////////////////////////////// POST ROUTES ////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////Add New Customer to DB POST Route////////////////////////////////
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
      var queryResults = client.query('SELECT * FROM customers ORDER BY customerid DESC LIMIT 1');
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

/////////////////////////////Add  form1_existingFit to DB POST Route////////////////////////////////
app.post( '/addFormOne', function( req, res ){
  console.log( 'in addFormOne', req.body );

  var date = req.body.date;
  var employeeCreated = req.body.employeeCreated;
  var bikeId = req.body.bikeId;
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

      client.query('INSERT INTO form1_existingFit (date, employeeCreated, bikeId, injuries, complaints, surgeries, averageRideLength, upcomingRaces, currentBikeBrand, saddleHeight, saddleHeightOverBars, saddleAngle, saddleSetback, SaddlehandlebarReach, stemLength, stemAngle, handlebarWidth, handlebarBrand, pedalBrandModel, shoeBrand, brakeLevel, crankLength, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23);', [date, employeeCreated, bikeId, injuries, complaints, surgeries, averageRideLength, upcomingRaces, currentBikeBrand, saddleHeight, saddleHeightOverBars, saddleAngle, saddleSetback, SaddlehandlebarReach, stemLength, stemAngle, handlebarWidth, handlebarBrand, pedalBrandModel, shoeBrand, brakeLevel, crankLength, notes]);

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

////////////////////Add Form 2: New Fit to DB POST Route/////////////////
app.post( '/addForm2NewFit', function( req, res ){
  console.log( 'in addForm2NewFit', req.body );

  var date = req.body.date;
  var employeeCreated = req.body.employeeId;
  var bikeId = req.body.bikeId;
  var saddleHeight = req.body.saddleHeight;
  var saddleHeightOverBars = req.body.saddleHeightOverBars;
  var saddleToHandlebarReach = req.body.saddleToHandlebarReach;
  var saddleAngle = req.body.saddleAngle;
  var saddleForeAft = req.body.saddleForeAft;
  var saddleBrandAndWidth = req.body.saddleBrandAndWidth;
  var handleBarBrandAndModel = req.body.handleBarBrandAndModel;
  var stemLength =req.body.stemLength;
  var stemAngle =req.body.stemAngle;
  var handleBarWidth = req.body.handleBarWidth;
  var pedalBrandAndModel = req.body.pedalBrandAndModel;
  var showBrandModelSize = req.body.showBrandModelSize;
  var brakeLevelPosition = req.body.brakeLevelPosition;
  var crankLength = req.body.crankLength;
  var standover = req.body.standover;
  var stack = req.body.stack;
  var notes = req.body.notes;

  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    }//end error check
    else{
      console.log("connected to DB");

      var form2ToSend = [];

      client.query('INSERT INTO  form2_newFit (date, employeeCreated, bikeId, saddleHeight, saddleHeightOverBars, saddleToHandlebarReach, saddleAngle, saddleForeAft, saddleBrandAndWidth, handleBarBrandAndModel, stemLength, stemAngle, handleBarWidth, pedalBrandAndModel, showBrandModelSize, brakeLevelPosition, crankLength, standover, stack, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20);', [date, employeeCreated, bikeId, saddleHeight, saddleHeightOverBars, saddleToHandlebarReach, saddleAngle, saddleForeAft, saddleBrandAndWidth, handleBarBrandAndModel, stemLength, stemAngle, handleBarWidth, pedalBrandAndModel, showBrandModelSize, brakeLevelPosition, crankLength, standover, stack, notes]);

      //Query the DB
      var queryResults = client.query('SELECT * FROM form2_newFit ORDER BY form2id DESC LIMIT 1');
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

//////////////////////// form3_customFrameGeometry POST Route///////////////////////
app.post('/addFrameGeometry', function(req, res){
  console.log('req.body:', req.body);

  var date = req.body.date;
  var employeeCreated = req.body.employeeId;
  var bikeId = req.body.bikeId;
  var inseam = req.body.inseam;
  var torso = req.body.torso;
  var arm = req.body.arm;
  var footLength = req.body.footLength;
  var effectiveTopTube = req.body.effectiveTopTube;
  var standover = req.body.standover;
  var seatTubeLength = req.body.seatTubeLength;
  var seatTubeAngle = req.body.seatTubeAngle;
  var headTubeLength = req.body.headTubeLength;
  var headTubeAngle = req.body.headTubeAngle;
  var stack = req.body.stack;
  var reach = req.body.reach;
  var wheelBase = req.body.wheelBase;
  var chainstayLength = req.body.chainstayLength;
  var bbDrop = req.body.bbDrop;
  var axleToCrown = req.body.axleToCrown;
  var mechanicalTrail = req.body.mechanicalTrail;
  var forkOffset = req.body.forkOffset;
  var notes = req.body.notes;

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
        client.query('INSERT INTO form3_customFrameGeometry (date, employeeCreated, bikeId, inseam, torso, arm, footLength, effectiveTopTube, standover, seatTubeLength, seatTubeAngle, headTubeLength, headTubeAngle, stack, reach, wheelBase, chainstayLength, bbDrop, axleToCrown, mechanicalTrail, forkOffset, notes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22);', [date, employeeCreated, bikeId, inseam, torso, arm, footLength, effectiveTopTube, standover, seatTubeLength, seatTubeAngle, headTubeLength, headTubeAngle, stack, reach, wheelBase, chainstayLength, bbDrop, axleToCrown, mechanicalTrail, forkOffset, notes]);
        //Query the DB
        var queryResults = client.query('SELECT * FROM form3_customFrameGeometry ORDER BY form3id DESC LIMIT 1;');
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

///////////////////////  form4_customFrameDetails post route///////////////////////////////////
app.post('/addFormFour', function (req, res){
  console.log("This is what the server got:", req.body);

  var date = req.body.date;
  var employeeCreated = req.body.employeeId;
  var bikeId = req.body.bikeId;
  var bikeType = req.body.bikeType;
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
    client.query('INSERT INTO  form4_customFrameDetails (date, employeeCreated, bikeId, bikeType, bottomBracketShell, brakeCompatability, brakeMount, wheelSize, specialFrameOptions, headTubeSize, forkType, seatDropper, drivetrain, paintColor, fullCoverageFenders, fendersPainted, frameNotes, frameOptions, paintNotes) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19);', [date, employeeCreated, bikeId, bikeType, bottomBracketShell, brakeCompatability, brakeMount, wheelSize, specialFrameOptions, headTubeSize, forkType, seatDropper, drivetrain, paintColor, fullCoverageFenders, fendersPainted, frameNotes, frameOptions, paintNotes]);
    //Query the DB
    var queryResults = client.query('SELECT * FROM  form4_customFrameDetails ORDER BY form4id DESC LIMIT 1;');
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

//////////////////////////////////////////////////////////////// PUT ROUTES ////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////Edit Existing Customer in DB///////////////////////////
app.put( '/editExistingCustomer', function( req, res ){
  console.log( 'in editExistingCustomer', req.body );
  //assemble object to send
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;
  var phoneNumber = req.body.phoneNumber;
  var streetAddress = req.body.streetAddress;
  var unitNumber = req.body.unitNumber;
  var city = req.body.city;
  var state = req.body.state;
  var zip = req.body.zip;
  var customerId = req.body.customerId; //we need to define where this comes from, it will likely be from a get route that finds that specific customer's information

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
      client.query('UPDATE customers SET firstName = ($1), lastName = ($2), email = ($3), phoneNumber = ($4), streetAddress = ($5), unitNumber = ($6), city = ($7), state = ($8), zip = ($9) WHERE customerId = ($10)', [firstName, lastName, email, phoneNumber, streetAddress, unitNumber, city, state, zip, customerId]);

      //Query the DB
      var queryResults = client.query('SELECT * FROM customers WHERE customerid = '+"'"+customerId+"'"+' ');
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

//////////////////////////////Edit Form 1 Route////////////////////////////////////
app.put( '/editFormOne', function( req, res ){
  console.log( 'in editFormOne' );
  console.log('editFormOne:', req.body);
  //assemble object to send
  var employeeUpdated = req.body.employeeUpdated;
  //need to hardcode bikeId for now until we have persistent data
  var bikeId = req.body.bikeId;
  var date = req.body.date;
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
    //check for error
    if(err){
      console.log(err);
    }//end error check
    else{
      console.log("connected to DB via form 1 PUT Route");
      //array to hold results
      var editFormOneResponse = [];
      //send update to DB

      //query uses the customer id number in the DB to determine which fields should be updated
      client.query('UPDATE form1_existingFit SET date = ($1), employeeUpdated = ($2), injuries = ($3), complaints = ($4), surgeries = ($5), averageRideLength = ($6), upcomingRaces = ($7), currentBikeBrand = ($8), saddleHeight = ($9), saddleHeightOverBars = ($10), saddleAngle = ($11), saddleSetback = ($12), SaddlehandlebarReach = ($13), stemLength = ($14), stemAngle = ($15), handlebarWidth = ($16), handlebarBrand = ($17), pedalBrandModel = ($18), shoeBrand = ($19), brakeLevel = ($20), crankLength = ($21), notes = ($22) WHERE bikeId = ($23)', [date, employeeUpdated,  injuries,  complaints,  surgeries,  averageRideLength,  upcomingRaces,  currentBikeBrand,  saddleHeight,  saddleHeightOverBars,  saddleAngle,  saddleSetback,  SaddlehandlebarReach,  stemLength,  stemAngle,  handlebarWidth,  handlebarBrand,  pedalBrandModel,  shoeBrand,  brakeLevel,  crankLength, notes, bikeId]);

      //Query the DB
      var queryResults = client.query('SELECT * FROM form1_existingFit ORDER BY form1id DESC LIMIT 1;');
      //run for each row in the query
      queryResults.on("row", function(row){
        editFormOneResponse.push(row);
      }); //end of row
      queryResults.on('end', function(){
        //we're done
        done();
        //return result as JSON version of array
        return res.json(editFormOneResponse);

      });//end of end
    }// end of else
  });// end pg connect
}); //end of form one edits

//////////////////////////////Edit Form 2 Route////////////////////////////////////
app.put( '/editFormTwo', function( req, res ){
  console.log( 'in editFormTwo' );
  console.log('editFormTwo:', req.body);
  //assemble object to send
  var employeeUpdated = req.body.employeeUpdated;
  //need to hardcode bikeId for now until we have persistent data
  var bikeId = req.body.bikeId;
  var date = req.body.date;
  var saddleHeight = req.body.saddleHeight;
  var saddleHeightOverBars = req.body.saddleHeightOverBars;
  var saddleToHandlebarReach = req.body.saddleToHandlebarReach;
  var saddleAngle = req.body.saddleAngle;
  var saddleForeAft = req.body.saddleForeAft;
  var saddleBrandAndWidth = req.body.saddleBrandAndWidth;
  var handleBarBrandAndModel = req.body.handleBarBrandAndModel;
  var stemLength =req.body.stemLength;
  var stemAngle =req.body.stemAngle;
  var handleBarWidth = req.body.handleBarWidth;
  var pedalBrandAndModel = req.body.pedalBrandAndModel;
  var showBrandModelSize = req.body.showBrandModelSize;
  var brakeLevelPosition = req.body.brakeLevelPosition;
  var crankLength = req.body.crankLength;
  var standover = req.body.standover;
  var stack = req.body.stack;
  var notes = req.body.notes;

  pg.connect(connectionString, function(err, client, done){
    //check for error
    if(err){
      console.log(err);
    }//end error check
    else{
      console.log("connected to DB via form 2 PUT Route");
      //array to hold results
      var editFormTwoResponse = [];
      //send update to DB

      //query uses the customer id number in the DB to determine which fields should be updated
      client.query('UPDATE form2_newFit SET employeeIdUpdated = ($1), date = ($2), saddleHeight = ($3), saddleHeightOverBars = ($4), saddleToHandlebarReach = ($5), saddleAngle = ($6), saddleForeAft = ($7), saddleBrandAndWidth = ($8), handleBarBrandAndModel = ($9), stemLength = ($10), stemAngle = ($11), handleBarWidth = ($12), pedalBrandAndModel = ($13), showBrandModelSize = ($14), brakeLevelPosition = ($15), crankLength = ($16), standover = ($17), stack = ($18), notes = ($19) WHERE bikeId = ($20)', [employeeIdUpdated, date, saddleHeight, saddleHeightOverBars, saddleToHandlebarReach, saddleAngle, saddleForeAft, saddleBrandAndWidth, handleBarBrandAndModel, stemLength, stemAngle, handleBarWidth, pedalBrandAndModel, showBrandModelSize, brakeLevelPosition, crankLength, standover, stack, notes, bikeId]);

      //Query the DB
      var queryResults = client.query('SELECT * FROM form2_newFit ORDER BY form2id DESC LIMIT 1;');
      //run for each row in the query
      queryResults.on("row", function(row){
        editFormTwoResponse.push(row);
      }); //end of row
      queryResults.on('end', function(){
        //we're done
        done();
        //return result as JSON version of array
        return res.json(editFormTwoResponse);
      });//end of end
    }// end of else
  });// end pg connect
}); //end of form two edits


//////////////////////////////Edit Form 3 Route////////////////////////////////////
app.put( '/editFormThree', function( req, res ){
  console.log( 'in editFormThree' );
  console.log('editFormThree:', req.body);
  //assemble object to send
  var employeeUpdated = req.body.employeeUpdated;
  //need to hardcode bikeId for now until we have persistent data
  var bikeId = req.body.bikeId;
  var date = req.body.date;
  var inseam = req.body.inseam;
  var torso = req.body.torso;
  var arm = req.body.arm;
  var footLength = req.body.footLength;
  var effectiveTopTube = req.body.effectiveTopTube;
  var standover = req.body.standover;
  var seatTubeLength = req.body.seatTubeLength;
  var seatTubeAngle = req.body.seatTubeAngle;
  var headTubeLength = req.body.headTubeLength;
  var headTubeAngle = req.body.headTubeAngle;
  var stack = req.body.stack;
  var reach = req.body.reach;
  var wheelBase = req.body.wheelBase;
  var chainstayLength = req.body.chainstayLength;
  var bbDrop = req.body.bbDrop;
  var axleToCrown = req.body.axleToCrown;
  var mechanicalTrail = req.body.mechanicalTrail;
  var forkOffset = req.body.forkOffset;
  var notes = req.body.notes;

  pg.connect(connectionString, function(err, client, done){
    //check for error
    if(err){
      console.log(err);
    }//end error check
    else{
      console.log("connected to DB via form 3 PUT Route");
      //array to hold results
      var editFormThreeResponse = [];
      //send update to DB

      //query uses the customer id number in the DB to determine which fields should be updated
      client.query('UPDATE form3_customFrameGeometry SET employeeUpdated = ($1), date = ($2), inseam = ($3), torso = ($4), arm = ($5), footLength = ($6), effectiveTopTube = ($7), standover = ($8), seatTubeLength = ($9), seatTubeAngle = ($10), headTubeLength = ($11), headTubeAngle = ($12), stack = ($13), reach = ($14), wheelBase = ($15), chainstayLength = ($16), bbDrop = ($17), axleToCrown = ($18), mechanicalTrail = ($19), forkOffset = ($20), notes = ($21), WHERE bikeId = ($22)', [employeeUpdated, date, inseam, torso, arm, footLength, effectiveTopTube, standover, seatTubeLength, seatTubeAngle, headTubeLength, headTubeAngle, stack, reach, wheelBase, chainstayLength, bbDrop, axleToCrown, mechanicalTrail,forkOffset, notes, bikeId]);

      //Query the DB
      var queryResults = client.query('SELECT * FROM form3_customFrameGeometry ORDER BY form3id DESC LIMIT 1;');
      //run for each row in the query
      queryResults.on("row", function(row){
        editFormThreeResponse.push(row);
      }); //end of row
      queryResults.on('end', function(){
        //we're done
        done();
        //return result as JSON version of array
        return res.json(editFormThreeResponse);

      });//end of end
    }// end of else
  });// end pg connect
}); //end of form three edits

//////////////////////////////Edit Form 4 Route////////////////////////////////////
app.put( '/editFormFour', function( req, res ){
  console.log( 'in editFormFour' );
  console.log('editFormFour:', req.body);
  var employeeUpdated = req.body.employeeUpdated;
  //need to hardcode bikeId for now until we have persistent data
  var bikeId = req.body.bikeId;
  //assemble object to send
  var date = req.body.date;
  var bikeType = req.body.bikeType;
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
      console.log("connected to DB via form 4 PUT Route");
      //array to hold results
      var editFormFourResponse = [];
      //send update to DB

      //query uses the customer id number in the DB to determine which fields should be updated
      client.query('UPDATE form4_customFrameDetails SET employeeUpdated = ($1), date = ($2), bikeType = ($3), bottomBracketShell = ($4), brakeCompatability = ($5), brakeMount = ($6), wheelSize = ($7), specialFrameOptions = ($8), headTubeSize = ($9), forkType = ($10), seatDropper = ($11), drivetrain = ($12), paintColor = ($13), fullCoverageFenders = ($14), fendersPainted = ($15), frameNotes = ($16), frameOptions = ($17), paintNotes = ($18)  WHERE bikeId = ($19)', [employeeUpdated, date, bikeType, bottomBracketShell, brakeCompatability, brakeMount, wheelSize, specialFrameOptions, headTubeSize, forkType, seatDropper, drivetrain, paintColor, fullCoverageFenders, fendersPainted, frameNotes, frameOptions, paintNotes, bikeId]);

      //Query the DB
      var queryResults = client.query('SELECT * FROM  form4_customFrameDetails ORDER BY form4id DESC LIMIT 1;');
      //run for each row in the query
      queryResults.on("row", function(row){
        editFormFourResponse.push(row);
      }); //end of row
      queryResults.on('end', function(){
        //we're done
        done();
        //return result as JSON version of array
        return res.json(editFormFourResponse);

      });//end of end
    }// end of else
  });// end pg connect
}); //end of form four edits

app.post('/addBike', function(req, res){
  console.log('in addBike with:', req.body);

  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    } else {
      console.log('in db from addBike');
      var newBikeIn = [];
      client.query('INSERT INTO bikes (customerID, bikeName, bikeType) VALUES ($1, $2, $3);', [req.body.customerID, req.body.bikeName, req.body.bikeStyle]);
      var queryResults = client.query('SELECT * FROM bikes ORDER BY bikeid DESC LIMIT 1');
      queryResults.on("row", function(row){
        newBikeIn.push(row);
      }); //end of row
      queryResults.on('end', function(){
        //we're done
        done();
        //return result as JSON version of array
        return res.json(newBikeIn);

      });//end of end
    }
  });
});

app.get('/getBikes', function(req, res){
  console.log('in getbikes query:', req.query.q);
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    } else {
      console.log('in db from getbikes');
      var bikes = [];
      var queryResults = client.query("SELECT * FROM bikes WHERE customerid='" + req.query.q + "'");
      queryResults.on('row', function(row){
        bikes.push(row);
      });
      queryResults.on('end', function(){
        done();
        return res.json(bikes);
      });
    }
  });
});

app.get('/getBikeFormOne', function(req, res){
  console.log('in form one query', req.query.q);
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    } else {
      console.log('in db from form one');
      var formOne = [];
      var queryResults = client.query("SELECT * FROM form1_existingfit WHERE bikeid='" + req.query.q + "'");
      queryResults.on('row', function(row){
        formOne.push(row);
      });
      queryResults.on('end', function(){
        done();
        return res.json(formOne);
      });
    }
  });
});

app.get('/getBikeFormTwo', function(req, res){
  console.log('in form Two query', req.query.q);
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    } else {
      console.log('in db from form Two');
      var formTwo = [];
      var queryResults = client.query("SELECT * FROM form2_newfit WHERE bikeid='" + req.query.q + "'");
      queryResults.on('row', function(row){
        formTwo.push(row);
      });
      queryResults.on('end', function(){
        done();
        return res.json(formTwo);
      });
    }
  });
});

app.get('/getBikeFormThree', function(req, res){
  console.log('in form Three query', req.query.q);
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    } else {
      console.log('in db from form Three');
      var formThree = [];
      var queryResults = client.query("SELECT * FROM form3_customframegeometry WHERE bikeid='" + req.query.q + "'");
      queryResults.on('row', function(row){
        formThree.push(row);
      });
      queryResults.on('end', function(){
        done();
        return res.json(formThree);
      });
    }
  });
});

app.get('/getBikeFormFour', function(req, res){
  console.log('in form Four query', req.query.q);
  pg.connect(connectionString, function(err, client, done){
    if(err){
      console.log(err);
    } else {
      console.log('in db from form Four');
      var formFour = [];
      var queryResults = client.query("SELECT * FROM form4_customframedetails WHERE bikeid='" + req.query.q + "'");
      queryResults.on('row', function(row){
        formFour.push(row);
      });
      queryResults.on('end', function(){
        done();
        return res.json(formFour);
      });
    }
  });
});

//////////////////////////////generic app.get///////////////////////////////////
app.get("/*", function(req,res){
    var file = req.params[0] || "/views/index.html";
    res.sendFile(path.join(__dirname, "../public/", file));
});
