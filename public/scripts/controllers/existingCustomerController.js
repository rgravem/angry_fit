myApp.controller("existingCustomerController", ['$scope', '$http', '$firebaseArray', '$firebaseAuth', function($scope, $http, $firebaseArray, $firebaseAuth){
  console.log('In existingCustomerController');

  var existingCustomers = ['Justin'];

  // var auth = $firebaseAuth();

  // $scope.existingCustomers = ['Jazzy', 'Brent', 'Justin', 'Ross'];
  $scope.cardClicked = function(user){
    console.log('card clicked', user);
    sessionStorage.setItem('customer', JSON.stringify(user));
    var obj = JSON.parse(sessionStorage.getItem('customer'));
    console.log('json obj:', obj);
  };

  $scope.getExistingCustomers = function () {
    console.log('in getExistingCustomers');
    $http({
      method: 'GET',
      url: '/getExistingCustomers'
    }).then(function success(responseObject) {
      console.log('got these items from server/db:', responseObject);
      $scope.existingCustomers = responseObject.data;
    }, function error(errorObject){
      console.log(errorObject);
    });
    console.log($scope.existingCustomers);
  };

  $scope.getExistingCustomers();

  $scope.searchCustomer = function(){
    console.log('search button clicked sent:', $scope.customer);
    $http({
      method: 'GET',
      url: '/customer?q=' + $scope.customer,
    }).then(function successCallback(response){
      console.log('back with:', response.data);
      $scope.existingCustomers = response.data;
    }, function errorCallback(response){
      console.log(response);
    }); // end query call
  }; // end search

}]);//end existingCustomerController
