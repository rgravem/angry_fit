myApp.controller("form1Controller", ['$scope', '$http', function($scope, $http){
  console.log('In form1Controller');

  var bike = JSON.parse(sessionStorage.getItem('selectedBike'));
  var employee = JSON.parse(sessionStorage.getItem('employee'));
  var formThree = JSON.parse(sessionStorage.getItem('formOne'));

  // set form to edit and submit status
  //show submit button, hide update and pdf
  $scope.showHideSubmitFormOne = true;
  // hide Save
  $scope.showSave = false;
  //keep all input fields active
  $scope.submittedOne = false;

  $scope.formOneLoad = function(){
    if (formOne[0] === undefined){
      alert('Existing Fit has no data');
    }else{
    console.log("form 1 session:", formOne[0]);
    $scope.injuries = formOne[0].injuries;
    $scope.complaints = formOne[0].complaints;
    $scope.surgeries = formOne[0].surgeries;
    $scope.averageRideLength = formOne[0].averageridelength;
    $scope.upcomingRaces = formOne[0].upcomingraces;
    $scope.currentBikeBrand = formOne[0].currentbikebrand;
    $scope.saddleHeight = formOne[0].saddleheight;
    $scope.saddleHeightOverBars = formOne[0].saddleheightoverbars;
    $scope.saddleAngle = formOne[0].saddleangle;
    $scope.saddleSetback = formOne[0].saddlesetback;
    $scope.SaddlehandlebarReach = formOne[0].saddlehandlebarreach;
    $scope.stemLength = formOne[0].stemlength;
    $scope.stemAngle = formOne[0].stemangle;
    $scope.handlebarWidth = formOne[0].handlebarwidth;
    $scope.handlebarBrand = formOne[0].handlebarbrand;
    $scope.pedalBrandModel = formOne[0].pedalbrandmodel;
    $scope.shoeBrand = formOne[0].shoebrand;
    $scope.brakeLevel = formOne[0].brakelevel;
    $scope.crankLength = formOne[0].cranklength;
    $scope.notes = formOne[0].notes;
  }
  };
  $scope.formOneLoad();

  $scope.addFormOne = function () {
    console.log('in AddFormOne button click');
    var formOneObject = {
      employeeCreated: sessionStorage.employee,
      bikeId: bike.bikeid,
      date: $scope.date.toString().substring(0,15),
      injuries: $scope.injuries,
      complaints:$scope.complaints,
      surgeries:$scope.surgeries,
      averageRideLength:$scope.averageRideLength,
      upcomingRaces:$scope.upcomingRaces,
      currentBikeBrand:$scope.currentBikeBrand,
      saddleHeight:$scope.saddleHeight,
      saddleHeightOverBars:$scope.saddleHeightOverBars,
      saddleAngle:$scope.saddleAngle,
      saddleSetback:$scope.saddleSetback,
      SaddlehandlebarReach:$scope.SaddlehandlebarReach,
      stemLength:$scope.stemLength,
      stemAngle:$scope.stemAngle,
      handlebarWidth:$scope.handlebarWidth,
      handlebarBrand:$scope.handlebarBrand,
      pedalBrandModel:$scope.pedalBrandModel,
      shoeBrand:$scope.shoeBrand,
      brakeLevel:$scope.brakeLevel,
      crankLength:$scope.crankLength,
      notes:$scope.notes
    };

    console.log('formOneObject to send to DB:', formOneObject);
    //hide submit, show update and pdf
    $scope.showHideSubmitFormOne = false;
    //disable input fields
    $scope.submittedOne = true;

    // $http({
    //   method: 'POST',
    //   url: '/addFormOne',
    //   data: formOneObject
    // }).then(function(formOneObject){
    //   console.log('success from server', formOneObject);
    // });
  }; // end addFormOne

  ////////////////FORM 2 PUT(Update) Route to DB///////////////////////////////////////
  $scope.saveFormOne = function(){
    console.log('in saveFormOne');
    //show update
    $scope.hideUpdate = true;
    //hide save
    $scope.showSave = false;
    // lock form
    $scope.submittedOne=true;

    var editFormOneObject = {
      employeeUpdated: employee.employeeid,
      bikeId: bike.bikeid,
      date: $scope.date.toString().substring(0,15),
      injuries: $scope.injuries,
      complaints:$scope.complaints,
      surgeries:$scope.surgeries,
      averageRideLength:$scope.averageRideLength,
      upcomingRaces:$scope.upcomingRaces,
      currentBikeBrand:$scope.currentBikeBrand,
      saddleHeight:$scope.saddleHeight,
      saddleHeightOverBars:$scope.saddleHeightOverBars,
      saddleAngle:$scope.saddleAngle,
      saddleSetback:$scope.saddleSetback,
      SaddlehandlebarReach:$scope.SaddlehandlebarReach,
      stemLength:$scope.stemLength,
      stemAngle:$scope.stemAngle,
      handlebarWidth:$scope.handlebarWidth,
      handlebarBrand:$scope.handlebarBrand,
      pedalBrandModel:$scope.pedalBrandModel,
      shoeBrand:$scope.shoeBrand,
      brakeLevel:$scope.brakeLevel,
      crankLength:$scope.crankLength,
      notes:$scope.notes
    };

    console.log('object to send:', editFormOneObject);
    //hide submit, show update and pdf
    $scope.showHideSubmitFormOne = false;
    //disable input fields
    $scope.submittedOne = true;

    $http({
      method: 'PUT',
      url: '/editFormOne',
      data: editFormOneObject
    }).then(function(editForm1Response){
      console.log('success from server', editForm1Response);
    });
  }; //End saveFormOne

  //update form on click
  $scope.updateFormOne = function(){
    //hide update
    $scope.hideUpdate = false;
    //show save
    $scope.showSave = true;
    // unlock
    $scope.submittedOne=false;
  };

  // // save form on click
  // $scope.saveFormOne= function(){
  //     //show update
  //     $scope.hideUpdate = true;
  //     //hide save
  //     $scope.showSave = false;
  //     // lock form
  //     $scope.submittedOne=true;
  // };

  $scope.downloadFormOnePdf = function(){
    console.log("In the PDF click");
    var docDefinition =
      {content: [
        {text: "Date: " + $scope.date.toString().substring(0,15) },
        {text: "Injuries: " + $scope.injuries },
        {text: "Complaints: " + $scope.complaints },
        {text: "Surgeries: " + $scope.surgeries },
        {text: "Average Ride Length: " + $scope.averageRideLength },
        {text: "Upcoming Races: " + $scope.upcomingRaces },
        {text: "Current Bike Brand: " + $scope.currentBikeBrand },
        {text: "Saddle Height: " + $scope.saddleHeight },
        {text: "Saddle Height Over Bars: " + $scope.saddleHeightOverBars },
        {text: "Saddle Angle: " + $scope.saddleAngle},
        {text: "Saddle Setback: " + $scope.saddleSetback },
        {text: "Saddle Handlebar Reach: " +  $scope.SaddlehandlebarReach},
        {text: "Stem Length: " + $scope.stemLength },
        {text: "Stem Angle: " + $scope.stemAngle },
        {text: "Handlebar Width: " + $scope.handlebarWidth },
        {text: "Handlebar Brand: " + $scope.handlebarBrand },
        {text: "Pedal Brand/Model: " + $scope.pedalBrandModel },
        {text: "Shoe Brand: " + $scope.shoeBrand },
        {text: "Brake Level: " + $scope.brakeLevel },
        {text: "Crank Length: " + $scope.crankLength },
        {text: "Notes: " + $scope.notes }
      ]// end content
    };// end docDefinition
    pdfMake.createPdf(docDefinition).download('existingFit.pdf');
  }; // end downloadFormOnePdf

  // show injury
  $scope.showInjury = false;
  $scope.updateShowInjury = function(){
    $scope.showInjury = true;
  };
  //hide injury
  $scope.updateHideInjury = function(){
    $scope.showInjury = false;
  };

  // show surgery
  $scope.showSurgery = false;
  $scope.updateShowSurgery = function(){
    $scope.showSurgery = true;
  };
  //hide surgery
  $scope.updateHideSurgery = function(){
    $scope.showSurgery = false;
  };

  // show goals
  $scope.showGoals = false;
  $scope.updateShowGoals = function(){
    $scope.showGoals = true;
  };
  //hide goals
  $scope.updateHideGoals = function(){
    $scope.showGoals = false;
  };
}]);//end form1Controller
