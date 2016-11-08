myApp.controller("loginController", ['$scope', '$http', '$firebaseArray', '$firebaseAuth', '$location', function($scope, $http, $firebaseArray, $firebaseAuth, $location){
  console.log('In loginController');
  var auth = $firebaseAuth();

  // This code runs whenever the user logs in
  $scope.logIn = function login(){
    auth.$signInWithPopup("google").then(function(firebaseUser) {
      console.log("Signed in as:", firebaseUser.user.displayName);
      sessionStorage.setItem('employee', JSON.stringify(firebaseUser.user.email));
      var employee = JSON.parse(sessionStorage.getItem('employee'));
      $http({
        method: 'GET',
        url: '/checkEmployee?q=' + employee,
      }).then(function success(employeeStatus){
        console.log('employee check result:', employeeStatus.data);
        if (employeeStatus.data[0] === undefined){
          console.log('hit if statement');
            auth.$signOut().then(function(){
              console.log('Logging the user out!');
              sessionStorage.clear();
              window.location.href = "https://accounts.google.com/logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000/#/login";
              $location.path('/login');
              alert('You must use a valid login');
            });
        } else {
          console.log('it worked');
        }
      });
    }).catch(function(error) {
      console.log("Authentication failed: ", error);
    });
  };

  // This code runs whenever the user changes authentication states
  // e.g. whevenever the user logs in or logs out
  // this is where we put most of our logic so that we don't duplicate
  // the same things in the login and the logout code
  auth.$onAuthStateChanged(function(firebaseUser){
    // firebaseUser will be null if not logged in
    if(firebaseUser) {
      // This is where we make our call to our server
      firebaseUser.getToken().then(function(idToken){
        $http({
          method: 'GET',
          url: '/privateData',
          headers: {
            id_token: idToken
          }
        }).then(function(response){
          $scope.secretData = response.data;
          var employee = JSON.parse(sessionStorage.getItem('employee'));
          if (employee !== undefined) {
            $location.path('/customerType');
          }
        });
      });
    }else{
      console.log('Not logged in.');
      $scope.secretData = "You must be logged in";
    }

  });


}]);//end loginController
