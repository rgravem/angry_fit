myApp.controller("addEmployeeController", ['$scope', '$http', '$location', function($scope, $http, $location){
  console.log('In addEmployeeController');

  // $scope.verifyEmployee = function(){
  //   console.log("hit verify employee");
  //   if (sessionStorage.employee == undefined){
  //     alert("You must have a valid login");
  //     $location.path('/login');
  //   }
  // };

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
