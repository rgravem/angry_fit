myApp.controller("form1Controller", ['$scope', '$http', function($scope, $http){
  console.log('In form1Controller');

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

    $http({
      method: 'POST',
      url: '/addFormOne',
      data: formOneObject
    }).then(function(formOneObject){
      console.log('success from server', formOneObject);
    });
  };
}]);//end form1Controller
