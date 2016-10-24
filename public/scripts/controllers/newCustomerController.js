myApp.controller("newCustomerController", ['$scope', '$http', function($scope, $http){
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
      console.log('success from DB', newCustomerResponse);
    });
  };



}]);//end newCustomerController
