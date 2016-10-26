myApp.controller("form3Controller", ['$scope', '$http', function($scope, $http){
  console.log('In form3Controller');

$scope.submitFrameGeometry = function(){
  console.log('complete clicked');
  var objectToSend = {
    date: $scope.frameGeometryFormDate.toString().substring(0,15),
    inseam: $scope.inseam,
  	torso: $scope.torso,
  	arm: $scope.arm,
  	footLength: $scope.footLength,
  	effectiveTopTube: $scope.effectiveTopTube,
  	standover: $scope.standover,
  	seatTubeLength: $scope.seatTubeLength,
  	seatTubeAngle: $scope.seatTubeAngle,
  	headTubeLength: $scope.headTubeLength,
  	headTubeAngle: $scope.headTubeAngle ,
  	stack: $scope.stack ,
  	reach: $scope.reach,
  	wheelBase: $scope.wheelBase ,
  	chainstayLength: $scope.chainstayLength ,
  	bbDrop: $scope.bbDrop ,
  	axleToCrown: $scope.axleToCrown ,
  	mechanicalTrail: $scope.mechanicalTrail ,
  	forkOffset: $scope.forkOffset
  };
  console.log('object to send:', objectToSend);
  $http({
      method: 'POST',
      url: '/addFrameGeometry',
      data: objectToSend
    }).then(function successCallback(response){
      console.log('back from server with:', response.data);
    }, function errorCallback(response) {
      console.log('err');
    });// end http call
}; // end addform3
}]);//end form3Controller
