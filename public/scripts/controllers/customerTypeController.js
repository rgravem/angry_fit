myApp.controller("customerTypeController", ['$scope', '$location', '$http', '$firebaseAuth', '$firebaseArray', function($scope, $location, $http, $firebaseAuth, $firebaseArray){
  console.log('In customerTypeController');

var auth = $firebaseAuth();

$scope.verifyEmployee = function(){
  console.log("hit verify employee");
  if (localStorage.employee == undefined){
    alert("You must have a valid login");
    $location.path('/login');
  }
};

$scope.newCustomer = function(){
  console.log('new customer hit');
  $location.path('/newCustomer');
};

$scope.existingCustomer = function(){
  console.log('exisiting customer clicked');
  $location.path('/existingCustomer');
};


}]);//end customerTypeController
