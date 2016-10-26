myApp.controller("existingCustomerController", ['$scope', '$http', function($scope, $http){
  console.log('In existingCustomerController');

  $scope.existingCustomers = ['Jazzy', 'Brent', 'Justin', 'Ross'];
  $scope.cardClicked = function(user){
    console.log('card clicked', user);

  };
  // $scope.getExistingCustomers = function () {
  //   console.log('in getExistingCustomers');
  //   $http({
  //     method: 'GET',
  //     url: '/getExistingCustomers'
  //   }).then(function success(responseObject) {
  //     console.log('got these items from server/db:', responseObject);
  //     $scope.existingCustomers = responseObject.data;
  //   }, function error(errorObject){
  //     console.log(errorObject);
  //   });
  //   console.log($scope.existingCustomers);
  // };
  //
  // $scope.getExistingCustomers();

}]);//end existingCustomerController
