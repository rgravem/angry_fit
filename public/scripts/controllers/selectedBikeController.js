myApp.controller("selectedBikeController", ['$scope', '$http', function($scope, $http){
  console.log('In selectedBikeController');

  var bike = JSON.parse(sessionStorage.getItem('selectedBike'));
  console.log('json obj bike:', bike);

  console.log($scope.completedCheckNew);

  // var obj = JSON.parse(sessionStorage.getItem('customer'));
  // console.log('customer info from other page:', obj);

  $scope.customerInfo = function(){
    var obj = JSON.parse(sessionStorage.getItem('customer'));
    console.log('customer info from other page:', obj);
    var customer = angular.element(document.querySelector( '#custInfo' ) );
    var customerData = "<p class='bikeInfo'>"+obj.firstname+" " +obj.lastname +"'s"+ " "+bike.bikename+"</p>";
    customer.append(customerData);
  };

  $scope.customerInfo();
}]);//end selectedBikeController
