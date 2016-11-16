myApp.controller("existingCustomerController", ['$scope', '$http', '$mdToast', '$firebaseArray', '$firebaseAuth', '$location', function($scope, $http, $mdToast, $firebaseArray, $firebaseAuth, $location){
  console.log('In existingCustomerController');


  //toast set Up
  var errorMessage;
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

  $scope.showSuccessToast = function(){
    $mdToast.show(
      $mdToast.simple()
      .content(errorMessage)
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

  $scope.verifyEmployee = function(){
    console.log("hit verify employee");
    if (localStorage.employee == undefined){
      alert("You must have a valid login");
      $location.path('/login');
    }
  };

  $scope.cardClicked = function(user){
    console.log('card clicked', user);
    sessionStorage.setItem('customer', JSON.stringify(user));
    var obj = JSON.parse(sessionStorage.getItem('customer'));
    console.log('json obj:', obj.customerid);
    $http({
      method: 'GET',
      url: '/getBikes?q=' + obj.customerid,
    }).then(function success(bikes){
      console.log('bikes from server:', bikes.data);
      sessionStorage.setItem('customerBikes', JSON.stringify(bikes.data));
      var bikeList = JSON.parse(sessionStorage.getItem('customerBikes'));
      console.log('json bikeList:', bikeList);
    }, function error(errorObject){
      console.log(errorObject);
    });
    setTimeout(function(){
     $location.path('/selectedCustomer');
   }, 0);
  };

  $scope.getExistingCustomers = function () {
    console.log('in getExistingCustomers');
    $http({
      method: 'GET',
      url: '/getExistingCustomers'
    }).then(function success(responseObject) {
      console.log('got these items from server/db:', responseObject);
      $scope.existingCustomers = responseObject.data;
    }, function error(errorObject){
      console.log(errorObject);
    });
    console.log($scope.existingCustomers);
  };

  $scope.getExistingCustomers();


/////////////////////Search for Customer//////////////////////////////////
  $scope.searchCustomer = function(){
    var string = $scope.customer;
    var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";

    console.log('search button clicked sent:', $scope.customer);
    var searchCustomerCall = function(){
      $http({
        method: 'GET',
        url: '/customer?q=' + $scope.customer,
      }).then(function successCallback(response){
        console.log('back with:', response.data);
        $scope.existingCustomers = response.data;
      }, function errorCallback(response){
        console.log(response);
      }); // end query call
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

    if(checkForSpecialChar(string) == false){
      errorMessage = "Searching for " +  '"' + string + '"';
      $scope.showSuccessToast();
      searchCustomerCall();
      } else {
        // alert("Searches only accept a-z, A-Z, or 0-9");
        errorMessage = "Searches only accept a-z, A-Z, or 0-9";
        $scope.showErrorToast();
      }

    checkForSpecialChar(string);

  }; // end search
}]);//end existingCustomerController
