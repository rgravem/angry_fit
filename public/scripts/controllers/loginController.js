myApp.controller("loginController", ['$scope', '$http', function($scope, $http){
  console.log('In loginController');

  // $scope.employeesInDB = [];
  //
  // $scope.getEmployees = function () {
  //   console.log('in getEmployees');
  //   $http({
  //     method: 'GET',
  //     url: '/getEmployees'
  //   }).then(function success(responseObject) {
  //     console.log('got these items from server/db:', responseObject);
  //     $scope.employeesInDB = responseObject.data;
  //   }, function error(errorObject){
  //     console.log(errorObject);
  //   });
  //   console.log($scope.employeesInDB);
  // };
  //
  // $scope.getEmployees();


}]);//end loginController
