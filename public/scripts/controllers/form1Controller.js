myApp.controller("form1Controller", ['$scope', '$http', function($scope, $http){
  console.log('In form1Controller');
      // set form to edit and submit status
      //show submit button, hide update and pdf
  $scope.showHideSubmitFormOne = true;
  //keep all input fields active
  $scope.submittedOne=false;
  $scope.addFormOne = function () {

    console.log('in AddFormOne button click');
    var formOneObject = {
      date: $scope.date.toString().substring(0,15),
      injuries: $scope.injuries,
      complaints:$scope.complaints,
      surgeries:$scope.surgeries,
      averageRideLength:$scope.averageRideLength,
      upcomingRaces:$scope.upcomingRaces,
      currentBikeBrand:$scope.currentBikeBrand,
      saddleHeight:$scope.saddleHeight,
      saddleHeightOverBars:$scope.saddleHeightOverBars,
      saddleAngle:$scope.saddleAngle,
      saddleSetback:$scope.saddleSetback,
      SaddlehandlebarReach:$scope.SaddlehandlebarReach,
      stemLength:$scope.stemLength,
      stemAngle:$scope.stemAngle,
      handlebarWidth:$scope.handlebarWidth,
      handlebarBrand:$scope.handlebarBrand,
      pedalBrandModel:$scope.pedalBrandModel,
      shoeBrand:$scope.shoeBrand,
      brakeLevel:$scope.brakeLevel,
      crankLength:$scope.crankLength,
      notes:$scope.notes
    };

    console.log('formOneObject to send to DB:', formOneObject);
    //hide submit, show update and pdf
    $scope.showHideSubmitFormOne = false;
    //disable input fields
    $scope.submittedOne = true;

    $http({
      method: 'POST',
      url: '/addFormOne',
      data: formOneObject
    }).then(function(formOneObject){
      console.log('success from server', formOneObject);
    });
  };
    $scope.updateFormOne = function(){
      //reset form to submit staus
      $scope.submittedOne = false;
      $scope.showHideSubmitFormOne = true;
    };
    // show injury
    $scope.showInjury = false;
    $scope.updateShowInjury = function(){
      $scope.showInjury = true;
    };
    //hide injury
    $scope.updateHideInjury = function(){
      $scope.showInjury = false;
    };

    // show surgery
    $scope.showSurgery = false;
    $scope.updateShowSurgery = function(){
      $scope.showSurgery = true;
    };
    //hide surgery
    $scope.updateHideSurgery = function(){
      $scope.showSurgery = false;
    };

    // show goals
    $scope.showGoals = false;
    $scope.updateShowGoals = function(){
      $scope.showGoals = true;
    };
    //hide goals
    $scope.updateHideGoals = function(){
      $scope.showGoals = false;
    };
}]);//end form1Controller
