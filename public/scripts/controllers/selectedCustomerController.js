myApp.controller("selectedCustomerController", ['$scope', '$http', '$location', '$mdToast', '$animate', function($scope, $http, $location, $mdToast, $animate){
  console.log('In selectedCustomerController');
  var bikeIcon;
  //toast set Up
  $scope.toastPosition = {
    bottom: false,
    top: true,
    left: false,
    right: true
  };

  $scope.getToastPosition = function(){
    return Object.keys($scope.toastPosition)
      .filter(function(pos){return $scope.toastPosition[pos];})
      .join(' ');
  };

  $scope.showSimpleToast = function(){
    $mdToast.show(
      $mdToast.simple()
      .content("Updates have been saved!")
      .position($scope.getToastPosition())
      .hideDelay(2500)
    );
  };

  $scope.showErrorToast = function(){
    $mdToast.show(
      $mdToast.simple()
      .content(errorMessage)
      .position($scope.getToastPosition())
      .hideDelay(5000)
      .toastClass("error")
    );
  };

  if (localStorage.employee == undefined){
    alert("You must have a valid login");
    $location.path('/login');
  }
  // set form to edit and submit status
  //show submit button, hide update and pdf
  $scope.showHideSelectedCustomer = true;
  // hide Save
  $scope.showSave = false;
  //keep all input fields active
  $scope.submittedSelectedCustomer = true;

  // show bike fits
  $scope.hideBikes= true;

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
    $scope.hideBikes= false;
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
    var customer = angular.element(document.querySelector( '#custInfo' ) );
    customer.append(obj.firstname + " " + obj.lastname + '</br>' + obj.email + '</br>' + obj.phonenumber + '</br>' + obj.streetaddress + ", " + obj.city + ", " + obj.state + " " + obj.zip );

  };


  $scope.customerInfo();
  $scope.loadBikes();

///////////////////////////////Edit customer Info///////////////////////////////////////
  $scope.saveExistingCustomer = function () {
    var string = $scope.lastName;
    var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
    console.log("in editCustomerInfo");

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

    var editExistingCustomerCall = function(){
      $http({
        method: 'PUT',
        url: '/editExistingCustomer',
        data: editCustomerObject
      }).then(function(editCustomerResponse){
        $scope.showSimpleToast();
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

    var checkForSpecialChar = function(string){
      console.log('string,', string);
     for(i = 0; i < specialChars.length;i++){
       if(string.indexOf(specialChars[i]) > -1){
          console.log("true");
          return true;
        }
     }
     console.log("false");
     return false;
    };

    //if there is no special character, you are good to run the HTTP Post Route
    if(checkForSpecialChar(string) == false){
      //show update
      //show update
      $scope.showHideUpdateCustomer = false;
      //hide save
      $scope.showSave = false;
      // lock form
      $scope.submittedSelectedCustomer = true;
      editExistingCustomerCall();
      //if there is a special character issue
      } else {
        // alert("Searches only accept a-z, A-Z, or 0-9");
        errorMessage = "Last Name Only Accepts a-z, A-Z, or 0-9";
        $scope.showErrorToast();
      }

    checkForSpecialChar(string);

  };

  ///////////////////////////////Update Form///////////////////////////////////////
  $scope.updateExistingCustomer = function(){
    //hide update
    $scope.showHideUpdateCustomer = true;
    //show save
    $scope.showSave = true;
    // unlock
    $scope.submittedSelectedCustomer = false;
  };



  ///////////////////////////////Start New Bike///////////////////////////////////////
  $scope.startNewBike = function(){
    if ($scope.newBikeName == undefined) {
      alert('Please name the new bike!');
    } else {
      console.log("this is bike style:", $scope.newBikeStyle);
      if($scope.newBikeStyle == "Tri/TT"){
        bikeIcon = "./assets/angry_Icons/angry_TT.png";
      }
      else if($scope.newBikeStyle == "Flat Bar"){
        bikeIcon = "./assets/angry_Icons/angry_mountain.png";
      }
      else if($scope.newBikeStyle == "Drop Bar"){
        bikeIcon = "./assets/angry_Icons/angry_road.png";
      }
      else{
        bikeIcon = "./assets/angry_Icons/acf_logo.png";
      }


    var newBike = {
      bikeName: $scope.newBikeName,
      bikeStyle: $scope.newBikeStyle,
      customerID: obj.customerid,
      bikeIcon: bikeIcon
    };
    $http({
      method: 'POST',
      url: '/addBike',
      data: newBike
    }).then(function(addBikeResponse){
      console.log('added bike:', addBikeResponse.data);
      sessionStorage.setItem('selectedBike', JSON.stringify(addBikeResponse.data[0]));
      var bike = JSON.parse(sessionStorage.getItem('selectedBike'));
      console.log('json obj:', bike);
      $location.path('/selectedBike/form1');
    }); // end then response
  }
  }; // end start new bike

  $scope.nextPage = function(){
    setTimeout(function(){
     $location.path('/selectedBike/form1');
   }, 0);
  };
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
   $scope.nextPage();
  }; //end cardClicked

}]);//end selectedCustomerController
