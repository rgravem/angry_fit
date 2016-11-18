myApp.controller("addEmployeeController", ['$scope', '$http', '$location', function($scope, $http, $location){
  console.log('In addEmployeeController');
// hidden view to add employees
  $scope.addNewEmployee = function () {
    var newEmployeeObject = {
      firstName: $scope.firstName,
      lastName:$scope.lastName,
      email:$scope.email,
    };

    $http({
      method: 'POST',
      url: '/addNewEmployee',
      data: newEmployeeObject,
    }).then(function(employeeBack){
      console.log('success from server, added:', employeeBack.data);
      $location.path('/customerType');
    });
  };

}]);
