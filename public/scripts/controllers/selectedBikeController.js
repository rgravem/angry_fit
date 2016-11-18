myApp.controller("selectedBikeController", ['$scope', '$http', '$location', 'checkmarkService', '$state', function($scope, $http, $location, checkmarkService, $state){
  console.log('In selectedBikeController');

  var bike = JSON.parse(sessionStorage.getItem('selectedBike'));
  console.log('json obj bike:', bike);

  var formOne = JSON.parse(sessionStorage.getItem('formOne'));
  var formTwo = JSON.parse(sessionStorage.getItem('formTwo'));
  var formThree = JSON.parse(sessionStorage.getItem('formThree'));
  var formFour = JSON.parse(sessionStorage.getItem('formFour'));


  // var obj = JSON.parse(sessionStorage.getItem('customer'));
  // console.log('customer info from other page:', obj);

  $scope.customerInfo = function(){
    if (localStorage.employee == undefined){
      alert("You must have a valid login");
      $location.path('/login');
      return;
    }
    var obj = JSON.parse(sessionStorage.getItem('customer'));
    console.log('customer info from other page:', obj);
    var customer = angular.element(document.querySelector( '#custInfo' ) );
    var customerData = "<p class='bikeInfo'>"+obj.firstname+" " +obj.lastname +"'s"+ " "+bike.bikename+"</p>";
    customer.append(customerData);
  };

  $scope.customerInfo();

  $scope.verifyEmployee = function(){
    console.log("hit verify employee");
    if (localStorage.employee == undefined){
      alert("You must have a valid login");
      $location.path('/login');
    }
  };

}]);//end selectedBikeController
