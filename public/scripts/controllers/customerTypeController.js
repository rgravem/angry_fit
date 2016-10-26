myApp.controller("customerTypeController", ['$scope', '$location', '$http', '$firebaseAuth', '$firebaseArray', function($scope, $location, $http, $firebaseAuth, $firebaseArray){
  console.log('In customerTypeController');

var auth = $firebaseAuth();

$scope.newCustomer = function(){
  console.log('new customer hit');
  $location.path('/newCustomer');
};

$scope.existingCustomer = function(){
  console.log('exisiting customer clicked');
  $location.path('/existingCustomer');
};

$scope.logOut = function(){
  auth.$signOut().then(function(){
    console.log('Logging the user out!');
  });
};

}]);//end customerTypeController
