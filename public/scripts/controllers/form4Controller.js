myApp.controller("form4Controller", ['$scope', '$http',function($scope, $http){
  console.log('In form4Controller');

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
  //brake mounting if
  if($scope.brakeMount=== undefined){
    $scope.brakeMount = "N/A";
  }

  var formFourObject ={
    date: $scope.dateCreated,
    bikeStyle: $scope.bikeStyle,
    bottomBracketShell:$scope.bottomBracketShell,
    brakeCompatability: $scope.brakeCompatability,
    brakeMount:$scope.brakeMount
  };
  console.log(formFourObject);
}; //End submitFormFour

}]);//end form4Controller
