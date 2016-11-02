myApp.controller("form1Controller", ['$scope', '$http', function($scope, $http){
  console.log('In form1Controller');

  var bike = JSON.parse(sessionStorage.getItem('selectedBike'));
  var employee = JSON.parse(sessionStorage.getItem('employee'));
  var formOne = JSON.parse(sessionStorage.getItem('formOne'));
  $scope.date= new Date();
  // set form to edit and submit status
  //show submit button, hide update and pdf
  $scope.showHideSubmitFormOne = true;
  // hide Save
  $scope.showSave = false;
  //keep all input fields active
  $scope.submittedOne = false;

  $scope.formOneLoad = function(){
    if (formOne == undefined){
      console.log('starting new bike');
    }else if (formOne[0] == undefined){
      alert('Existing Fit has no data');
    } else {
    console.log("form 1 session:", formOne[0]);
    $scope.injuryInfo = formOne[0].injuries;
    $scope.complaints = formOne[0].complaints;
    $scope.surgeryInfo = formOne[0].surgeries;
    $scope.averageRideLength = formOne[0].averageridelength;
    $scope.goalsInfo = formOne[0].upcomingraces;
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
      employeeCreated: employee,
      bikeId: bike.bikeid,
      date: $scope.date.toString().substring(0,15),
      injuries: $scope.injuryInfo,
      complaints:$scope.complaints,
      surgeries:$scope.surgeryInfo,
      averageRideLength:$scope.averageRideLength,
      upcomingRaces:$scope.goalsInfo,
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

    $http({
      method: 'POST',
      url: '/addFormOne',
      data: formOneObject
    }).then(function(formOneObject){
      sessionStorage.setItem('formOne', JSON.stringify(formOneObject.data));
      console.log('success from server', formOneObject);
    });
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
      employeeCreated: employee,
      bikeId: bike.bikeid,
      date: $scope.date.toString().substring(0,15),
      injuries: $scope.injuryInfo,
      complaints:$scope.complaints,
      surgeries:$scope.surgeryInfo,
      averageRideLength:$scope.averageRideLength,
      upcomingRaces:$scope.goalsInfo,
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
      sessionStorage.setItem('formOne', JSON.stringify(editForm1Response.data));
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


  $scope.downloadFormOnePdf = function(){
    console.log("In the PDF click");
    var docDefinition =
        {pageOrientation: 'landscape',
        content: [
          {
            text: 'Consultation Form',
            style: 'header',
            bold: true
          },

        {text: "Date: " + '' + '' + $scope.date.toString().substring(0,15), margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Injuries: "},
        {text: '' + $scope.injuries, margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Complaints: "},
        {text: '' + $scope.complaints, margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Surgeries: " },
        {text: '' + $scope.surgeries, margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Average Ride Length:"},
        {text: '' + $scope.averageRideLength, margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Upcoming Races: "},
        {text: '' + $scope.upcomingRaces, margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Current Bike Brand: "},
        {text: '' + $scope.currentBikeBrand, margin: [ 1, 2, 5, 5 ], bold: true },

        {text: "Saddle Height: "},
        {text:  '' + $scope.saddleHeight,  margin: [ 1, 2, 5, 5 ], bold: true },

        {text: "Saddle Height Over Bars: "},
        {text: '' + $scope.saddleHeightOverBars, margin: [ 1, 2, 5, 5 ], bold: true },

        {text: "Saddle Angle: "},
        {text:'' + $scope.saddleAngle, margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Saddle Setback: "},
        {text:'' + $scope.saddleSetback, margin: [ 1, 2, 5, 5 ], bold: true },

        {text: "Saddle Handlebar Reach: "},
        {text: '' + $scope.SaddlehandlebarReach, margin: [ 1, 2, 5, 5 ], bold: true },

        {text: "Stem Length: "},
        {text:'' + $scope.stemLength, margin: [ 1, 2, 5, 5 ], bold: true },

        {text: "Stem Angle: "},
        {text:'' + $scope.stemAngle, margin: [ 1, 2, 5, 5 ], bold: true },

        {text: "Handlebar Width: "},
        {text:'' + $scope.handlebarWidth, margin: [ 1, 2, 5, 5 ], bold: true },

        {text: "Handlebar Brand: "},
        {text: '' + $scope.handlebarBrand, margin: [ 1, 2, 5, 5 ], bold: true },

        {text: "Pedal Brand/Model: "},
        {text: '' + $scope.pedalBrandModel, margin: [ 1, 2, 5, 5 ], bold: true },

        {text: "Shoe Brand: "},
        {text: '' + $scope.shoeBrand, margin: [ 1, 2, 5, 5 ], bold: true },

        {text: "Brake Level: "},
        {text: '' + $scope.brakeLevel, margin: [ 1, 2, 5, 5 ], bold: true },

        {text: "Crank Length: "},
        {text:'' + $scope.crankLength, margin: [ 1, 2, 5, 5 ], bold: true },

        {text: "Notes: ", alignment: 'right'},
        {text: '' + $scope.notes, alignment: 'right' },
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
