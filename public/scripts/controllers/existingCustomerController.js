myApp.controller("existingCustomerController", ['$scope', '$http', '$firebaseArray', '$firebaseAuth', '$location', function($scope, $http, $firebaseArray, $firebaseAuth, $location){
  console.log('In existingCustomerController');

  var existingCustomers = ['Justin'];

  // var auth = $firebaseAuth();

  // $scope.existingCustomers = ['Jazzy', 'Brent', 'Justin', 'Ross'];
  $scope.cardClicked = function(user){
    console.log('card clicked', user);
    sessionStorage.setItem('customer', JSON.stringify(user));
    var obj = JSON.parse(sessionStorage.getItem('customer'));
    console.log('json obj:', obj.customerid);
    $http({
      method: 'GET',
      url: '/getBikes?q=' + obj.customerid,
    }).then(function success(bikes){
      console.log('bikes from server:', bikes.data);
      sessionStorage.setItem('customerBikes', JSON.stringify(bikes.data));
      var bikeList = JSON.parse(sessionStorage.getItem('customerBikes'));
      console.log('json bikeList:', bikeList);
    }, function error(errorObject){
      console.log(errorObject);
    });
    setTimeout(function(){
     $location.path('/selectedCustomer');
   }, 0);
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
