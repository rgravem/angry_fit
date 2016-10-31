myApp.controller("selectedCustomerController", ['$scope', '$http', '$location', function($scope, $http, $location){
  console.log('In selectedCustomerController');

  $scope.newBikeStart = function(){
    console.log('newbike');
     $scope.newBikeButton = !$scope.newBikeButton;
  };
  $scope.clearsess = function(){
    console.log('clear clicked');
    // sessionStorage.removeItem('customer');
    console.log('obj after clear:', sessionStorage);
  };
  $scope.otherType = false;
  $scope.otherSelected = function(){
    $scope.otherType = !$scope.otherType;
  };


  // show new bike name
  $scope.showInNewBikeType = false;
  $scope.updateShowOther= function(){
    $scope.showInNewBikeType= true;
  };
  //hide new bike name
  $scope.updateHideType = function(){
    $scope.showInNewBikeType = false;
  };

  $scope.customerInfo = function(){
    var obj = JSON.parse(sessionStorage.getItem('customer'));
    console.log('customer info from other page:', obj);
    var customer = angular.element(document.querySelector( '#custInfo' ) );
    customer.append(obj.firstname + " " + obj.lastname + '</br>' + obj.email + '</br>' + obj.phonenumber + '</br>' + obj.streetaddress + ", " + obj.zip );
  };

  $scope.customerInfo();


  $scope.editExistingCustomer = function () {
    var editCustomerObject = {
      firstName: $scope.firstName,
      lastName:$scope.lastName,
      email:$scope.email,
      phoneNumber:$scope.phoneNumber,
      streetAddress:$scope.streetAddress,
      unitNumber:$scope.unitNumber,
      city:$scope.city,
      state:$scope.state,
      zip:$scope.zip
    };

    $http({
      method: 'PUT',
      url: '/editExistingCustomer',
      data: editCustomerObject
    }).then(function(editCustomerResponse){
      console.log('success from DB', editCustomerResponse);
    });
  };

  $scope.startNewBike = function(){
    var newBike = {
      bikeName: $scope.newBikeName,
      bikeStyle: $scope.newBikeStyle,
    };
    $http({
      method: 'PUT',
      url: '/addBike',
      data: newBike
    }).then(function(addBikeResponse){
      console.log('added bike:', addBikeResponse.data);
    });
    sessionStorage.setItem('newBike', JSON.stringify(addBikeResponse.data[0]));
    var bike = JSON.parse(sessionStorage.getItem('newBike'));
    console.log('json obj:', bike);
    $location.path('/selectedBike/form1');
  };

}]);//end selectedCustomerController
