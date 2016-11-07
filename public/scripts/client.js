console.log('client.js is sourced, yo!');

console.realWarn = console.warn;
console.warn = function (message) {
    if (message.indexOf("ARIA") == -1) {
        console.realWarn.apply(console, arguments);
    }
};

//source in angular
var myApp = angular.module("myApp", ['ui.router', 'ngMaterial', 'ngMessages', 'firebase']);



///////////////////////////UI Routing///////////////////////////////////////
myApp.config(function($stateProvider,$urlRouterProvider){
    //set otherwise to login
    $urlRouterProvider.otherwise('/login');
    $stateProvider
      .state('login', {
        url:'/login',
        templateUrl: './views/partials/login.html',
        controller: 'loginController'
      })
      .state('customerType',{
        url:'/customerType',
        templateUrl: "./views/partials/customerType.html",
        controller: "customerTypeController"
      })
      .state('existingCustomer',{
        url:'/existingCustomer',
        templateUrl: "./views/partials/existingCustomer.html",
        controller: "existingCustomerController"
      })
      .state('selectedCustomer',{
        url:'/selectedCustomer',
        templateUrl: "./views/partials/selectedCustomer.html",
        controller: "selectedCustomerController"
      })
      .state('selectedBike',{
        url:'/selectedBike',
        templateUrl: "./views/partials/selectedBike.html",
        controller: "selectedBikeController"
      })
      .state('selectedBike.form1',{
        url:"/form1",
        templateUrl: "./views/partials/selectedBike-form1.html",
        controller: "form1Controller"
      })
      .state('selectedBike.form2',{
        url:'/form2',
        templateUrl: "./views/partials/selectedBike-form2.html",
        controller: "form2Controller"
      })
      .state('selectedBike.form3',{
        url:'/form3',
        templateUrl: "./views/partials/selectedBike-form3.html",
        controller: "form3Controller"
      })
      .state('selectedBike.form4',{
        url:'/form4',
        templateUrl: "./views/partials/selectedBike-form4.html",
        controller: "form4Controller"
      })
      .state('addEmployee',{
        url:'/addEmployee',
        templateUrl: "./views/partials/addEmployee.html",
        controller: "addEmployeeController"
      })

    .state('newCustomer',{
      url:'/newCustomer',
      templateUrl: "./views/partials/newCustomer.html",
      controller: "newCustomerController"
    });
});

myApp.controller("navController", ['$scope', '$http', '$firebaseArray', '$firebaseAuth', '$location', function($scope, $http, $firebaseArray, $firebaseAuth, $location){
  console.log('In navController');
  var auth = $firebaseAuth();


  $scope.logOut = function(){
    auth.$signOut().then(function(){
      console.log('Logging the user out!');
      sessionStorage.clear();
      window.location.href = "https://accounts.google.com/logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000/#/login";
      $location.path('/login');
    });
  };


  $scope.startOver = function(){
    $location.path('/customerType');
    sessionStorage.removeItem('customer');
    sessionStorage.removeItem('customerBikes');
    sessionStorage.removeItem('formFour');
    sessionStorage.removeItem('formOne');
    sessionStorage.removeItem('formThree');
    sessionStorage.removeItem('formTwo');
    sessionStorage.removeItem('selectedBike');
  };

  }]);
