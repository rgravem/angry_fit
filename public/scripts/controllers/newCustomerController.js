myApp.controller("newCustomerController", ['$scope', '$http', '$location','$mdToast','$animate', function($scope, $http, $location, $mdToast, $animate){
  console.log('In newCustomerController');

  //toast set Up
  $scope.toastPosition = {
    bottom: false,
    top: true,
    left: false,
    right: true
  };

  $scope.getToastPosition = function(){
    return Object.keys($scope.toastPosition)
      .filter(function(pos){return $scope.toastPosition[pos];})
      .join(' ');
  };

  $scope.showSimpleToast = function(){
    $mdToast.show(
      $mdToast.simple()
      .content($scope.firstName + " " + $scope.lastName + " has been added!")
      .position($scope.getToastPosition())
      .hideDelay(2500)
    );
  };

  $scope.verifyEmployee = function(){
    console.log("hit verify employee");
    if (sessionStorage.employee == undefined){
      alert("You must have a valid login");
      $location.path('/login');
    }
  };

  $scope.addNewCustomer = function () {
    $scope.showSimpleToast();
    var newCustomerObject = {
      firstName: $scope.firstName,
      lastName:$scope.lastName,
      email:$scope.email,
      phoneNumber:$scope.phoneNumber,
      streetAddress:$scope.streetAddress,
      unitNumber:$scope.unitNumber,
      city:$scope.city,
      state:$scope.state,
      zip:$scope.zip,
      icon:$scope.customerIcon
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
