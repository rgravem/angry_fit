console.log('client.js is sourced, yo!');

var myApp = angular.module("myApp", ["ngRoute"]);


///////////////////////////Angular Routing///////////////////////////////////////
//config method doesnt take a name, we are just configuring myApp,
//It does take in a dependency injection array
myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider.
      when('/login',{
        templateUrl: "./views/login.html",
        controller: "loginController"
      }).
      // when('/globalStash',{
      //   templateUrl: "./views/partials/globalStash.html",
      //   controller: "globalStashController"
      // }).
      // when('/addItem',{
      //   templateUrl: "./views/partials/addItem.html",
      //   controller: "addItemController"
      // }).
      // when('/homeli',{
      //   templateUrl: "./views/partials/loggedInPartials/homeLoggedIn.html",
      //   controller: "homeControllerLoggedIn"
      // }).
      otherwise({
        redirectTo: "/login"
      });
}]);
