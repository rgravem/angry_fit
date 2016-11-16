myApp.controller("newCustomerController", ['$scope', '$http', '$location','$mdToast','$animate', function($scope, $http, $location, $mdToast, $animate){
  console.log('In newCustomerController');

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
      .content($scope.firstName + " " + $scope.lastName + " has been added!")
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

  $scope.addNewCustomer = function () {
    var string = $scope.lastName;
    var specialChars = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";

    var newCustomerObject = {
      firstName: $scope.firstName,
      lastName:$scope.lastName,
      email:$scope.email,
      phoneNumber:$scope.phoneNumber,
      streetAddress:$scope.streetAddress,
      unitNumber:$scope.unitNumber,
      city:$scope.city,
      state:$scope.state,
      zip:$scope.zip,
      icon:$scope.customerIcon
    };

    var addNewCustomerCall = function(){
      $http({
        method: 'POST',
        url: '/addNewCustomer',
        data: newCustomerObject
      }).then(function(newCustomerResponse){
        console.log('success from server', newCustomerResponse.data);
        $scope.showSimpleToast();
        sessionStorage.setItem('customer', JSON.stringify(newCustomerResponse.data[0]));
        var obj = JSON.parse(sessionStorage.getItem('customer'));
        console.log('json obj:', obj);
        console.log('newCustomerObject to send to DB:', newCustomerResponse);
        $location.path('/selectedCustomer');
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
      addNewCustomerCall();
      //if there is a special character issue
      } else {
        // alert("Searches only accept a-z, A-Z, or 0-9");
        errorMessage = "Last Name Only Accepts a-z, A-Z, or 0-9";
        $scope.showErrorToast();
      }

    checkForSpecialChar(string);


  };

}]);//end newCustomerController
