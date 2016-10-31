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

    $http({
      method: 'POST',
      url: '/addNewCustomer',
      data: newCustomerObject
    }).then(function(newCustomerResponse){
      console.log('success from server', newCustomerResponse.data);
      sessionStorage.setItem('customer', JSON.stringify(newCustomerResponse.data[0]));
      var obj = JSON.parse(sessionStorage.getItem('customer'));
      console.log('json obj:', obj);
      console.log('newCustomerObject to send to DB:', newCustomerResponse);
      $location.path('/selectedCustomer');
    });
  };

}]);//end newCustomerController
