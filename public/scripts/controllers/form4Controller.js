myApp.controller("form4Controller", ['$scope', '$http',function($scope, $http){
  console.log('In form4Controller');
  var bike = JSON.parse(sessionStorage.getItem('selectedBike'));
  var employee = JSON.parse(sessionStorage.getItem('employee'));
  var formFour = JSON.parse(sessionStorage.getItem('formFour'));
  var obj = JSON.parse(sessionStorage.getItem('customer'));

  $scope.date= new Date();
  // set form to edit and submit status
  //show submit button, hide update and pdf
  $scope.showHideSubmitFormFour = true;
  //keep all input fields active
  $scope.submittedFour=false;
  // hide Save
  $scope.showSaveFour = false;

  // show bottom bracket other
  $scope.showBottomBracketOther = false;
  $scope.updateShowBottomBracket= function(){
    $scope.showBottomBracketOther= true;
  };
  //hide bottom bracket other
  $scope.updateHideBottomBracket = function(){
    $scope.showBottomBracketOther = false;
  };

  // show brakes other
  $scope.showBrakeOther = false;
  $scope.updateShowBrakes = function(){
    $scope.showBrakeOther = true;
    };
  // hide brakes other
  $scope.updateHideBrakes = function(){
    $scope.showBrakeOther = false;
  } ;

  //show brake mount
  $scope.showBrakeMount = false;
  $scope.updateShowBrakeMount = function(){
      $scope.showBrakeMount= true;
  };
  //hide brake mount
  $scope.updateHideBrakeMount = function(){
    $scope.showBrakeMount = false;
  };

  // show wheels other
  $scope.showWheelsOther = false;
  $scope.updateShowWheels= function(){
    $scope.showWheelsOther = true;
  };
  // hide wheels other
  $scope.updateHideWheels= function(){
    $scope.showWheelsOther = false;
  };

  // Show Dropout Specs
  $scope.showDropoutSpecs = false;
  $scope.updateShowDropoutSpecs = function(){
    $scope.showDropoutSpecs = !$scope.showDropoutSpecs;
  };

  // Show Thru Axle
  $scope.showThruAxle= false;
  $scope.updateShowThruAxle= function(){
    $scope.showThruAxle = !$scope.showThruAxle;
  };

  //show custom dropout other
  $scope.customDropoutSpacing = false;
  $scope.updateCustomDropoutSpacing = function(){
    $scope.customDropoutSpacing = true;
  };
  // hide custom dropout other
  $scope.updateHideCustomDropoutSpacing = function(){
    $scope.customDropoutSpacing = false;
  };

  //show standard fork
  $scope.showStandardFork = false;
  $scope.updateShowStandardFork = function(){
    $scope.showStandardFork = true;
    $scope.showCustomFork=false;
  };

  //  show custom fork
  $scope.showCustomFork = false;
  $scope.updateShowCustomFork =function(){
    $scope.showCustomFork = true;
    $scope.showStandardFork = false;
  };

  // show dropper
  $scope.showDropper = false;
  $scope.updateShowDropper = function(){
    $scope.showDropper = true;
  };
  $scope.updateHideDropper = function(){
    $scope.showDropper = false;
  };

  //show single speed in
  $scope.showSingleSpeed = false;
  $scope.updateShowSingleSpeed = function(){
    $scope.showSingleSpeed = true;
  };
  //Hide Single Speed in
    $scope.updateHideSingleSpeed = function(){
      $scope.showSingleSpeed = false;
    };

  // show geared hub in
  $scope.showGearedHub = false;
  $scope.updateShowGearedHub = function(){
    $scope.showGearedHub = true;
  };
  //hide geared hub in
    $scope.updateHideGearedHub = function(){
      $scope.showGearedHub = false;
    };

  // show custom paint
  $scope.showCustomPaint = false;
  $scope.updateShowCustomPaint = function(){
    $scope.showCustomPaint = true;
  };
  $scope.updateHideCustomPaint = function(){
    $scope.showCustomPaint = false;
  };

  //show fender paint
  $scope.showFenderPaint = false;
  $scope.updateShowFenderPaint = function(){
    $scope.showFenderPaint =true;
  };
  $scope.updateHideFenderPaint = function(){
    $scope.showFenderPaint =false;
  };

  $scope.submitButton = function(){
    if (formFour == undefined) {
      console.log('starting new');
    } else if(formFour[0] !== undefined) {
    $scope.showHideSubmitFormFour = false;
    $scope.submittedFour = true;
  }
  };
  $scope.submitButton();

  ////////////////FORM 4 POST Route to DB///////////////////////////////////////
  $scope.submitFormFour = function(){
    console.log("In Submit Form Four");
    console.log($scope.customOrStandardFork);
    //initialize frame options array
    $scope.frameOptions=[];
    // initialize fork varaiable
    $scope.fork =[];

    //brake mounting if
    if($scope.brakeMount=== undefined){
      //give value if none
      $scope.brakeMount = "N/A";
    }
    //generate frame options array
    createFrameOptions();
    //generate fork type
    forkType();

    var formFourObject = {
      // employeeCreated: employee.employeeid,
      // bikeId: bike.bikeid,
      date: $scope.date.toString().substring(0,15),
      bikeType: $scope.bikeType,
      bottomBracketShell:$scope.bottomBracketShell,
      brakeCompatability: $scope.brakeCompatability,
      brakeMount:$scope.brakeMount,
      wheelSize: $scope.wheelSize,
      specialFrameOptions: $scope.specialFrameOptions,
      headTubeSize: $scope.headtube,
      forkType: $scope.fork,
      seatDropper: $scope.seatDropperBrand + " " + $scope.seatDropperModel,
      drivetrain:  $scope.drivetrain,
      paintColor: $scope.paintColor,
      fullCoverageFenders: $scope.fullCoverageFenders,
      fendersPainted: $scope.fendersPainted,
      frameNotes: $scope.frameNotes,
      frameOptions: $scope.frameOptions,
      paintNotes: $scope.paintNotes
    };

    console.log(formFourObject);
    //hide submit, show update and pdf
    $scope.showHideSubmitFormFour = false;
    //disable input fields
    $scope.submittedFour = true;

    $http({
      method: 'POST',
      url: '/addFormFour',
      data: formFourObject
    }).then(function(form4Response){
      console.log('success from server', form4Response);
      sessionStorage.setItem('formFour', JSON.stringify(form4Response.data));
    });
  }; //End submitFormFour

  ////////////////FORM 4 PUT(Update) Route to DB///////////////////////////////////////
  $scope.saveFormFour = function(){
    console.log("In Update Form Four");
    console.log($scope.customOrStandardFork);
    //show update
    $scope.hideUpdateFour = true;
    //hide save
    $scope.showSaveFour = false;
    // lock form
    $scope.submittedFour=true;

    //initialize frame options array
    $scope.frameOptions=[];
    // initialize fork varaiable
    $scope.fork =[];

    //brake mounting if
    if($scope.brakeMount=== undefined){
      //give value if none
      $scope.brakeMount = "N/A";
    }
    //generate frame options array
    createFrameOptions();
    //generate fork type
    forkType();

    var editFormFourObject ={
      employeeUpdated: employee.employeeid,
      bikeId: bike.bikeid,
      date: $scope.date.toString().substring(0,15),
      bikeType: $scope.bikeType,
      bottomBracketShell:$scope.bottomBracketShell,
      brakeCompatability: $scope.brakeCompatability,
      brakeMount:$scope.brakeMount,
      wheelSize: $scope.wheelSize,
      specialFrameOptions: $scope.specialFrameOptions,
      headTubeSize: $scope.headtube,
      forkType: $scope.fork,
      seatDropper: $scope.seatDropperBrand + " " + $scope.seatDropperModel,
      drivetrain:  $scope.drivetrain,
      paintColor: $scope.paintColor,
      fullCoverageFenders: $scope.fullCoverageFenders,
      fendersPainted: $scope.fendersPainted,
      frameNotes: $scope.frameNotes,
      frameOptions: $scope.frameOptions,
      paintNotes: $scope.paintNotes,
      // form4Id: $scope.obj.customerid
    };

    console.log(editFormFourObject);
    //hide submit, show update and pdf
    $scope.showHideSubmitFormFour = false;
    //disable input fields
    $scope.submittedFour = true;

    $http({
      method: 'PUT',
      url: '/editFormFour',
      data: editFormFourObject
    }).then(function(editForm4Response){
      console.log('success from server', editForm4Response);
      sessionStorage.setItem('formFour', JSON.stringify(editForm4Response.data));
    });
  }; //End saveFormFour


  //update Form Four
  $scope.updateFormFour = function(){
    $scope.hideUpdateFour = false;
    //show save
    $scope.showSaveFour = true;
    // unlock
    $scope.submittedFour=false;
    //
  };

  $scope.downloadFormFourPdf = function(){
    console.log("In the PDF click");
    var docDefinition =
      {pageOrientation: 'landscape',
      content: [
        {
          text: 'Custom Frame Details',
          style: 'header',
          bold: true,
          margin: [ 1, 2, 5, 5 ]
        },
        {text: "Name:" },
        {text: '' + obj.firstname + ' ' + obj.lastname, margin: [ 1, 2, 5, 9 ], bold: true},

        {text: "Phone:" },
        {text: '' + obj.phonenumber, margin: [ 1, 2, 5, 9 ], bold: true},

        {text: "Email:" },
        {text: '' + obj.email, margin: [ 1, 2, 5, 9 ], bold: true},

        {text: "Address:"},
        {text: '' + obj.streetaddress + ' ' + obj.unitnumber + ' ' + obj.city + ' ' + obj.state + ' ' + obj.zip, margin: [ 1, 2, 5, 9 ], bold: true},

        {text:"Date: " + '' + '' + $scope.date.toString().substring(0,15), margin: [ 1, 2, 5, 9 ], bold: true},

        {text: "Bike Style: "},
        {text: '' + $scope.bikeStyle, margin: [ 1, 2, 5, 9 ], bold: true},

        {text: "Bottom Bracket Shell: "},
        {text: '' + $scope.bottomBracketShell, margin: [ 1, 2, 5, 9 ], bold: true},

        {text: "Brake Compatability: "},
        {text: '' + $scope.brakeCompatability, margin: [ 1, 2, 5, 9 ], bold: true},

        {text: "Brake Mount: "},
        {text: '' + $scope.brakeMount, margin: [ 1, 2, 5, 9 ], bold: true},

        {text: "Wheel Size: "},
        {text: '' + $scope.wheelSize, margin: [ 1, 2, 5, 9 ], bold: true},

        {text: "Special Frame Options: "},
        {text: '' + $scope.specialFrameOptions, margin: [ 1, 2, 5, 9 ], bold: true},

        {text: "Head Tube Size: "},
        {text: '' + $scope.headtube, margin: [ 1, 2, 5, 9 ], bold: true},

        {text: "Fork Type: "},
        {text: '' + $scope.fork, margin: [ 1, 2, 5, 9 ], bold: true},

        {text: "Seat Dropper: "},
        {text: '' + $scope.seatDropperBrand + " " + $scope.seatDropperModel, margin: [ 1, 2, 5, 9 ], bold: true},

        {text: "Drive Train: "},
        {text: '' + $scope.drivetrain, margin: [ 1, 2, 5, 9 ], bold: true},

        {text: "Paint Color: "},
        {text: '' + $scope.paintColor, margin: [ 1, 2, 5, 9 ], bold: true},

        {text: "Full Coverage Fenders: "},
        {text: '' + $scope.fullCoverageFenders, margin: [ 1, 2, 5, 9 ], bold: true},

        {text: "Fenders Painted: "},
        {text: '' + $scope.fendersPainted, margin: [ 1, 2, 5, 9 ], bold: true},

        {text: "Frame Notes: "},
        {text: '' + $scope.frameNotes, margin: [ 1, 2, 5, 9 ], bold: true},

        {text: "Frame Options: "},
        {text: '' + $scope.frameOptions, margin: [ 1, 2, 5, 9 ], bold: true},

        {text: "Paint Notes: "},
        {text: '' + $scope.paintNotes, margin: [ 1, 2, 5, 9 ], bold: true},
      ]// end content
    };// end doc docDefinition
    pdfMake.createPdf(docDefinition).download('customFrameDetails.pdf');
  };

  //   // save form on click
  // $scope.saveFormFour= function(){
  //   //show update
  //   $scope.hideUpdateFour = true;
  //   //hide save
  //   $scope.showSaveFour = false;
  //   // lock form
  //   $scope.submittedFour=true;
  //
  //   };

  var createFrameOptions = function(){
    // third water bottle option is true
    if($scope.thirdBottle){
      $scope.frameOptions.push("Third Bottle Mount");
    }
    // rack mounts is true
    if($scope.rackMounts){
      $scope.frameOptions.push("Rack Mounts");
    }
    // fenders is true
    if($scope.fullCoverageFenders){
      $scope.frameOptions.push("Full Coverage Fender Mounts");
    }
    // internal brakes is true
    if($scope.internalBrakeCable){
      $scope.frameOptions.push(" Internal Brake Cable Routing");
    }
    //rocking/sliding dropouts true
    if($scope.rockingSlidingDropouts){
      var dropoutSpecs = "Dropout Specs: " + $scope.dropoutSpecsIn;
      $scope.frameOptions.push(dropoutSpecs);
    }
    //thru axle rear drops true
    if($scope.thruAxleRear){
      var dropoutSpacing = "Thru-Axle Dropout Spacing: " + $scope.dropoutSpacingIn;
      $scope.frameOptions.push(dropoutSpacing);
    }
    // di2 true
    if($scope.di2Routing){
      $scope.frameOptions.push("Di2 Routing");
    }
    // E Tap true
    if($scope.eTapRouting){
      $scope.frameOptions.push("E Tap Routing (no routing)");
    }
    //rear rack true
    if($scope.customRearRack){
      $scope.frameOptions.push("Custom Rear Rack");
    }

    //frame pump true
    if($scope.framePump){
      $scope.frameOptions.push("Frame Pump Peg");
    }
  };

  var forkType = function(){
    if($scope.customOrStandardFork == "standard"){
      $scope.fork.push($scope.forkBrand);
      $scope.fork.push($scope.forkModel);
      console.log($scope.fork);
    }// end if standard
    else if($scope.customOrStandardFork == "custom"){
      //make fork an array
      $scope.fork = [];
      // thru axle true
      if($scope.thruAxle){
        $scope.fork.push("Thru Axle");
      }
      //mid rack true
      if($scope.frontRackMounts){
        $scope.fork.push("Front Mid Rack Mounts");
      }
      // fender mount thruAxle
      if($scope.fenderMounts){
        $scope.fork.push("Fender Mounts");
      }
      //internal routing true
      if($scope.internalRouting){
        $scope.fork.push("Internal Routing for Hub Dyno Wire");
      }
      //fork contact true
      if($scope.integratedForkContact){
        $scope.fork.push("Integrated Fork Contact for Schmidt Son Sl Hub ");
      }
      if($scope.customFrontRack){
        $scope.fork.push("Custom Front Rack(see framenotes)");
      }//last if
    } // end else if
  };// end forkType
}]);//end form4Controller
