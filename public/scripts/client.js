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
      when('/selectedCustomer',{
        templateUrl: "./views/partials/selectedCustomer.html",
        controller: "selectedCustomerController"
      }).
      when('/selectedBike',{
        templateUrl: "./views/partials/selectedBike.html",
        controller: "selectedBikeController"
      }).
      when('/newCustomer',{
        templateUrl: "./views/partials/newCustomer.html",
        controller: "newCustomerController"
      }).
      when('/form1',{
        templateUrl: "./views/partials/form1.html",
        controller: "form1Controller"
      }).
      when('/form2',{
        templateUrl: "./views/partials/form2.html",
        controller: "form2Controller"
      }).
      when('/form3',{
        templateUrl: "./views/partials/form3.html",
        controller: "form3Controller"
      }).
      when('/form4',{
        templateUrl: "./views/partials/form4.html",
        controller: "form4Controller"
      }).
      otherwise({
        redirectTo: "/login"
      });
}]);
