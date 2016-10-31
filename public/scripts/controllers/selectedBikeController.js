myApp.controller("selectedBikeController", ['$scope', '$http', function($scope, $http){
  console.log('In selectedBikeController');

  var bike = JSON.parse(sessionStorage.getItem('newBike'));
  console.log('json obj bike:', bike);

  // var obj = JSON.parse(sessionStorage.getItem('customer'));
  // console.log('customer info from other page:', obj);

  $scope.customerInfo = function(){
    var obj = JSON.parse(sessionStorage.getItem('customer'));
    console.log('customer info from other page:', obj);
    var customer = angular.element(document.querySelector( '#custInfo' ) );
    customer.append("Customer: " + obj.firstName + " " + obj.lastName + " " + "Bike Name: " + bike.bikeName);
  };

  $scope.customerInfo();
}]);//end selectedBikeController
