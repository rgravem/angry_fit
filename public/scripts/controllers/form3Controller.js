myApp.controller("form3Controller", ['$scope', '$http', function($scope, $http){
  console.log('In form3Controller');

  var bike = JSON.parse(sessionStorage.getItem('selectedBike'));
  var employee = JSON.parse(sessionStorage.getItem('employee'));
  var formThree = JSON.parse(sessionStorage.getItem('formThree'));
  var obj = JSON.parse(sessionStorage.getItem('customer'));

  $scope.date= new Date();

  // set form to edit and submit status
  //show submit button, hide update and pdf

  $scope.showHideSubmitFormThree = true;
  //keep all input fields active
  $scope.submittedThree=false;
  // focus / blur properties for inputs
 $scope.effectiveTopTubeFocus = function(){
   document.getElementById("effectiveTopTubeMeasure").className.baseVal = "showMeasurement";
 };
 $scope.effectiveTopTubeBlur= function(){
   document.getElementById("effectiveTopTubeMeasure").className.baseVal = "hideMeasurement";
 };
 $scope.standoverFocus = function(){
   document.getElementById("standoverMeasure").className.baseVal = "showMeasurement";
 };
 $scope.standoverBlur= function(){
   document.getElementById("standoverMeasure").className.baseVal = "hideMeasurement";
 };
 $scope.seatTubeLengthFocus = function(){
   document.getElementById("seatTubeLengthMeasure").className.baseVal = "showMeasurement";
 };
 $scope.seatTubeLengthBlur= function(){
   document.getElementById("seatTubeLengthMeasure").className.baseVal = "hideMeasurement";
 };
 $scope.seatTubeAngleFocus = function(){
   document.getElementById("seatTubeAngleMeasure").className.baseVal = "showMeasurement";
 };
 $scope.seatTubeAngleBlur= function(){
   document.getElementById("seatTubeAngleMeasure").className.baseVal = "hideMeasurement";
 };
 $scope.headTubeLengthFocus = function(){
   document.getElementById("headTubeLengthMeasure").className.baseVal = "showMeasurement";
 };
 $scope.headTubeLengthBlur= function(){
   document.getElementById("headTubeLengthMeasure").className.baseVal = "hideMeasurement";
 };
 $scope.headTubeAngleFocus = function(){
   document.getElementById("headTubeAngleMeasure").className.baseVal = "showMeasurement";
 };
 $scope.headTubeAngleBlur= function(){
   document.getElementById("headTubeAngleMeasure").className.baseVal = "hideMeasurement";
 };
 $scope.stackFocus = function(){
   document.getElementById("stackMeasure").className.baseVal = "showMeasurement";
 };
 $scope.stackBlur= function(){
   document.getElementById("stackMeasure").className.baseVal = "hideMeasurement";
 };
 $scope.reachFocus = function(){
   document.getElementById("reachMeasure").className.baseVal = "showMeasurement";
 };
 $scope.reachBlur= function(){
   document.getElementById("reachMeasure").className.baseVal = "hideMeasurement";
 };
 $scope.wheelBaseFocus = function(){
   document.getElementById("wheelBaseMeasure").className.baseVal = "showMeasurement";
 };
 $scope.wheelBaseBlur= function(){
   document.getElementById("wheelBaseMeasure").className.baseVal = "hideMeasurement";
 };
 $scope.chainstayLengthFocus = function(){
   document.getElementById("chainstayLengthMeasure").className.baseVal = "showMeasurement";
 };
 $scope.chainstayLengthBlur= function(){
   document.getElementById("chainstayLengthMeasure").className.baseVal = "hideMeasurement";
 };
 $scope.bbDropFocus = function(){
   document.getElementById("bbDropMeasure").className.baseVal = "showMeasurement";
 };
 $scope.bbDropBlur= function(){
   document.getElementById("bbDropMeasure").className.baseVal = "hideMeasurement";
 };
 $scope.axleToCrownFocus = function(){
   document.getElementById("axleToCrownMeasure").className.baseVal = "showMeasurement";
 };
 $scope.axleToCrownBlur= function(){
   document.getElementById("axleToCrownMeasure").className.baseVal = "hideMeasurement";
 };
 $scope.mechanicalTrailFocus = function(){
   document.getElementById("mechanicalTrailMeasure").className.baseVal = "showMeasurement";
 };
 $scope.mechanicalTrailBlur= function(){
   document.getElementById("mechanicalTrailMeasure").className.baseVal = "hideMeasurement";
 };
 $scope.forkOffsetFocus = function(){
   document.getElementById("forkOffsetMeasure").className.baseVal = "showMeasurement";
 };
 $scope.forkOffsetBlur= function(){
   document.getElementById("forkOffsetMeasure").className.baseVal = "hideMeasurement";
 };


 $scope.submitButton = function(){
   if (formThree == undefined) {
     console.log('starting new');
   } else if(formThree[0] !== undefined) {
   $scope.showHideSubmitFormThree = false;
   $scope.submittedThree = true;
 }
 };
 $scope.submitButton();
 $scope.formThreeLoad = function(){
   if (formThree == undefined){
     console.log('starting new bike');
   }else if (formThree[0] == undefined){

     alert('Existing Fit has no data');

   } else {
   console.log("form 3 session:", formThree[0]);
   $scope.inseam = formThree[0].inseam;
   $scope.torso = formThree[0].torso;
   $scope.arm = formThree[0].arm;
   $scope.footLength = formThree[0].footlength;
   $scope.effectiveTopTube = formThree[0].effectivetoptube;
   $scope.standover = formThree[0].standover;
   $scope.seatTubeLength = formThree[0].seattubelength;
   $scope.seatTubeAngle = formThree[0].seattubeangle;
   $scope.headTubeLength = formThree[0].headtubelength;
   $scope.headTubeAngle = formThree[0].headtubeangle;
   $scope.stack = formThree[0].stack ;
   $scope.reach = formThree[0].reach;
   $scope.wheelBase = formThree[0].wheelbase ;
   $scope.chainstayLength = formThree[0].chainstaylength ;
   $scope.bbDrop = formThree[0].bbDrop ;
   $scope.axleToCrown = formThree[0].axletocrown ;
   $scope.mechanicalTrail = formThree[0].mechanicaltrail ;
   $scope.forkOffset = formThree[0].forkoffset;
   $scope.notes = formThree[0].notes;
 }
 };
 $scope.formThreeLoad();


  $scope.submitFrameGeometry = function(){
    console.log('complete clicked');
    var objectToSend = {
      employeeCreated: employee,
      bikeId: bike.bikeid,
      date: $scope.date.toString().substring(0,15),
      inseam: $scope.inseam,
    	torso: $scope.torso,
    	arm: $scope.arm,
    	footLength: $scope.footLength,
    	effectiveTopTube: $scope.effectiveTopTube,
    	standover: $scope.standover,
    	seatTubeLength: $scope.seatTubeLength,
    	seatTubeAngle: $scope.seatTubeAngle,
    	headTubeLength: $scope.headTubeLength,
    	headTubeAngle: $scope.headTubeAngle,
    	stack: $scope.stack ,
    	reach: $scope.reach,
    	wheelBase: $scope.wheelBase ,
    	chainstayLength: $scope.chainstayLength ,
    	bbDrop: $scope.bbDrop ,
    	axleToCrown: $scope.axleToCrown ,
    	mechanicalTrail: $scope.mechanicalTrail ,
    	forkOffset: $scope.forkOffset,
      notes: $scope.notes
    };
    if (objectToSend.inseam == undefined) {
        alert("Please indicate inseam measure - all fields are required");
    } else if (objectToSend.torso == undefined) {
      alert("Please indicate torso measure - all fields are required");
    } else if (objectToSend.arm == undefined) {
      alert("Please indicate arm measure - all fields are required");
    } else if (objectToSend.footLength == undefined) {
      alert("Please indicate foot length - all fields are required");
    } else if (objectToSend.effectiveTopTube == undefined) {
      alert("Please indicate effective top tube - all fields are required");
    } else if (objectToSend.standover == undefined) {
      alert("Please indicate standover - all fields are required");
    } else if (objectToSend.seatTubeLength == undefined) {
      alert("Please indicate seat tube length - all fields are required");
    } else if (objectToSend.seatTubeAngle == undefined) {
      alert("Please indicate seat tube angle - all fields are required");
    } else if (objectToSend.headTubeLength == undefined) {
      alert("Please indicate head tube length - all fields are required");
    } else if (objectToSend.headTubeAngle == undefined) {
      alert("Please indicate head tube angle - all fields are required");
    } else if (objectToSend.stack == undefined) {
      alert("Please indicate stack measure - all fields are required");
    } else if (objectToSend.reach == undefined) {
      alert("Please indicate reach measure - all fields are required");
    } else if (objectToSend.wheelBase == undefined) {
      alert("Please indicate wheel base measure - all fields are required");
    } else if (objectToSend.chainstayLength == undefined) {
      alert("Please indicate chainstay length - all fields are required");
    } else if (objectToSend.bbDrop == undefined) {
      alert("Please indicate BB Drop - all fields are required");
    } else if (objectToSend.axleToCrown == undefined) {
      alert("Please indicate axle to crown measure - all fields are required");
    } else if (objectToSend.mechanicalTrail == undefined) {
      alert("Please indicate mechanical trail measure - all fields are required");
    } else if (objectToSend.forkOffset == undefined) {
      alert("Please indicate fork offset - all fields are required");
    } else {
    console.log('object to send:', objectToSend);
    //hide submit, show update and pdf
    $scope.showHideSubmitFormThree = false;
    //disable input fields
    $scope.submittedThree = true;

    $http({
        method: 'POST',
        url: '/addFrameGeometry',
        data: objectToSend
      }).then(function successCallback(response){
        console.log('back from server with:', response.data);
        sessionStorage.setItem('formThree', JSON.stringify(response.data));
      }, function errorCallback(response) {
        console.log('err');
    });// end http call
  }
  }; // end addform3

  ////////////////FORM 3 PUT(Update) Route to DB///////////////////////////////////////
  $scope.saveFormThree = function(){
    console.log('complete clicked');
    //show update
    $scope.hideUpdate = true;
    //hide save
    $scope.showSaveThree = false;
    // lock form
    $scope.submittedThree=true;

    var editFormThreeObject = {
      employeeUpdated: employee.employee,
      bikeId: bike.bikeid,
      date: $scope.date.toString().substring(0,15),
      inseam: $scope.inseam,
    	torso: $scope.torso,
    	arm: $scope.arm,
    	footLength: $scope.footLength,
    	effectiveTopTube: $scope.effectiveTopTube,
    	standover: $scope.standover,
    	seatTubeLength: $scope.seatTubeLength,
    	seatTubeAngle: $scope.seatTubeAngle,
    	headTubeLength: $scope.headTubeLength,
    	headTubeAngle: $scope.headTubeAngle,
    	stack: $scope.stack ,
    	reach: $scope.reach,
    	wheelBase: $scope.wheelBase ,
    	chainstayLength: $scope.chainstayLength ,
    	bbDrop: $scope.bbDrop ,
    	axleToCrown: $scope.axleToCrown ,
    	mechanicalTrail: $scope.mechanicalTrail ,
    	forkOffset: $scope.forkOffset,
      notes: $scope.notes
    };

    console.log('object to send:', editFormThreeObject);
    //hide submit, show update and pdf
    $scope.showHideSubmitFormThree = false;
    //disable input fields
    $scope.submittedThree = true;

    $http({
      method: 'PUT',
      url: '/editFormThree',
      data: editFormThreeObject
    }).then(function(editForm3Response){
      console.log('success from server', editForm3Response);
      sessionStorage.setItem('formThree', JSON.stringify(editForm3Response.data));
    });
  }; //End saveFormThree


  //update form 3 on click
  $scope.updateFormThree = function(){
    //hide update
    $scope.hideUpdate = false;
    //show save
    $scope.showSaveThree = true;
    // unlock
    $scope.submittedThree=false;
  };

  // // save form 3 on click
  // $scope.saveFormThree= function(){
  //     //show update
  //     $scope.hideUpdate = true;
  //     //hide save
  //     $scope.showSaveThree = false;
  //     // lock form
  //     $scope.submittedThree=true;
  // };

  // $scope.updateFormThree = function(){
  //   //reset form to submit staus
  //   $scope.submittedThree = false;
  //   $scope.showHideSubmitFormThree = true;
  // };
  $scope.downloadFormThreePdf = function(){
    console.log("In the PDF click");
    var docDefinition =
      {pageOrientation: 'landscape',
      content: [
        {
          text: 'Custom Frame Geometry',
          style: 'header',
          bold: true,
          margin: [ 1, 2, 5, 5 ]
        },
        {text: "Name:" },
        {text: '' + obj.firstname + ' ' + obj.lastname, margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Phone:" },
        {text: '' + obj.phonenumber, margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Email:" },
        {text: '' + obj.email, margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Address:"},
        {text: '' + obj.streetaddress + ' ' + obj.unitnumber + ' ' + obj.city + ' ' + obj.state + ' ' + obj.zip, margin: [ 1, 2, 5, 5 ], bold: true},

        {text:"Date: " + '' + '' + $scope.date.toString().substring(0,15), margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Inseam:"},
        {text: '' + $scope.inseam, margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Torso:"},
        {text: '' + $scope.torso, margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Arm:"},
        {text: '' + $scope.arm, margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Foot Length:"},
        {text: '' + $scope.footLength, margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Effective Top Tube:"},
        {text: '' + $scope.effectiveTopTube, margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Standover:"},
        {text: '' + $scope.standover, margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Seat Tube Length:"},
        {text: '' + $scope.standover, margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Seat Tube Angle:"},
        {text: '' + $scope.seatTubeAngle, margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Head Tube Length:"},
        {text: '' + $scope.headTubeLength, margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Stack:"},
        {text: '' + $scope.stack, margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Reach:"},
        {text: '' + $scope.reach, margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Wheel Base:"},
        {text: '' + $scope.wheelBase, margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Chainstay Length:"},
        {text: '' + $scope.chainstayLength, margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Bottom Bracket Drop:"},
        {text: '' + $scope.bbDrop, margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Axle to Crown:"},
        {text: '' + $scope.axleToCrown, margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Mechanical Trail:"},
        {text: '' + $scope.mechanicalTrail, margin: [ 1, 2, 5, 5 ], bold: true},

        {text: "Fork Offset:"},
        {text: '' + $scope.forkOffset, margin: [ 1, 2, 5, 5 ], bold: true},
      ]
    };
    pdfMake.createPdf(docDefinition).download('customFrameGeometry.pdf');
  };
}]);//end form3Controller
