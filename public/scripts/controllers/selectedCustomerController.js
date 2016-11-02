myApp.controller("selectedCustomerController", ['$scope', '$http', '$location', function($scope, $http, $location){
  console.log('In selectedCustomerController');
  // set form to edit and submit status
  //show submit button, hide update and pdf
  $scope.showHideSelectedCustomer = true;
  // hide Save
  $scope.showSave = false;
  //keep all input fields active
  $scope.submittedSelectedCustomer = true;


  var obj = JSON.parse(sessionStorage.getItem('customer'));
  var bikeList = JSON.parse(sessionStorage.getItem('customerBikes'));

  console.log(obj);

  //append customer info from the DB to the current input fields
  $scope.firstName = obj.firstname;
  $scope.lastName = obj.lastname;
  $scope.email = obj.email;
  $scope.phoneNumber = obj.phonenumber;
  $scope.streetAddress = obj.streetaddress;
  $scope.unitNumber = obj.unitnumber;
  $scope.city = obj.city;
  $scope.state = obj.state;
  $scope.zip = obj.zip;

  $scope.newBikeStart = function(){
    console.log('newbike');
     $scope.newBikeButton = !$scope.newBikeButton;
  };
  $scope.loadBikes = function(){
    var bikeList = JSON.parse(sessionStorage.getItem('customerBikes'));
    $scope.customerBikes = bikeList;
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
    console.log('customer info from other page:', obj);
    var customer = angular.element(document.querySelector( '#custInfo' ) );
    customer.append(obj.firstname + " " + obj.lastname + '</br>' + obj.email + '</br>' + obj.phonenumber + '</br>' + obj.streetaddress + ", " + obj.city + ", " + obj.state + " " + obj.zip );
  };


  $scope.customerInfo();
  $scope.loadBikes();

///////////////////////////////Edit customer Info///////////////////////////////////////
  $scope.editCustomerInfo = function () {
    console.log("in editCustomerInfo");

    //show update
    $scope.hideUpdate = true;
    //hide save
    $scope.showSave = false;
    // lock form
    $scope.submittedOne=true;

    
    var editCustomerObject = {
      firstName: $scope.firstName,
      lastName: $scope.lastName,
      email: $scope.email,
      phoneNumber: $scope.phoneNumber,
      streetAddress: $scope.streetAddress,
      unitNumber: $scope.unitNumber,
      city: $scope.city,
      state: $scope.state,
      zip: $scope.zip,
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

  ///////////////////////////////Update Form///////////////////////////////////////
  $scope.updateExistingCustomer = function(){
    //hide update
    $scope.showHideSelectedCustomer = false;
    //show save
    $scope.showSave = true;
    // unlock
    $scope.submittedSelectedCustomer = false;
  };


  ///////////////////////////////Start New Bike///////////////////////////////////////
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
    }); // end then response
  }; // end start new bike


  ///////////////////////////////on Card Click///////////////////////////////////////
  $scope.cardClicked = function(bike){
    console.log('card clicked', bike);
    sessionStorage.setItem('selectedBike', JSON.stringify(bike));
    var selectedBike = JSON.parse(sessionStorage.getItem('selectedBike'));
    console.log('bike ID:', bike.bikeid);
    $http({
      method: 'GET',
      url: '/getBikeFormOne?q=' + bike.bikeid,
    }).then(function success(bikeFormOne){
      console.log('bike forms from server:', bikeFormOne.data);
      sessionStorage.setItem('formOne', JSON.stringify(bikeFormOne.data));
      var formOne = JSON.parse(sessionStorage.getItem('formOne'));
      console.log('json form one:', formOne);
    }, function error(errorObject){
      console.log(errorObject);
    }); // end get form one

   $http({
     method: 'GET',
     url: '/getBikeFormTwo?q=' + bike.bikeid,
   }).then(function success(bikeFormTwo){
     console.log('bike forms from server:', bikeFormTwo.data);
     sessionStorage.setItem('formTwo', JSON.stringify(bikeFormTwo.data));
     var formTwo = JSON.parse(sessionStorage.getItem('formTwo'));
     console.log('json form two:', formTwo);
   }, function error(errorObject){
     console.log(errorObject);
   }); // end get form two

   $http({
     method: 'GET',
     url: '/getBikeFormThree?q=' + bike.bikeid,
   }).then(function success(bikeFormThree){
     console.log('bike forms from server:', bikeFormThree.data);
     sessionStorage.setItem('formThree', JSON.stringify(bikeFormThree.data));
     var formThree = JSON.parse(sessionStorage.getItem('formThree'));
     console.log('json form Three:', formThree);
   }, function error(errorObject){
     console.log(errorObject);
   }); // end get form three

   $http({
     method: 'GET',
     url: '/getBikeFormFour?q=' + bike.bikeid,
   }).then(function success(bikeFormFour){
     console.log('bike forms from server:', bikeFormFour.data);
     sessionStorage.setItem('formFour', JSON.stringify(bikeFormFour.data));
     var formFour = JSON.parse(sessionStorage.getItem('formFour'));
     console.log('json form Four:', formFour);
   }, function error(errorObject){
     console.log(errorObject);
   }); // end get form four
   setTimeout(function(){
   //  $location.path('/selectedCustomer');
    }, 0);
  }; //end cardClicked

}]);//end selectedCustomerController
