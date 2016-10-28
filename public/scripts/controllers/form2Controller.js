myApp.controller("form2Controller", ['$scope', '$http', function($scope, $http){
  console.log('In form2Controller');
    // set form to edit and submit status
    //show submit button, hide update and pdf
  $scope.showHideSubmitFormTwo = true;
    //keep all input fields active
    $scope.submittedTwo=false;

  $scope.addForm2NewFit = function () {
    console.log('in addForm2NewFit');
    var addForm2NewFitObject = {
      form2Date: $scope.form2Date.toString().substring(0,15),
      saddleHeight: $scope.saddleHeight,
      saddleHeightOverBars:$scope.saddleHeightOverBars,
      saddleToHandlebarReach:$scope.saddleToHandlebarReach,
      saddleAngle:$scope.saddleAngle,
      saddleForeAft:$scope.saddleForeAft,
      saddleBrandAndWidth:$scope.saddleBrandAndWidth,
      stemLength:$scope.stemLength,
      stemAngle:$scope.stemAngle,
      handleBarWidth:$scope.handleBarWidth,
      handleBarBrandAndModel:$scope.handleBarBrandAndModel,
      pedalBrandAndModel:$scope.pedalBrandAndModel,
      showBrandModelSize:$scope.showBrandModelSize,
      brakeLevelPosition:$scope.brakeLevelPosition,
      crankLength:$scope.crankLength,
      standover:$scope.standover,
      stack:$scope.stack
    };

    console.log('addForm2NewFitObject to send to DB:', addForm2NewFitObject);
      //hide submit, show update and pdf
      $scope.showHideSubmitFormTwo = false;
        //disable input fields
        $scope.submittedTwo = true;
    $http({
      method: 'POST',
      url: '/addForm2NewFit',
      data: addForm2NewFitObject
    }).then(function(form2Response){
      console.log('success from server', form2Response);
    });
  };
  $scope.updateFormTwo = function(){
    //reset form to submit staus
    $scope.submittedTwo = false;
    $scope.showHideSubmitFormTwo = true;
  };
}]);//end form2Controller
