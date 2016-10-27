myApp.controller("newCustomerController", ['$scope', '$http', '$location', function($scope, $http, $location){
  console.log('In newCustomerController');

  $scope.addNewCustomer = function () {
    var newCustomerObject = {
      firstName: $scope.firstName,
      lastName:$scope.lastName,
      email:$scope.email,
      phoneNumber:$scope.phoneNumber,
      streetAddress:$scope.streetAddress,
      unitNumber:$scope.unitNumber,
      city:$scope.city,
      state:$scope.state,
      zip:$scope.zip
    };

    console.log('newCustomerObject to send to DB:', newCustomerObject);

    $http({
      method: 'POST',
      url: '/addNewCustomer',
      data: newCustomerObject
    }).then(function(newCustomerResponse){
      console.log('success from server', newCustomerResponse);
      $location.path('/selectedCustomer');
    });
  };

}]);//end newCustomerController
