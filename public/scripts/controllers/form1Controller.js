myApp.controller("form1Controller", ['$scope', '$http', function($scope, $http){
  console.log('In form1Controller');

  var bike = JSON.parse(sessionStorage.getItem('selectedBike'));
  var employee = JSON.parse(sessionStorage.getItem('employee'));
  var formOne = JSON.parse(sessionStorage.getItem('formOne'));
  var obj = JSON.parse(sessionStorage.getItem('customer'));

  $scope.date= new Date();
  $scope.submitButton = function(){
    if (formOne == undefined) {
      console.log('starting new');
    } else if(formOne[0] !== undefined) {
    $scope.showHideSubmitFormOne = false;
    $scope.submittedOne = true;
  }
  };
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
  $scope.submitButton();

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
    if (formOneObject.injuries == undefined) {
      alert("Please indicate any injuries - all fields are required");
    } else if (formOneObject.complaints == undefined){
      alert("Please indicate any complaints - all fields are required");
    } else if( formOneObject.surgeries == undefined){
      alert("Please indicate any surgeries - all fields are required");
    } else if( formOneObject.averageRideLength == undefined){
      alert("Please indicate average ride length - all fields are required");
    } else if(formOneObject.upcomingRaces == undefined){
      alert("Please indicate any upcoming races - all fields are required");
    } else if(formOneObject.currentBikeBrand == undefined){
      alert("Please indicate current bike brand - all fields are required");
    } else if(formOneObject.saddleHeight == undefined){
      alert("Please indicate saddle height - all fields are required");
    } else if(formOneObject.saddleHeightOverBars == undefined){
      alert("Please indicate saddle height over bars - all fields are required");
    } else if(formOneObject.saddleAngle == undefined){
      alert("Please indicate saddle angle - all fields are required");
    } else if(formOneObject.saddleSetback == undefined){
      alert("Please indicate saddle set back - all fields are required");
    } else if(formOneObject.SaddlehandlebarReach == undefined){
      alert("Please indicate saddle to handlebar reach - all fields are required");
    } else if(formOneObject.stemLength == undefined){
      alert("Please indicate stem length - all fields are required");
    } else if(formOneObject.stemAngle == undefined){
      alert("Please indicate stem angle - all fields are required");
    } else if(formOneObject.handlebarWidth == undefined){
      alert("Please indicate handle bar width - all fields are required");
    } else if(formOneObject.handlebarBrand == undefined){
      alert("Please indicate handlebarBrand - all fields are required");
    } else if(formOneObject.pedalBrandModel == undefined){
      alert("Please indicate pedal brand model - all fields are required");
    } else if(formOneObject.shoeBrand == undefined){
      alert("Please indicate shoe brand - all fields are required");
    } else if(formOneObject.brakeLevel == undefined){
      alert("Please indicate brake level position - all fields are required");
    } else if(formOneObject.crankLength == undefined){
      alert("Please indicate crank length - all fields are required");
    } else {

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
  }
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
            text: 'Existing Fit', fontSize: 18,
            style: 'header',
            bold: true,
            margin: [ 1, 2, 5, 5 ],
            alignment: 'center'

          },
          {text: ' ' + obj.firstname + ' ' + obj.lastname, alignment: 'center'},
          {text: ' ' + obj.phonenumber,  alignment: 'center'},
          {text: ' ' + obj.email,  alignment: 'center'},
          {text: ' ' + obj.streetaddress + ' ' + obj.city + ' , ' + obj.state + ' ' + obj.zip, alignment: 'center'},
          {text: ' ' + obj.unitnumber,  alignment: 'center'},
          {text: ' ' + $scope.date.toString().substring(0,15), alignment: 'center'},


            {
            style: 'tableExample',
            margin: [0, 10, 0, 0],
            table: {
                body:[
                    ['Injuries', 'Complaints', 'Surgeries', 'Average Ride', 'Goals', 'Current Bike Brand','Saddle Height', 'Saddle Height Over Bars', 'Saddle Angle', 'Saddle Setback'],
                    ['' + $scope.injuryInfo, '' + $scope.complaints, '' + $scope.surgeryInfo, ''+ $scope.averageRideLength, '' + $scope.upcomingRaces, '' + $scope.currentBikeBrand, '' + $scope.saddleHeight, '' + $scope.saddleHeightOverBars, '' + $scope.saddleAngle, '' + $scope.saddleSetback],
                  ]
                }
              },

            {
            style: 'tableExample',
            margin: [0, 10, 0, 0],
            table: {
                body:[
                    ['Saddle Handlebar Reach', 'Stem Length', 'Stem Angle', 'Handlebar Width', 'Handlebar Brand', 'Pedal Brand/Model', 'Shoe Brand', 'Brake Level', 'Crank Length'],
                    ['' + $scope.SaddlehandlebarReach, '' + $scope.stemLength, '' + $scope.stemAngle, '' + $scope.handlebarWidth, '' + $scope.handlebarBrand, '' + $scope.pedalBrandModel, '' + $scope.shoeBrand,  '' + $scope.brakeLevel, '' + $scope.crankLength]
                  ]
                }
              },
              {
              style: 'tableExample',
              alignment: 'center',
              margin: [0, 10, 0, 0],
              table: {
                  body:[
                      ['Notes'],
                      ['' + $scope.notes]
                    ]
                  }
                },
      ]// end content
    // };// end docDefinition
  };
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
