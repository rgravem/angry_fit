console.log('client.js is sourced, yo!');

//source in angular
var myApp = angular.module("myApp", ["ngRoute"]);


///////////////////////////Angular Routing///////////////////////////////////////
myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
      when('/login',{
        templateUrl: "./views/partials/login.html",
        controller: "loginController"
      }).
      when('/customerType',{
        templateUrl: "./views/partials/customerType.html",
        controller: "customerTypeController"
      }).
      when('/existingCustomer',{
        templateUrl: "./views/partials/existingCustomer.html",
        controller: "existingCustomerController"
      }).
      // when('/homeli',{
      //   templateUrl: "./views/partials/loggedInPartials/homeLoggedIn.html",
      //   controller: "homeControllerLoggedIn"
      // }).
      otherwise({
        redirectTo: "/login"
      });
}]);
