myApp.controller("customerTypeController", ['$scope', '$location', '$http', function($scope, $location, $http){
  console.log('In customerTypeController');

$scope.newCustomer = function(){
  console.log('new customer hit');
  $location.path('/newCustomer');
};

$scope.existingCustomer = function(){
  console.log('exisiting customer clicked');
  $location.path('/existingCustomer');
};

}]);//end customerTypeController
