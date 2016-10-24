myApp.controller("selectedCustomerController", ['$scope', '$http', function($scope, $http){
  console.log('In selectedCustomerController');

  $scope.editExistingCustomer = function () {
    var editCustomerObject = {
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
      method: 'PUT',
      url: '/editExistingCustomer',
      data: editCustomerObject
    }).then(function(editCustomerResponse){
      console.log('success from DB', editCustomerResponse);
    });
  };

}]);//end selectedCustomerController
