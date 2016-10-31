myApp.controller("selectedCustomerController", ['$scope', '$http', function($scope, $http){
  console.log('In selectedCustomerController');

  $scope.newBikeStart = function(){
    console.log('newbike');
     $scope.newBikeButton = !$scope.newBikeButton;
  };
  // $scope.clearsess = function(){
  //   console.log('clear clicked');
  //   // sessionStorage.removeItem('customer');
  //   console.log('obj after clear:', sessionStorage);
  // };
  $scope.otherType = false;
  $scope.otherSelected = function(){
    $scope.otherType = !$scope.otherType;
  };




  // show injury
  $scope.newBikeTypeIn = false;
  $scope.updateShowInjury = function(){
    $scope.newBikeTypeIn = true;
  };
  //hide injury
  $scope.updateHideInjury = function(){
    $scope.newBikeTypeIn = false;
  };


  $scope.customerInfo = function(){
    var obj = JSON.parse(sessionStorage.getItem('customer'));
    console.log('customer info from other page:', obj);
    var customer = angular.element(document.querySelector( '#custInfo' ) );
    customer.append(obj.firstname + " " + obj.lastname);
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
      url: '/editFormFour',
      data: editCustomerObject
    }).then(function(editCustomerResponse){
      console.log('success from DB', editCustomerResponse);
    });
  };

}]);//end selectedCustomerController
