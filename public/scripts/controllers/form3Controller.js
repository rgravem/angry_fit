myApp.controller("form3Controller", ['$scope', '$http', function($scope, $http){
  console.log('In form3Controller');
  // set form to edit and submit status
  //show submit button, hide update and pdf
  var bike = JSON.parse(sessionStorage.getItem('selectedBike'));
  var employee = JSON.parse(sessionStorage.getItem('employee'));
  var formThree = JSON.parse(sessionStorage.getItem('formThree'));
  $scope.date= new Date();
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
      employeeUpdated: employee.employeeid,
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
      {content: [
      {text: "Date: " + $scope.frameGeometryFormDate.toString().substring(0,15) },
      {text: "Inseam: " + $scope.inseam },
      {text: "Torso: " + $scope.torso },
      {text: "Arm: " + $scope.arm },
      {text: "Foot Length: " + $scope.footLength },
      {text: "Effective Top Tube: " + $scope.effectiveTopTube },
      {text: "Standover: " + $scope.standover },
      {text: "Seat Tube Length: " + $scope.seatTubeLength },
      {text: "Seat Tube Angle: " + $scope.seatTubeAngle },
      {text: "Head Tube Length: " + $scope.headTubeLength },
      {text: "Stack: " + $scope.stack },
      {text: "Reach: " + $scope.reach },
      {text: "Wheel Base: " + $scope.wheelBase },
      {text: "Chainstay Length: " + $scope.chainstayLength },
      {text: "Bottom Bracket Drop: " + $scope.bbDrop },
      {text: "Axle to Crown: " + $scope.axleToCrown },
      {text: "Mechanical Trail: " + $scope.mechanicalTrail },
      {text: "Fork Offset: " + $scope.forkOffset }
      ]
    };
    pdfMake.createPdf(docDefinition).download('customFrameGeometry.pdf');
  };
}]);//end form3Controller
