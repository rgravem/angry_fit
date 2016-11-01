myApp.controller("form2Controller", ['$scope', '$http', function($scope, $http){
  console.log('In form2Controller');
    // set form to edit and submit status
    //show submit button, hide update and pdf
  $scope.showHideSubmitFormTwo = true;
    //keep all input fields active
    $scope.submittedTwo=false;

    // focus / blur properties for inputs
   $scope.saddleHeightFocus = function(){
     document.getElementById("saddleHeightMeasure").className.baseVal = "showMeasurement";
   };
   $scope.saddleHeightBlur= function(){
     document.getElementById("saddleHeightMeasure").className.baseVal = "hideMeasurement";
   };
   $scope.saddleOverBarsFocus = function(){
     document.getElementById("saddleHeightOverBarsMeasure").className.baseVal = "showMeasurement";
   };
   $scope.saddleOverBarsBlur = function(){
     document.getElementById("saddleHeightOverBarsMeasure").className.baseVal = "hideMeasurement";
   };
   $scope.handleBarReachFocus = function(){
    document.getElementById("handleBarReach").className.baseVal = "showMeasurement";
  };
  $scope.handleBarReachBlur = function(){
    document.getElementById("handleBarReach").className.baseVal = "hideMeasurement";
  };
  $scope.saddleAngleFocus= function(){
    document.getElementById("saddleAngle").className.baseVal = "showMeasurement";
  };
  $scope.saddleAngleBlur = function(){
    document.getElementById("saddleAngle").className.baseVal = "hideMeasurement";
  };
  $scope.saddleForeAftFocus = function(){
    document.getElementById("saddleForeAft").className.baseVal = "showMeasurement";
  };
  $scope.saddleForeAftBlur = function(){
    document.getElementById("saddleForeAft").className.baseVal = "hideMeasurement";
  };
  $scope.saddleBrandFocus = function(){
  document.getElementById("saddleBrand").className.baseVal = "showMeasurement";
  };
  $scope.saddleBrandBlur = function(){
  document.getElementById("saddleBrand").className.baseVal = "hideMeasurement";
  };
  $scope.stemLengthFocus= function(){
  document.getElementById("stemLengthMeasure").className.baseVal = "showMeasurement";
  };
  $scope.stemLengthBlur= function(){
    document.getElementById("stemLengthMeasure").className.baseVal = "hideMeasurement";
  };
  $scope.stemAngleFocus= function(){
  document.getElementById("stemAngleMeasure").className.baseVal = "showMeasurement";
  };
  $scope.stemAngleBlur= function(){
    document.getElementById("stemAngleMeasure").className.baseVal = "hideMeasurement";
  };
  $scope.handleBarWidthFocus= function(){
  document.getElementById("handleBarWidthMeasure").className.baseVal = "showMeasurement";
  };
  $scope.handleBarWidthBlur= function(){
    document.getElementById("handleBarWidthMeasure").className.baseVal = "hideMeasurement";
  };
  $scope.handleBarBrandFocus= function(){
  document.getElementById("handleBarBrandMeasure").className.baseVal = "showMeasurement";
  };
  $scope.handleBarBrandBlur= function(){
    document.getElementById("handleBarBrandMeasure").className.baseVal = "hideMeasurement";
  };
  $scope.pedalBrandFocus= function(){
  document.getElementById("pedalBrandMeasure").className.baseVal = "showMeasurement";
  };
  $scope.pedalBrandBlur= function(){
    document.getElementById("pedalBrandMeasure").className.baseVal = "hideMeasurement";
  };
  $scope.brakeLevelFocus= function(){
  document.getElementById("brakeLevelPositionMeasure").className.baseVal = "showMeasurement";
  };
  $scope.brakeLevelBlur= function(){
    document.getElementById("brakeLevelPositionMeasure").className.baseVal = "hideMeasurement";
  };
  $scope.crankLengthFocus= function(){
  document.getElementById("crankLengthMeasure").className.baseVal = "showMeasurement";
  };
  $scope.crankLengthBlur= function(){
    document.getElementById("crankLengthMeasure").className.baseVal = "hideMeasurement";
  };
  $scope.standoverFocus = function(){
   document.getElementById("standoverMeasure").className.baseVal = "showMeasurement";
  };
  $scope.standoverBlur= function(){
   document.getElementById("standoverMeasure").className.baseVal = "hideMeasurement";
  };
  $scope.stackFocus= function(){
    document.getElementById("stackMeasure").className.baseVal = "showMeasurement";
  };
  $scope.stackBlur= function(){
    document.getElementById("stackMeasure").className.baseVal = "hideMeasurement";
  };


  $scope.addForm2NewFit = function () {
    console.log('in addForm2NewFit');
    var addForm2NewFitObject = {
      employeeCreated: employee.employeeid,
      bikeId: bike.bikeid,
      date: $scope.date.toString().substring(0,15),
      saddleHeight: $scope.saddleHeight,
      saddleHeightOverBars:$scope.saddleHeightOverBars,
      saddleToHandlebarReach:$scope.saddleToHandlebarReach,
      saddleAngle:$scope.saddleAngle,
      saddleForeAft:$scope.saddleForeAft,
      saddleBrandAndWidth:$scope.saddleBrandAndWidth,
      stemLength:$scope.stemLength,
      stemAngle:$scope.stemAngle,
      handleBarWidth:$scope.handleBarWidth,
      handleBarBrandAndModel:$scope.handleBarBrandAndModel,
      pedalBrandAndModel:$scope.pedalBrandAndModel,
      shoeBrandModelSize:$scope.shoeBrandModelSize,
      brakeLevelPosition:$scope.brakeLevelPosition,
      crankLength:$scope.crankLength,
      standover:$scope.standover,
      stack:$scope.stack,
      notes: $scope.notes
    };

    console.log('addForm2NewFitObject to send to DB:', addForm2NewFitObject);
      //hide submit, show update and pdf
      $scope.showHideSubmitFormTwo = false;
        //disable input fields
        $scope.submittedTwo = true;
    $http({
      method: 'POST',
      url: '/addForm2NewFit',
      data: addForm2NewFitObject
    }).then(function(form2Response){
      console.log('success from server', form2Response);
    });
  };

  ////////////////FORM 2 PUT(Update) Route to DB///////////////////////////////////////
  $scope.saveFormTwo = function(){
    console.log('complete clicked');
    //show update
    $scope.hideUpdate = true;
    //hide save
    $scope.showSaveTwo = false;
    // lock form
    $scope.submittedTwo=true;

    var editFormTwoObject = {
      employeeUpdated: employee.employeeid,
      bikeId: bike.bikeid,
      date: $scope.date.toString().substring(0,15),
      saddleHeight: $scope.saddleHeight,
      saddleHeightOverBars:$scope.saddleHeightOverBars,
      saddleToHandlebarReach:$scope.saddleToHandlebarReach,
      saddleAngle:$scope.saddleAngle,
      saddleForeAft:$scope.saddleForeAft,
      saddleBrandAndWidth:$scope.saddleBrandAndWidth,
      stemLength:$scope.stemLength,
      stemAngle:$scope.stemAngle,
      handleBarWidth:$scope.handleBarWidth,
      handleBarBrandAndModel:$scope.handleBarBrandAndModel,
      pedalBrandAndModel:$scope.pedalBrandAndModel,
      shoeBrandModelSize:$scope.shoeBrandModelSize,
      brakeLevelPosition:$scope.brakeLevelPosition,
      crankLength:$scope.crankLength,
      standover:$scope.standover,
      stack:$scope.stack,
      notes: $scope.notes
    };

    console.log('object to send:', editFormTwoObject);
    //hide submit, show update and pdf
    $scope.showHideSubmitFormTwo = false;
      //disable input fields
      $scope.submittedTwo = true;

    $http({
      method: 'PUT',
      url: '/editFormTwo',
      data: editFormTwoObject
    }).then(function(editForm2Response){
      console.log('success from server', editForm2Response);
    });
  }; //End saveFormTwo


  //update form 2 on click
  $scope.updateFormTwo = function(){
    //hide update
    $scope.hideUpdate = false;
    //show save
    $scope.showSaveTwo = true;
    // unlock
    $scope.submittedTwo=false;
  };

  // // save form 2 on click
  // $scope.saveFormTwo= function(){
  //     //show update
  //     $scope.hideUpdate = true;
  //     //hide save
  //     $scope.showSaveTwo = false;
  //     // lock form
  //     $scope.submittedTwo=true;
  // };

  //
  // $scope.updateFormTwo = function(){
  //   //reset form to submit staus
  //   $scope.submittedTwo = false;
  //   $scope.showHideSubmitFormTwo = true;
  // };

  $scope.downloadFormTwoPdf = function(){
    console.log("In the PDF click");
    var docDefinition =
      {content: [
        { text: "Date: " + $scope.date.toString().substring(0,15)},
        { text: "Saddle Height: " + $scope.saddleHeight },
        { text: "Saddle Height Over Bars: " + $scope.saddleHeightOverBars },
        { text: "Saddle to Handlebar reach: " + $scope.saddleToHandlebarReach },
        { text: "Saddle Angle: " + $scope.saddleAngle },
        { text: "Saddle Fore-aft: " +$scope.saddleForeAft },
        { text: "Saddle Brand/Width: " + $scope.saddleBrandAndWidth },
        { text: "Stem Length: " + $scope.stemLength },
        { text: "Stem Angle:" + $scope.stemAngle },
        { text: "Handle Bar Width: " + $scope.handleBarWidth },
        { text: "Handle Bar Brand and Model: " + $scope.handleBarBrandAndModel },
        { text: "Pedal Brand and Model: " + $scope.pedalBrandAndModel },
        { text: "Shoe Brand/Model/Size: " + $scope.shoeBrandModelSize },
        { text: "Brake Level Position: " + $scope.brakeLevelPosition },
        { text: "Crank Length: " + $scope.crankLength },
        { text: "Standover: " + $scope.standover},
        { text: "stack: " + $scope.stack}
      ]// end pdf content
    }; // end docDefinition
    pdfMake.createPdf(docDefinition).download('newFitForm.pdf');
  };// end downloadFormTwoPdf

}]);//end form2Controller
