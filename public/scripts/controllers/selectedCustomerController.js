myApp.controller("selectedCustomerController", ['$scope', '$http', '$location', function($scope, $http, $location){
  console.log('In selectedCustomerController');
  var obj = JSON.parse(sessionStorage.getItem('customer'));
  var bikeList = JSON.parse(sessionStorage.getItem('customerBikes'));

  $scope.newBikeStart = function(){
    console.log('newbike');
     $scope.newBikeButton = !$scope.newBikeButton;
  };
  $scope.loadBikes = function(){
    var bikeList = JSON.parse(sessionStorage.getItem('customerBikes'));
    $scope.customerBikes = bikeList;
    // sessionStorage.removeItem('customer');
    console.log('obj after clear:', sessionStorage);
  };

  $scope.otherType = false;
  $scope.otherSelected = function(){
    $scope.otherType = !$scope.otherType;
  };

  var reload = function(){
    location.reload();
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
    console.log('customer info from other page:', obj);
    var customer = angular.element(document.querySelector( '#custInfo' ) );
    customer.append(obj.firstname + " " + obj.lastname + '</br>' + obj.email + '</br>' + obj.phonenumber + '</br>' + obj.streetaddress + ", " + obj.zip );
  };


  $scope.customerInfo();
  $scope.loadBikes();


  $scope.editCustomerInfo = function () {
    console.log("in editCustomerInfo");
    var editCustomerObject = {
      firstName: obj.firstname,
      lastName: obj.lastname,
      email: obj.email,
      phoneNumber: obj.phonenumber,
      streetAddress: obj.streetaddress,
      unitNumber: obj.unitnumber,
      city: obj.city,
      state: obj.state,
      zip: obj.zip,
      customerId: obj.customerid
    };

    console.log("editCustomerObject", editCustomerObject);

    $http({
      method: 'PUT',
      url: '/editExistingCustomer',
      data: editCustomerObject
    }).then(function(editCustomerResponse){
      console.log('success from DB', editCustomerResponse);
      console.log('customer info from other page:', obj);
      //write over the #custInfo dom element to properly display the edited customer
      var customer = angular.element(document.querySelector( '#custInfo' ) );
      customer.html(editCustomerResponse.data[0].firstname + " " + editCustomerResponse.data[0].lastname + '</br>' + editCustomerResponse.data[0].email + '</br>' + editCustomerResponse.data[0].phonenumber + '</br>' + editCustomerResponse.data[0].streetaddress + ", " + editCustomerResponse.data[0].zip );
      //set session data to equal the edited customer's new info
      sessionStorage.setItem('customer', JSON.stringify(editCustomerResponse.data[0]));
      obj = JSON.parse(sessionStorage.getItem('customer'));
      console.log(obj);
    });
  };

  $scope.startNewBike = function(){
    var newBike = {
      bikeName: $scope.newBikeName,
      bikeStyle: $scope.newBikeStyle,
      customerID: obj.customerid,
    };
    $http({
      method: 'POST',
      url: '/addBike',
      data: newBike
    }).then(function(addBikeResponse){
      console.log('added bike:', addBikeResponse.data);
      sessionStorage.setItem('newBike', JSON.stringify(addBikeResponse.data[0]));
      var bike = JSON.parse(sessionStorage.getItem('newBike'));
      console.log('json obj:', bike);
      $location.path('/selectedBike/form1');
    });
  };
}]);//end selectedCustomerController
