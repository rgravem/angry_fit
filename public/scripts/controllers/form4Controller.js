myApp.controller("form4Controller", ['$scope', '$http',function($scope, $http){
  console.log('In form4Controller');
  $scope.showHideSubmitFormFour = true;
  // show bottom bracket other
  $scope.showBottomBracketOther = false;
  $scope.updateShowBottomBracket= function(){
    $scope.showBottomBracketOther= !$scope.showBottomBracketOther;
    };

  // show brakes other
  $scope.showBrakeOther = false;
  $scope.updateShowBrakes = function(){
    $scope.showBrakeOther = !$scope.showBrakeOther;
    };

  //show brake mount
  $scope.showBrakeMount = false;
  $scope.updateShowBrakeMount = function(){
      $scope.showBrakeMount= !$scope.showBrakeMount;
  };

  // show wheels other
  $scope.showWheelsOther = false;
  $scope.updateShowWheels= function(){
    $scope.showWheelsOther = !$scope.showWheelsOther;
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
    $scope.customDropoutSpacing = !$scope.customDropoutSpacing;
  };

  //show standard fork
  $scope.showStandardFork = false;
  $scope.updateShowStandardFork = function(){
    $scope.showStandardFork = !$scope.showStandardFork;
  };

  //  show custom fork
  $scope.showCustomFork = false;
  $scope.updateShowCustomFork =function(){
    $scope.showCustomFork = !$scope.showCustomFork;
  };

  // show dropper
  $scope.showDropper = false;
  $scope.updateShowDropper = function(){
    $scope.showDropper = !$scope.showDropper;
  };

  //show single speed in
  $scope.showSingleSpeed = false;
  $scope.updateShowSingleSpeed = function(){
    $scope.showSingleSpeed = !$scope.showSingleSpeed;
  };

  // show geared hub in
  $scope.showGearedHub = false;
  $scope.updateShowGearedHub = function(){
    $scope.showGearedHub = !$scope.showGearedHub;
  };

  // show custom paint
  $scope.showCustomPaint = false;
  $scope.updateShowCustomPaint = function(){
    $scope.showCustomPaint = !$scope.showCustomPaint;
  };

  //show fender paint
  $scope.showFenderPaint = false;
  $scope.updateShowFenderPaint = function(){
    $scope.showFenderPaint =!$scope.showFenderPaint;
  };


  //Submit Form Four
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

    var formFourObject ={
      date: $scope.dateCreated.toString().substring(0,15),
      bikeStyle: $scope.bikeStyle,
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
    $scope.showHideSubmitFormFour = false;
    $http({
      method: 'POST',
      url: '/addFrameDetails',
      data: formFourObject
    }).then(function(form4Response){
      console.log('success from server', form4Response);
    });
  }; //End submitFormFour

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
