myApp.controller("selectedBikeController", ['$scope', '$http', '$location', 'checkmarkService', '$state', function($scope, $http, $location, checkmarkService, $state){
  console.log('In selectedBikeController');

  var bike = JSON.parse(sessionStorage.getItem('selectedBike'));
  console.log('json obj bike:', bike);

  var formOne = JSON.parse(sessionStorage.getItem('formOne'));
  var formTwo = JSON.parse(sessionStorage.getItem('formTwo'));
  var formThree = JSON.parse(sessionStorage.getItem('formThree'));
  var formFour = JSON.parse(sessionStorage.getItem('formFour'));

  // $scope.check1 = function(){
  //   if (formOne == undefined){
  //     $scope.checkOne = false;
  //     console.log('starting new bike checkmark');
  //   }else if (formOne[0] == undefined){
  //     $scope.checkOne = false;
  //     console.log('Existing Fit has no data checkmark');
  //   } else {
  //     console.log("checkmark hit");
  //     $scope.checkOne = true;
  //   }
  // };
  // $scope.check1();
  //
  // $scope.check2 = function(){
  //   if (formTwo == undefined){
  //     $scope.checkTwo = false;
  //     console.log('starting new bike checkmark');
  //   }else if (formTwo[0] == undefined){
  //     $scope.checkTwo = false;
  //     console.log('Form 2 has no data checkmark');
  //   } else {
  //     console.log("checkmark hit");
  //     $scope.checkTwo = true;
  //   }
  // };
  // $scope.check2();
  //
  // $scope.check3 = function(){
  //   if (formThree == undefined){
  //     $scope.checkThree = false;
  //     console.log('starting new bike checkmark');
  //   }else if (formThree[0] == undefined){
  //     $scope.checkThree = false;
  //     console.log('Form 3 has no data checkmark');
  //   } else {
  //     console.log("checkmark hit");
  //     $scope.checkThree = true;
  //   }
  // };
  // $scope.check3();
  //
  // $scope.check4 = function(){
  //   if (formFour == undefined){
  //     $scope.checkFour = false;
  //     console.log('starting new bike checkmark');
  //   }else if (formFour[0] == undefined){
  //     $scope.checkFour = false;
  //     console.log('Form 4 has no data checkmark');
  //   } else {
  //     console.log("checkmark hit");
  //     $scope.checkFour = true;
  //   }
  // };
  // $scope.check4();



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
