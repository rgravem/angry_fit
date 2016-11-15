
myApp.controller("form2Controller", ['$scope', '$http', '$location','$mdToast', '$animate', 'checkmarkService', function($scope, $http, $location, $mdToast, $animate, checkmarkService){
  console.log('In form2Controller');
    // set form to edit and submit status
    //show submit button, hide update and pdf
  var bike = JSON.parse(sessionStorage.getItem('selectedBike'));
  var employee = JSON.parse(sessionStorage.getItem('employee'));
  var formTwo = JSON.parse(sessionStorage.getItem('formTwo'));
  var obj = JSON.parse(sessionStorage.getItem('customer'));



  //toast set Up
  var errorMessage;

  $scope.toastPosition = {
    bottom: false,
    top: true,
    left: false,
    right: true
  };

  $scope.getToastPosition = function(){
    return Object.keys($scope.toastPosition)
      .filter(function(pos){return $scope.toastPosition[pos];})
      .join(' ');
  };

  $scope.showSimpleToast = function(){
    $mdToast.show(
      $mdToast.simple()
      .content("New Fit form saved.")
      .position($scope.getToastPosition())
      .hideDelay(2500)
    );
  };

  $scope.showUpdateToast = function(){
    $mdToast.show(
      $mdToast.simple()
      .content("New Fit form updated.")
      .position($scope.getToastPosition())
      .hideDelay(2500)
    );
  };
  $scope.showErrorToast = function(){
    $mdToast.show(
      $mdToast.simple()
      .content(errorMessage)
      .position($scope.getToastPosition())
      .hideDelay(2500)
    );
  };

  $scope.date= new Date();
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
  $scope.submitButton = function(){
    if (formTwo == undefined) {
      console.log('starting new');
    } else if(formTwo[0] !== undefined) {
    $scope.showHideSubmitFormTwo = false;
    $scope.submittedTwo = true;
  }
  };

  $scope.formTwoLoad = function(){
    if (formTwo == undefined){
      console.log('starting new bike');
    }else if (formTwo[0] == undefined){
      console.log('New Fit has no data');
    } else {
    console.log("form 2 session:", formTwo[0]);
    $scope.saddleHeight = formTwo[0].saddleheight;
    $scope.saddleHeightOverBars = formTwo[0].saddleheightoverbars;
    $scope.saddleToHandlebarReach = formTwo[0].saddletohandlebarreach;
    $scope.saddleAngle = formTwo[0].saddleangle;
    $scope.saddleForeAft = formTwo[0].saddleforeaft;
    $scope.saddleBrandAndWidth = formTwo[0].saddlebrandandwidth;
    $scope.stemLength = formTwo[0].stemlength;
    $scope.stemAngle = formTwo[0].stemangle;
    $scope.handleBarWidth = formTwo[0].handlebarwidth;
    $scope.handleBarBrandAndModel = formTwo[0].handlebarbrandandmodel;
    $scope.pedalBrandAndModel = formTwo[0].pedalbrandandmodel;
    $scope.shoeBrandModelSize = formTwo[0].shoebrandmodelsize;
    $scope.brakeLevelPosition = formTwo[0].brakelevelposition;
    $scope.crankLength = formTwo[0].cranklength;
    $scope.standover = formTwo[0].standover;
    $scope.stack = formTwo[0].stack;
    $scope.notes = formTwo[0].notes;
  }
  };
  $scope.formTwoLoad();

  $scope.submitButton();

  $scope.addForm2NewFit = function () {
    console.log('in addForm2NewFit');
    var addForm2NewFitObject = {
      employeeCreated: employee,
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
    checkmarkService.newFitSubmitted();
    if (addForm2NewFitObject.saddleHeight == undefined) {
        errorMessage = "Please indicate saddle height - all fields are required";
          $scope.showErrorToast();
    } else if (addForm2NewFitObject.saddleHeightOverBars == undefined) {
      errorMessage = "Please indicate saddle height over bars - all fields are required";
      $scope.showErrorToast();
    } else if (addForm2NewFitObject.saddleToHandlebarReach == undefined) {
      errorMessage = "Please indicate saddle to handlebar reach - all fields are required";
      $scope.showErrorToast();
    } else if (addForm2NewFitObject.saddleAngle == undefined) {
      errorMessage = "Please indicate saddle angle - all fields are required";
      $scope.showErrorToast();
    } else if (addForm2NewFitObject.saddleForeAft == undefined) {
      errorMessage = "Please indicate saddle fore-aft - all fields are required";
      $scope.showErrorToast();
    } else if (addForm2NewFitObject.saddleBrandAndWidth == undefined) {
      errorMessage = "Please indicate saddle brand and width - all fields are required";
      $scope.showErrorToast();
    } else if (addForm2NewFitObject.stemLength == undefined) {
      errorMessage = "Please indicate stem length - all fields are required";
      $scope.showErrorToast();
    } else if (addForm2NewFitObject.handleBarWidth == undefined) {
      errorMessage = "Please indicate handle bar width - all fields are required";
      $scope.showErrorToast();
    } else if (addForm2NewFitObject.handleBarBrandAndModel == undefined){
      errorMessage = "Please indicate handle bar brand and model - all fields are required";
      $scope.showErrorToast();
    } else if (addForm2NewFitObject.brakeLevelPosition == undefined){
      errorMessage = "Please indicate brake level position - all fields are required";
      $scope.showErrorToast();
    } else if (addForm2NewFitObject.crankLength == undefined){
      errorMessage = "Please indicate crank length - all fields are required";
      $scope.showErrorToast();
    } else if (addForm2NewFitObject.standover == undefined){
      errorMessage = "Please indicate standover - all fields are required";
      $scope.showErrorToast();
    } else if (addForm2NewFitObject.stack == undefined){
      errorMessage = "Please indicate stack - all fields are required";
      $scope.showErrorToast();
    } else {
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
      sessionStorage.setItem('formTwo', JSON.stringify(form2Response.data));
      $scope.showSimpleToast();
    });
  }
  };

  ////////////////FORM 2 PUT(Update) Route to DB///////////////////////////////////////
  $scope.saveFormTwo = function(){
    console.log('complete clicked');
    $scope.showUpdateToast();
    //show update
    $scope.hideUpdate = true;
    //hide save
    $scope.showSaveTwo = false;
    // lock form
    $scope.submittedTwo=true;

    var editFormTwoObject = {
      employeeUpdated: employee,
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
      sessionStorage.setItem('formTwo', JSON.stringify(editForm2Response.data));
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
      {pageOrientation: 'landscape',
      content: [

                   {text: 'Fit done by:' + ' ' + employee, alignment: 'right'},
                   {text: ' ' + $scope.date.toString().substring(0,15), alignment: 'right'},


                  {

                    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA0EAAANBCAYAAAAm/bXZAAAgAElEQVR4nOzde3hV1Z3H/zW/Zx6f3Zs5aZ9CgoyBU8tlQkEKPbFVMDgQQYaDQbmUajCZBGpIgIB5gFy0mhs2RQLBWEgmgehQLsqBTRUT+JVINq1JpRpJDGKMlyIJ9jf10LGd/fjP/P6Q2BSBJOecvdY++7xffw2Ys/d31gyQT9b6fpcQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8vyT6gIi2f/93/+pLgEAlHr1ZNPI26YnnlddBwCo9E//xLfksv2z6gIAAJGn80ybVvxo3jPd3d23aJpmJiff9+yqDQX1qusCAEQGYqdC7AQBiESlBeuzjhzRFwsh7uj328aI2NgLyzOzS+72Jr+pqjYAUIGdIPlYcYUIQQAiSV3VNm/97rps0zQ18Y8BqD9jQnz8G2s3FuaO/94kU2Z9AKAKIUg+VlwhQhCASNCg+yburKrMv9DTM0JcO/xcyZg3z7svr/jJ7VbWBgB2QAiSjxVXiBAEwMk6z7RpO7Y99VhLa+sdYvDhpz9D0zQzZVlqZWrmKj3U9QGAXRCC5GPFFSIEAXCq0oL1WceONc43TXNmCB5nuN3urpTU9C30CwFwIkKQfKy4QoQgAE5TV7XNe2Df3oxP/J+4RGC7P9djJHg8xopVax+nXwiAkxCC5GPFFSIEAXCKV082jazcUl7U3d19iwh9+PkHmqYdnzUr6TD9QgCcghAkHyuuECEIgBOsyVhWFkTfT6CMaFe0Py1jefn9Dzx0UuJ7ASDkCEHyseIKEYIAhLN+fT/XG3ltNcPtdndl5+QW3jY98byiGgAgKIQg+VhxhQhBAMLR88/tml5bvTPXor6fQBkJHo9RUb17o+pCAGCoCEHyseIKEYIAhJPOM21a8aN5z8jo+wmQoWmaSb8QgHBDCJKPFVeIEAQgXOStzsw70XRijrBn+LmSEe2K9q9el5vPSG0A4YAQJB8rrhAhCIDdbdtUnOLzvfCg4r6fQBlut7ur4InShxmpDcDOCEHyseIKEYIA2FWD7pu4dXN5ic36fgJlzEiccbR0a1Wp6kIA4GoIQfKx4goRggDYTeeZNu2psqLy9o6OW0X4h5/+DE3TzJRlqZWpmat01cUAQH+EIPlYcYUIQQDspLRgfdaRI/pi4azwcyVjRGzsheWZ2SX0CwGwC0KQfKy4QoQgAHZQV7XNW7+7LjtM+34CZUyIj39j7cbCXPqFAKhGCJKPFVeIEARApQbdN7G+ribHxiOvZTDmzfPuY6Q2AJUIQfKx4goRggCo0HmmTdux7anHWlpb7xCRG376M6Jd0f6Fi5dU0y8EQAVCkHysuEKEIACylRaszzp2rHG+aZozVddiQ4bb7e5KSU3fQr8QAJkIQfKx4goRggDI8vxzu6bXVu/MdcjIa6sZCR6PsWLV2sfpFwIgAyFIPlZcIUIQAKu9erJpZOWW8qII7/sJiKZpx2fNSjpMvxAAqxGC5GPFFSIEAbDSmoxlZfT9BM2IdkX70zKWl9//wEMnVRcDwJkIQfKx4goRggBYoV/fTySNvLaa4Xa7u7Jzcgtvm554XnUxAJyFECQfK64QIQhAKDXovolbN5eX0PdjKWNG4oyjpVurSlUXAsA5CEHyseIKEYIAhELnmTat+NG8Z+j7kcbQNM1MTr7v2VUbCupVFwMg/BGC5GPFFSIEAQhW3urMvBNNJ+YIwo8KRrQr2r96XW4+I7UBBIMQJB8rrhAhCECgtm0qTvH5XniQvh9bMNxud1fBE6UPM1IbQCAIQfKx4goRggAMVYPum7izqjL/Qk/PCEH4sRtj3jzvPkZqAxgqQpB8rLhChCAAg9V5pk17qqyovL2j41ZB+LEzQ9M0M2VZamVq5ipddTEAwgMhSD5WXCFCEIDBKC1Yn3XkiL5YEH7CiTEiNvbC8szsEvqFAAyEECQfK64QIQjA9dRVbfMe2Lc3g5HXYc2YEB//xtqNhbn0CwG4FkKQfKy4QoQgAFfToPsm1tfV5DDy2jk0TTs+a1bSYfqFAFwNIUg+VlwhQhCA/jrPtGk7tj31WEtr6x2C8ONERrQr2r9w8ZJq+oUA9EcIko8VV4gQBKBPacH6rGPHGuebpjlTdS2wnOF2u7tSUtO30C8EQAhCkAqsuEKEIADPP7drem31zlz6fiKSkeDxGBXVuzeqLgSAWoQg+VhxhQhBQOR69WTTyMot5UX0/UQ8Q9M0k34hILIRguRjxRUiBAGRaU3GsjL6fnAFI9oV7U/LWF5+/wMPnVRdDAC5CEHyseIKEYKAyLJtU3GKz/fCg6ZpaoIAhKsz3G53V8ETpQ8zUhuIHIQg+VhxhQhBQGRo0H0Tt24uL6HvB0NgzEiccbR0a1Wp6kIAWI8QJB8rrhAhCHC2zjNtWvGjec/Q94MAGZqmmcnJ9z27akNBvepiAFiHECQfK64QIQhwrrzVmXknmk7MEYQfBM+IdkX7V6/LzWekNuBMhCD5WHGFCEGA89RVbfPW767Lpu8HFjAmxMe/sXZjYS79QoCzEILkY8UVIgQBztGg+yburKrMv9DTM0IQfmAtY9487z5GagPOQQiSjxVXiBAEhL/OM23aU2VF5e0dHbcKwg/kMTRNM1OWpVamZq7SVRcDIDiEIPlYcYUIQUB4Ky1Yn3XsWON80zRnqq4FEcsYERt7YXlmdgn9QkD4IgTJx4orRAgCwlNd1TbvgX17Mxh5DRsxEjweY8WqtY/TLwSEH0KQfKy4QoQgILw06L6J9XU1OYy8hl1pmnZ81qykw/QLAeGFECQfK64QIQgIH2sylpW1tLbeIQg/sD8j2hXtT8tYXn7/Aw+dVF0MgIERguRjxRUiBAH216/vh5HXCDeG2+3uys7JLbxteuJ51cUAuDZCkHysuEKEIMC+nn9u1/Ta6p259P3AAYwEj8eoqN69UXUhAK6OECQfK64QIQiwn1dPNo2s3FJeRN8PHMbQNM2kXwiwJ0KQfKy4QoQgwF7yVmfmnWg6MUcQfuBcRrQr2r96XW4+I7UB+yAEyceKK0QIAuxh26biFJ/vhQfp+0EEMdxud1fBE6UPM1IbUI8QJB8rrhAhCFCrQfdN3Lq5vIS+H0QwY0bijKOlW6tKVRcCRDJCkHysuEKEIECNzjNtWvGjec/Q9wMIIS73CyUn3/fsqg0F9aqLASIRIUg+VlwhQhAgX2nB+qwjR/TFgvADXMkYERt7YXlmdgn9QoBchCD5WHGFCEGAPHVV27z1u+uy6fsBBmRMiI9/Y+3Gwlz6hQA5CEHyseIKEYIA6zXovok7qyrzL/T0jBCEH2AojHnzvPsYqQ1YjxAkHyuuECEIsE7nmTbtqbKi8vaOjlsF4QcIlKFpmpmyLLUyNXOVrroYwKkIQfKx4goRggBrlBaszzp2rHG+aZozVdcCOIThdru7UlLTt9AvBIQeIUg+VlwhQhAQWnVV27wH9u3NYOQ1YBkjweMxVqxa+zj9QkDoEILkY8UVIgQBofHqyaaRlVvKixh5DcihadrxWbOSDtMvBIQGIUg+VlwhQhAQvDUZy8paWlvvEIQfQDYj2hXtT8tYXn7/Aw+dVF0MEM4IQfKx4goRgoDA9ev7YeQ1oJbhdru7snNyC2+bnnhedTFAOCIEyceKK0QIAobu+ed2Ta+t3plL3w9gO0aCx2NUVO/eqLoQINwQguRjxRUiBAGD13mmTSt+NO8Z+n4AWzM0TTOTk+97dtWGgnrVxQDhghAkHyuuECEIGJy81Zl5J5pOzBGEHyBcGNGuaP/qdbn5jNQGBkYIko8VV4gQBFzftk3FKT7fCw/S9wOELcPtdncVPFH6MCO1gWsjBMnHiitECAKurkH3Tdy6ubyEvh/AMYwZiTOOlm6tKlVdCGBHhCD5WHGFCEHAP+o806Y9VVZU3t7Rcasg/ABOY2iaZqYsS61MzVylqy4GsBNCkHysuEKEIODvSgvWZx05oi8WhB/A6YwRsbEXlmdml9AvBHyOECQfK64QIQgQoq5qm7d+d102fT9AxDEmxMe/sXZjYS79Qoh0hCD5WHGFCEGIZA26b+LOqsr8Cz09IwThB4hkxrx53n15xU9uV10IoAohSD5WXCFCECJR55k2bce2px5raW29QxB+AHzOiHZF+xcuXlJNvxAiESFIPlZcIUIQIk1pwfqsY8ca55umOVN1LQBsyXC73V0pqelb6BdCJCEEyceKK0QIQqR4/rld02urd+Yy8hrAIBkJHo9RUb17o+pCABkIQfKx4goRguB0r55sGlm5pbyou7v7FkH4ATA0hqZp5qxZSYfpF4LTEYLkY8UVIgTBydZkLCuj7wdACBjRrmh/Wsby8vsfeOik6mIAKxCC5GPFFSIEwYn69f0w8hpAKBlut7srOye38LbpiedVFwOEEiFIPlZcIUIQnKRB903curm8hL4fABYzZiTOOFq6tapUdSFAqBCC5GPFFSIEwQk6z7RpxY/mPUPfDwCJDE3TzOTk+55dtaGgXnUxQLAIQfKx4goRghDu8lZn5p1oOjFHEH4AqGFEu6L9q9fl5jNSG+GMECQfK64QIQjhatum4hSf74UH6fsBYBOG2+3uKnii9OHx35tkqi4GGCpCkHysuEKEIISbBt03cWdVZf6Fnp4RgvADwH6MefO8+xipjXBDCJKPFVeIEIRw0XmmTXuqrKi8vaPjVkH4AWBvhqZpZsqy1MrUzFW66mKAwSAEyceKK0QIQjgoLVifdeSIvlgQfgCEF2NEbOyF5ZnZJfQLwe4IQfKx4goRgmBndVXbvPW767Lp+wEQ5owEj8dYsWrt4/QLwa4IQfKx4goRgmBHDbpvYn1dTQ4jrwE4iaZpx2fNSjpMvxDsiBAkHyuuECEIdtJ5pk3bse2px1paW+8QhB8AzmREu6L9CxcvqaZfCHZCCJKPFVeIEAS7KC1Yn3XsWON80zRnqq4FACQw3G53V3ZObuFt0xPPqy4GIATJx4orRAiCas8/t2t6bfXO3E/8n7gEuz8AIo+R4PEYFdW7N6ouBJGNECQfK64QIQiqvHqyaWTllvIi+n4A4POR2vQLQSVCkHysuEKEIKiwJmNZGX0/APAlRrQr2p+Wsbz8/gceOqm6GEQWQpB8rLhChCDItG1TcYrP98KDjLwGgOsy3G53V8ETpQ8zUhuyEILkY8UVIgRBhgbdN3Hr5vIS+n4AYEiMGYkzjpZurSpVXQicjxAkHyuuECEIVuo806YVP5r3DH0/ABAwQ9M0Mzn5vmdXbSioV10MnIsQJB8rrhAhCFbJW52Zd6LpxBxB+AGAUDCiXdH+1ety8+/2Jr+puhg4DyFIPlZcIUIQQq2uapu3fnddNn0/AGAJY0J8/BtrNxbm0i+EUCIEyceKK0QIQqg06L6JO6sq8y/09IwQhB8AsJoxb553HyO1ESqEIPlYcYUIQQhW55k27amyovL2jo5bBeEHAGQyNE0zU5alVqZmrtJVF4PwRgiSjxVXiBCEYJQWrM86ckRfLAg/AKCS4Xa7u1JS07fQL4RAEYLkY8UVIgQhEHVV27wH9u3NYOQ1ANiKkeDxGCtWrX2cfiEMFSFIPlZcIUIQhqJB902sr6vJYeQ1ANiXpmnHZ81KOky/EIaCECQfK64QIQiDtSZjWVlLa+sdgvADAOHAiHZF+9Mylpff/8BDJ1UXA/sjBMnHiitECMJASgvWZx071jifkdcAEJYMt9vdlZ2TW3jb9MTzqouBfRGC5GPFFSIE4Vqef27X9Nrqnbn0/QCAIxgJHo9RUb17o+pCYE+EIPlYcYUIQbjSqyebRlZuKS+i7wcAHMfQNM2kXwhXQwiSjxVXiBCE/vJWZ+adaDoxRxB+AMDJjGhXtH/1utx8RmqjDyFIPlZcIUIQhBBi26biFJ/vhQfp+wGAiGK43e6ugidKH2akNghB8rHiChGCIluD7pu4dXN5CX0/ABDRjBmJM46Wbq0qVV0I1CEEyceKK0QIikydZ9q04kfznqHvBwBwmaFpmpmyLLUyNXOVrroYyEcIko8VV4gQFHlKC9ZnHTmiLxaEHwDAlxkjYmMvLM/MLqFfKLIQguRjxRUiBEWOuqpt3vrdddn0/QAABsGYEB//xtqNhbn0C0UGQpB8rLhChCDna9B9E3dWVeZf6OkZIQg/AIChMebN8+5jpLbzEYLkY8UVIgQ5V+eZNu2psqLy9o6OWwXhBwAQOCPaFe1fuHhJNf1CzkUIko8VV4gQ5EylBeuzjh1rnG+a5kzVtQAAHMNwu91dKanpW+gXch5CkHysuEKEIGepq9rmPbBvbwYjrwEAFjISPB5jxaq1j9Mv5ByEIPlYcYUIQc7QoPsm1tfV5DDyGgAgi6Zpx2fNSjpMv5AzEILkY8UVIgSFvzUZy8paWlvvEIQfAIB8RrQr2p+Wsbz8/gceOqm6GASOECQfK64QISh89ev7YeQ1AEA1w+12d2Xn5BbeNj3xvOpiMHSEIPlYcYUIQeHn+ed2Ta+t3plL3w8AwIaMBI/HqKjevVF1IRgaQpB8rLhChKDw0XmmTSt+NO8Z+n4AADZnaJpmJiff9+yqDQX1qovB4BCC5GPFFSIEhYe81Zl5J5pOzBGEHwBA+DCiXdH+1ety8xmpbX+EIPlYcYUIQfa2bVNxis/3woP0/QAAwpjhdru7Cp4ofZiR2vZFCJKPFVeIEGRPDbpv4tbN5SX0/QAAHMSYN8+7j5Ha9kQIko8VV4gQZC+dZ9q0p8qKyts7Om4VhB8AgPMYmqaZKctSK1MzV+mqi8HfEYLkY8UVIgTZR2nB+qwjR/TFgvADAHA+Y0Rs7IXlmdkl9AvZAyFIPlZcIUKQenVV27z1u+uy6fsBAEQgY0J8/BtrNxbm0i+kFiFIPlZcIUKQOg26b+LOqsr8Cz09IwThBwAQwTRNOz5rVtJh+oXUIQTJx4orRAiSr/NMm7Zj21OPtbS23iEIPwAA9DGiXdH+hYuXVNMvJB8hSD5WXCFCkFylBeuzjh1rnG+a5kzVtQAAYFOG2+3uSklN30K/kDyEIPlYcYUIQXLUVW3zHti3N4OR1wAADJqR4PEYFdW7N6ouJBIQguRjxRUiBFnr1ZNNIyu3lBd1d3ffIgg/AAAMlaFpmkm/kPUIQfKx4goRgqyzJmNZGX0/AACEhBHtivanZSwvv/+Bh06qLsaJCEHyseIKEYJCr1/fDyOvAQAILcPtdncVPFH6MCO1Q4sQJB8rrhAhKHQadN/ErZvLS+j7AQDAcsaMxBlHS7dWlaouxCkIQfKx4goRgoLXeaZNK3407xn6fgAAkMrQNM1MTr7v2VUbCupVFxPuCEHyseIKEYKCk7c6M+9E04k5gvADAIAqRrQr2r96XW4+I7UDRwiSjxVXiBAUmG2bilN8vhcepO8HAADbMCbEx7+xdmNhLv1CQ0cIko8VV4gQNDQNum/izqrK/As9PSME4QcAADsy5s3z7mOk9tAQguRjxRUiBA1O55k27amyovL2jo5bBeEHAAC7MzRNM1OWpVamZq7SVRcTDghB8rHiChGCBlZasD7ryBF9sSD8AAAQbowRsbEXlmdml9AvdH2EIPlYcYUIQddWV7XNW7+7Lpu+HwAAwp6R4PEYK1atfZx+oasjBMnHiitECPqyBt03sb6uJoeR1wAAOIumacdnzUo6TL/QlxGC5GPFFSIE/V3nmTZtx7anHmtpbb1DEH4AAHAqI9oV7V+4eEk1/UJ/RwiSjxVXiBD0udKC9VnHjjXON01zpupaAACAFIbb7e7KzsktvG164nnVxahGCJKPFVco0kPQ88/tml5bvTP3E/8nLsHuDwAAkchI8HiMiurdG1UXohIhSD5WXKFIDUGvnmwaWbmlvIi+HwAAIC6P1I7kfiFCkHysuEKRGILWZCwro+8HAABchRHtivavXpebH2kjtQlB8rHiCkVSCNq2qTjF53vhQUZeAwCAARhut7ur4InShyNlpDYhSD5WXKFICEENum/i1s3lJfT9AACAITJmJM44Wrq1qlR1IVYjBMnHiivk5BDUeaZNK3407xn6fuAksTHDRU/vRdVlAEAkMTRNM5OT73t21YaCetXFWIUQJB8rrpBTQ1De6sy8E00n5gjCDxxA0zSR8IMp4mtf+5p46eVG1eUAQKQyRsTGXliemV3ixH4hQpB8rLhCTgtBdVXbvPW767Lp+4FTTJ0yWaT/dLmo+eVO8drp11WXAwAQwpgQH//G2o2FuU7qFyIEyceKK+SUENSg+yburKrMv9DTM0IQfuAAfeEnOjparMlazRE4ALAfY9487z6njNQmBMnHiisU7iGo80yb9lRZUXl7R8etgvCD8KePHhXXvT5/w/pJnsTPmhsP/V9p8Sbhv3RJdV0AgKszNE0zU5alVqZmrtJVFxMMQpB8rLhC4RyCSgvWZx05oi8WhB+EP90VFeXPys4smbsw5ZwQQuytfdqzY0dNi2k65qQFADiZ4Xa7u1JS07eEa78QIUg+VlyhcAxBdVXbvAf27c1g5DUcQNc0zfTOu2dfTkHJwb7frK4om1lbV58thPAqrA0AMHRGgsdjrFi19vFw6xciBMnHiisUTiGoQfdNrK+ryWHkNRxCnzplcktl7Z5/uHtiQ1Z61ivNp2YJAhAAhC1N047PmpV0OJz6hQhB8rHiCoVDCOo806bt2PbUYy2trXcIwg/Cnx4bM7z3P9LTNvcdfeuTnbY077XTrycIAhAAOIER7Yr2p2UsL7//gYdOqi5mIIQg+VhxhewegkoL1mcdO9Y43zTNmaprAUJAv2d2kq/wya27rvwP6UuSSzo6z04QBCAAcBrD7XZ3ZefkFt42PfG86mKuhRAkHyuukF1D0PPP7ZpeW70zl74fOIQ+elRc98Mrf1o2Lenej6/8jwvuTtzR03sxRhCAAMDJjASPx6io3r1RdSFXQwiSjxVXyG4h6NWTTSMrt5QX0fcDp9A0bf+Vgw/6IwABQEQxNE0zk5Pve3bVhoJ61cX0RwiSjxVXyE4haE3GsjL6fuAgemzM8N6cdWsKr7b7IwQBCAAimBHtivavXpebb5eR2oQg+VhxhewQgrZtKk7x+V540DRNTRCA4AzX7P3pQwACAIjL/UIFT5Q+rHqkNiFIPlZcIZUhqEH3Tdy6ubyEvh84yJcuPb0aAhAA4ArGjMQZR0u3VpUO/KXWIATJx4orpCIEdZ5p04ofzXuGvh84jB4/flx7zV5f/vW+iAAEALgGQ9M0M2VZamVq5ipd9ssJQfKx4grJDkGlBeuzjhzRFwvCD5xFX7Rwwe5rDT/oQwACAAyCMSI29sLyzOwSmf1ChCD5WHGFZIWguqpt3vrdddn0/cBhdFdUlD+vYEPutYYf9CEAAQCGyJgQH//G2o2FuTL6hQhB8rHiClkdghp038SdVZX5F3p6RgjCD5xFHz0qrnvP4ZdzBvpCAhAAIAjGvHnefXnFT2638iWEIPlYcYWsCkGdZ9q0p8qKyts7Om4VhB84z4DT3/oQgAAAIWBEu6L9CxcvqbaqX4gQJB8rrpAVIai0YH3WsWON803TnBnyhwOKaZq2f+mPF1VnrNl4fKCvJQABAELMcLvdXSmp6VtC3S9ECJKPFVcolCGormqb98C+vRmMvIZDDbr/RwghstOW5r12+vUEQQACAISekeDxGBXVuzeG6oGEIPlYcYVCEYIadN/E+rqaHEZew8H02JjhvQcbmlYM5osJQAAACQxN08xZs5IOh6JfiBAkHyuuULAhaE3GsrKW1tY7BOEHzqVPnTK5pbJ2z6AusCtav/qhl15uTBYEIACAHEa0K9qflrG8/P4HHjoZ6EMIQfKx4goFGoL69f0w8hpOpt857fZjm7bXDOonbNUVZTNr6+qzBQEIACCf4Xa7u7Jzcgtvm554fqgfJgTJx4orNNQQ9Pxzu6bXVu/Mpe8HEUBPS02pHMwABCGEePFA/Zji4rJyQQACAKhlzEiccbR0a9WgTjD0IQTJx4orNNgQ9OrJppGVW8qL6PtBhBhSAGpuPDTs0cLHK03TXGR1YQAADIKhaZqZnHzfs6s2FNQP5gOEIPlYcYUGE4LyVmfmnWg6MUcQfhABNE3b/0TRY9mDmQDXZ87023b7L11KsbIuAAACYES7ov2r1+XmDzRSmxAkHyuu0PVC0LZNxSk+3wsP0veDSBFIAOIuIABAGDDcbndXwROlD4//3iTzal9ACJKPFVfoaiGoQfdN3Lq5vIS+H0SSQAIQo7ABAGHGmDfPu+9qI7UJQfKx4gr1D0GdZ9q0p8qKyts7Om4VhB9EDl3TNHOoAWhLcf6C/QcOLhMEIABAeDE0TTNTlqVWpmau0vt+kxAkHyuuUF8IKi1Yn3XkiL5YEH4QWYZ0CWofJsEBABzAGBEbe2F5ZnbJ3d7kNwlB8rHiCr315htaZvpDR+j7QQQKKAC1tTbdsCY751kmwQEAHMKYkTjjaNm2Z4Y0UhvB+2fVBUSyD9/rHmOa5kzVdQCSBRSAhBDi8cKfMQobAOAkd3zw4QddqouIRIQgAFIFGoCy05bmXZ4EBwRK7/+L0aPiuvv/+lvf+uafhn372xcCeXDn2bcn9f/1J5/4v+m/dMl1xZdxhBMAbIIQBEAaTdP256xbUzjUz1VXlM1kEhwGoAshhKZpZmzM8Atf/cpX/hYXd/M7Qgjx3bFj3vrGN77hvzHqRv9QBnCE0osH6scIIXIvfPTRzb09vSP/+oy+q0UAACAASURBVNe/fv3DP57/jmmaX70i3PP/4wAgASEIgBSBjMEWQojmxkPD9vxqf4bgm0N8Thfi812cvp2b70+d8luVAWcw5i5MOXf5fzx3ra958UD9mAsffVTZ29M7svPs25Ou2E3i//8BIIQIQQAsF2gAEkKILZsriugDiki6EJ8fn7zpphEf9IWdkXE3vz/Jk/iZ6uKscDkofSkk9YWjd7veHffhH89/5733P3Bf/k8EIwAIECEIgKWCCUD0AUWMfwg8bvfos2PGjm3vt3sS0fqFo+N9v9fceGjY2bc6K9/tenfcuXe6vtfvzwnBCAAGgRAEwEr6ihXpmwMJQPQBOdoXR9rGjxvb9v2pU35L4BmaaUn3fjwt6d7jol8wevFA/Zg/vHba13n27UnsFgHA9RGCAFhFT0tNqVyStrJ1qB9sa226gT4gR/lip2fyrZN+R+ixxtyFKef6r+uLB+rHNL9y8hg7RQDwZYQgAFbQFy1csDtjzcbjA3/pl3EfkCPorqgo/y23uN++/Y7bjwcShhGcK0NRdUXZzDffPNPS3tE56fIl3QQiABGLEAQg1PSpUya35BSUHAzkw0XrVz9EH1DY0mNjhvdOm3Z7w1TPDww7T2uLRJd/KHFciL/vErW92f6DyxPoCEQAIgohCEAo6fHjx7VX1u4pDeTDzY2Hhr30cmOy4BuycPJF8LkradavnTq5zWn67xI1Nx4a9qL+awIRgIhCCAIQMrExw3tr9vryA/18afGmcmHzb8BcUVHCf+mS6jJUI/g4yOUhC9uFIBABiByEIAAhoWna/seKfpYd6Oc3ZKVn9bsY0pbunHa7OPdOV6SGIN0VFeVPSvq3wwQf5+ofiPbWPu05ZZyihwiAIxGCAISC/kTRY9mBfmP84oH6Ma80n5olbPpNlqZp4pFHcsR/PbdH9PReVF2OTLqmaeaE+PFti5YsqqHHJ7IsSVvZ2jfQorqibObRow29l/v1bPnnFACGghAEIFh6WmpKZTDfIG+vrMoXNv3GKjZmuHis6Gei5pc7xXvvf6C6HFn00aPiumfMuPPFQCf8wVky1mw8nrFm4/G21qYbflX/3PKW35+exu4QgHBGCAIQDP3OabcfC+YbZRsfg9OnTpncUlm7p7S6ouz/Xjv9uup6rPbFrk/6T5f/guNuuJpJnsTPJnkStwshtldXlM08ePCwn94hAOGIEAQgUProUXHdm7bXbA/0ATY+BqenpaZUZqzZeLy58dCwPb/ar7oeK33R6xPoWHNEpr7doRcP1I/xveBr7+g8O0HY788yAFwVIQhAQFxRUf49h1/OCeYZ/1lTu07Y7JsmTdP2P/JITmHf+ODS4k3lpmmqLssK+uhRcd3e+fN+xUWmCMblcdv5ba1NN9T8cucjr51+PeHyf7LVn20A6I8QBCAQel7BhtxgHmDDS1H12JjhvTnr1hT29TelL0kuselRvWDoU6dMbpk9Z/bzfUEPCIVJnsTPKj2JpUJ8/uf7N00nTfqGANgVIQjAUAU9CKGttekGm12Kqo8eFdfdf2drS3H+Aocd79GnTpncQr8PZCh8cuuuQiF2EYYA2BUhCMBQ6FOnTG4JdmLYkyWbnhT2+YboiwEIfb/R3Hho2P4DB5cJ+9QYDMIPlCEMAbArQhCAQYuNGd7bPywEYm/t05733v/AHaqagqTfOe32Y1cOd9iyuaJIhP83aoQf2AZhCIDdEIIADIqmaftz1q0pDPY5O3bU2GUYwhcT4Pr/5oas9Cyb9SoNFeEHttUXhjZkpWe90nxKCHv8XQAgAhGCAAyG7p13z75g+oCE+DxgXP4JsGpXDUA2Htk9GHr8+HHt2WtXP074gd1t2l6zva21aWflU1sfc1jvHYAwQQgCMBA9fvy49mDvkGlrbbrBDgFD07T9K1akb77aWOjtlVX5Ivy+GdNHj4rr/skDS59h2hvCySRP4mc1exPzXzxQP+a/ntvTffmYbLj9+QMQpghBAK7LFRXlr9nryw/2OXYYhqBp2v4nih7LvtqO1oas9KwwG4etu6Ki/AsWzH822EEVgEqX7xnKqa4om7nnV/vpFwIgxf+jugAAtqZnZWeWBPsQOwxDuF4ACrdjcJqm7b9ndpLv6MlXlxGA4BQZazYeP9Hy+uI7p91+TAihq64HgLOxEwTgWvQ7p91+LBRHrHbvenalUBgwrheAhAirY3D0/cDxNm2v2d7ceGj/M0//kiNyACxDCAJwVbExw3uvHB0diKL1qx9SecxsoAAUJsfgdFdUlD8rO7OEvh9EgmlJ9348LenenC3F+Qv0Iy9xRA5AyHEcDsDV6KEYhy2EEL9pOjlHqPvmRX/kkZzCawWg5sZDw8LgGJzed/SNAIRIk1NQcvBEy+uL48ePaxcckQMQQuwEAbiSfs/sJF+w47CFUD4SW09LTam8XnCw+aWo+uhRcd0Pr/xpWSj+bwGEs5q9vvy9tU97duyoYVcIQEiwEwTgH8TGDO8tfHLrrmCfo3gk9lXvAepvS3H+Arteiqpp2v5FCxfs3nP45RwCEPC5JWkrW9kVAhAq7AQB6C9kx+BqfrnzEaEoAN0zO8k30NQ0/chLi4X9fpqsjx4V170+f8N6Bh8AV3fFrtAi1fUACE+EIAB9QnYMrrnx0LDXTr+eEIqihkifOmVyy0A7WdlpS/MUHtO7Kk3T9nvn3bMv2EtpgUiwJG1l6/gJ8Q8+WbLpAhPkAASC43AAhBCfX4oaimNwQgjxzNO/3Cjkf1Oix8YM762s3VN6vS/qF9Ds8k2THhszfGdF5ZYHCUDA4E3yJH625/DLOffMTvIJjscBGCJCEAAhQnQpqhCfXzyq4mJUV1SU/2BD04qBvk5RQLsW/Z7ZSb6DDU0rOP4GBKbwya27fl5eluGKiqoXhCEAg0QIAhCyS1GFEOK/ntvzsJAcMjRN259XsCF3oK/bW/u0R0VAuwrdFRVVX1CwMTdUu29AJJuWdO/HR0++uoyhCQAGixAERDhN08xQXIoqhLJdIH3pjxdVD6aXafeuZ1cK9btAevz4ce3c+wOEXs1eX/6ihQt2C4IQgAEQgoDIpi/98aLqUD1MwS6QPnXK5JaBJsEJ8flIbP+lSy4ZRV2Hvmjhgt01e335iusAHCunoOTgz8vLMjRN2y8IQwCugRAERLDRo+K6BxMgBkPFLtBgBiH0UTwSW3dFRdX/vLwsg+EHgPWmJd378YmW1xfHxgzvFQQhAFdBCAIil74+f8P6UD1M9i6Qpmn7B3unUdH61Q8pHImtjx4V13305KvLuPgUkOtgQ9OKqVMmtwiCEIArEIKAyKTfOe32Y6GaSKZgF2jQfUBCCPGbppNzhMKLW/ccfjlHwbsBCCEqa/eUpqWmVAqCEIB+uCwViEChHIYghPRdID1+/Lj2wR7jU7ULpGna/hUr0jcvSVvZKvvdAP5RxpqNx0fcdNOHv/jFFtM0zUWq6wGgHiEIiDwhHYYgexdI0zRzKIMFFOwC6bExw3tz1q0p5PgbYB9zF6acuzHqxuzS4k3m5SEpqidFAlCI43BAhImNGd4bqmEIQgjhe8G3TEjcBVqxIn3zYL9YwS6QHj9+XPvBhqYVBCDAfvruE2JgAgBCEBBZ9P9ITxt0iBhIW2vTDR2dZyeE6nkD0OPHj2sfyvEyybtA+j2zk3yMvwbs72BD0wouVgUiGyEIiCDx48e1h/KCzppf7nxESAoZQz0GJ3kXSE9LTaksfHLrLknvAxCkmr2+fCbHAZGLEAREDj177erHQ/WwttamG147/XpCqJ43AN077559Q/mArF0gTdP2/7y8LCOURwwByFFZu6eUIAREJkIQEBlCOhJbCCH0F3xLhaRdoNGj4rqHcsmorF0gTdP2P1H0WDb9P0D4YoQ2EJmYDgdEgFCPxBbii50WGfSHV/60bCgfkLALpMfGDO99rOhn2aEMlgDU6NvJra2rF4KpcUBEIAQBzqfflTj9aCgfWF1RNlNSv41+57Tbjw1lp0VCbXpszPDegw1NKyx8BwDJCEJAZCEEAQ6naZoZ6ob9gwcPPyjk9NsMeQfL4toIQICDEYSAyEEIApwt5LtALx6oH3P5okGrDXkYgsW1EYCACEAQAiIDIQhwMFdUlD/Uu0CyLkd1RUX5hzIMQQhLayMAARGEIAQ4HyEIcC59wYL5z4bygRIvR9WXPfTg00P5gIW1EYCACEQQApyNEAQ4lCsqyh/qu2t+Vf/cciHhm4HRo+K6l6StbB3KZyyqjQAERDCCEOBchCDAmUK+CySEEC2/Pz0t1M+8Cv0nDyx9ZqgfsqI2AhAAghDgTFyWCjiQFbtAssZix48f1z53Ycq5oXzGito0Tdv/WNHPskP5TADhKWPNxuNTp0xuEVyoCjgGIQhwHkt2gU6ceGWusP6noHr22tWPD/VDoa5N07T9TxQ9xkWoAL5QWbunlCAEOAchCHAYTdPMUO8CtbU23fDe+x+4Q/nMq5k6ZXLLUINHqGvrC0BDuaAVQGSorN1TGj9+XLsgCAFhjxAEOEvI7wUSQtpABD39p8t/MdQPhbg2femPF1UTgABcS81eX35szPBeQRACwhohCHAQTdPMUN8LJIScgQiB7AIJIUTbm+0/CFEJelpqSmWod9EAOM/BhqYVrqgov+o6AASOEAQ4hyW7QHtrn/ZIGIgQ0C7Q3tqnPf5Ll1yheP89s5N8BCAAg5VXsCFX07T9qusAEBhCEOAgVuwCHW88Pl9YfBQufvy49kB2gU4Zp2aK4GvTp06Z3GLF2gFwrmlJ9378yCM5hYJjcUBYIgQBDnF5alHIdXSenWDFc/vRk+9L3h3IB9s7OicF++6pUya3VNbuKQ3yOQAi0NyFKefSUlMqBUEICDuEIMAZAjpONpAtxfkLQv3MK40eFdc91HuBhAjJMT09NmZ4LwEIQDC4QwgIT4QgwAFGj4rrtuJOm+bmU3cLa4/C6d75834VyAeDPQoXGzO892BD04pAPw8AfSpr95QyMQ4IL4QgIPzpP3lg6TOhfmhba9MNPb0XY0L93P5cUVH+JWkrWwP5bDBH4TRN2/9Y0c+yA/08AFzpYEPTCk3TTNV1ABgcQhAQ5lxRUf5AjpMNRH/Bt1RYvAu0YMH8ZwP5YDBH4fouQ7Vi5wxAZHui6LFswW4QEBYIQUB4CzhIDOS3v2uZYcVz+2iaZgY6kjqIo3D6ihXpm7kMFYAVpiXd+/GihQt2C4IQYHuEICCMBRMkrqe58dCwEN2/c00JP5jSHOhnAzwKp6elplQGevwOAAYjp6DkYPz4ce2CIATYGiEICGMT4se3WfHcF/VfLxIWH4X7ccoDOwP5YHPjoWEBHIXjMlQA0tTs9eW7oqL8qusAcG2EICB8WTIWWwgh2t5s/4EVz+0T6OWoQgQU0LgMFYB0eQUbcgW7QYBtEYKAMGXZWGzrj8LpM5NmHg70w+fe6freUN41elRcN3cBAZCN/iDA3ghBQHjSZ8y480UrHmz1UbhgxmILIcQQxnbrsTHDe/ccfjkn0HcBQDByCkoOjh4V1y0IQoDtEIKAMGTVQAQhrD8K96MfJpwI9LPVFWUzB/u1mqaZXIYKQLU9h1/O4f4gwH4IQUAYCmay2vW0tTbdYPVROO99yXsC/fCbb57xiEHsUvXdBRToewAglFasSN8s2A0CbIUQBIQffa733/db8eDfNB77d2HhUbhg+5i6urrHDuLL9EceySnkLiAAdrEkbWXr1CmTWwRBCLANQhAQZmJjhvda9Q1+c/Opu6147mVB9TENcpdKT0tNqZy7MOVcoO8BACtU1u4pZWw2YB+EICC86HPm3H3Aige3tTbdMIShA0MWbB9TZ3vHreL6u1TcBQTA1rKyM0sEu0GALRCCgDBj1Tf5rb/93XRh4VG4YC92feMPr3uu85+5CwiA7c1dmHLuzmm3HxMEIUA5QhAQRuLHj2u36tktr7bOsOrZQgj99jtuDyq8ffjH89+51rO5CwhAuNi0vWY70+IA9QhBQPgI6pLRgbz73vu3WPVsTdPMYO4GEkKI997/wH2V3+YuIABhh2lxgHqEICBMhCJIXMve2qc9pmlqVjxbiOCPwr14oH7M1X6fu4AAhKMlaStbrdzZBzAwQhAQJoINEtdzud/Gqn6goI/CXfjoo5vFFfVxFxCAcJa9dvXjmqZZct0BgIERgoDwEHSQuJ5z73R9z6pnh2IH692ud8dd8Vv6ihXpm7kLCEC4muRJ/OyuxOlHBcfiACUIQUAYcEVF+a06Cmf1aOxQ7GBdMRRBT0tNqbRqPQBAlsInt+7i7iBADUIQEAYmTZzwe6uebfFo7JDsYPX0XhzR97w7p91+jLuAADgFdwcBahCCAPvT53r/3bJz42++eeZ69+8ELRQ7NpeHNuhTp0xu2bS9ZnsIygIAW5i7MOUcQxIA+QhBgM25oqL8Vva+tHd0TrLq2aH4h71vMlxszPBe7gIC4ETZa1c/LtgNAqQiBAE2Z+VRuObGQ8OsHI2dcJvnRLDPuPDRRze7oqL8jMIG4FSTPImf3TM7yScIQoA0hCDA3vRbvz/ZsgEAr7X+/g5hYT+Q50c/PBnsQz799NMb8wo25IaiIACwq8Int+7SNM1UXQcQKQhBgI1ZeUGqEEJ0tL81xapnx8YM753kSfws2OfkFJQcDMdR2NUVZTObGw8NU10HgPDhnXfPPsFuECAFIQiwMSsvSBVCiHffe/8Wq5495ru3nLHq2XZXXVE288SJV+aGY3gDoE5OQclBRmYDchCCAPuy9IJUi/uBLD3GZ2fVFWUza+vqs3/ywNJnVNcCIPwsWDD/WcFuEGA5QhBgY1YehbO4H8jS2u2qufHQsD2/2p8xelRc99yFKedU1wMg/GSs2Xg8NmZ4r+o6AKcjBAE2ZfW9Ed3d742z6tmjR8V1W/Vsu2puPDTs0cLHK03T1NgFAhCM/0hP2yzYDQIsRQgCbCp+wr+etvL5XV3dY6169vhxYy3tZbKbfgFoEbtAAII1d2HKuUj8YRIgEyEIsCf9rqRZv7bq4W2tTTf4L11yWfR4/ftTp/zWomfbTv8AJITQ2QUCEAqX/y5hNwiwCCEIsCFXVJQ/FOOlr6WzveNWYWE/UKTshLS1Nt3QLwAJdoEAhAq7QYC1CEGADU2aOOH3Vj7/jT+87rHq2ZH0j/bjhT/7IgAJdoEAhBi7QYB1CEGA/Vg+XvrDP57/jlXPjpR+oAV3J+7o6b0Y0/drdoEAhNrchSnnmBQHWIMQBNiQ1eOl33v/A7dFj9a/O3bMWxY92zb6BaC+I4XsAgGwxJw5dx8Q7AYBIUcIAmzG6uNkzY2Hhln5fKffD3SVAMQuEADLZKzZeNwVFeVXXQfgNIQgwGasPk529q3OicKioQhO/4c6fUlyyZUBSLALBMBiCxbMf1awGwSEFCEIsBfLx0u/2/WuZZek3nKL+22rnq1adtrSvI7OsxPEFQGSXSAAVstYs/G4pmmm6joAJyEEATaiaZpp9TfUVg5FcLtHn7Xq2Splpy3Ne+306wniyztounf+vF+pqAlAZLkrcfpR1TUATkIIAmzkO6NHdVn9DiuHIowZO7bdomcrc50AJFxRUX6n90ABsAfvfcl7BEfigJAhBAE2Ehd38ztWPt/qoQhOOxa2ISs961oBSAihXz6nDwCWm+RJ/GzqlMktqusAnIIQBNiH5f1ADEUYvOqKspmvNJ+aJa6xXq6oKH/Gmo3HJZcFIILNnjP7ecFuEBAShCDARqzeSent6R1p1bNvGhF73qpny1ZdUTaztq4+W1w7MLILBEA6Lk8FQocQBNiE1fcDCSFE59m3J1n1bKuP8skyiADELhAAZbg8FQgNQhBgE1bfDySEEJ984v+mVc/+7tgxb1n1bFkGE4AEu0AAFGJcNhAahCDAHnQZIcJ/6ZLLokfrN4286X2Lni3FiwfqxwwiALELBEC5CfHjLf+hGeB0hCDAJqwetfzigfoxVj5/WtK9H1v5fCs1Nx4a9otfbCkSAw+NYBcIgHKLliyqERyJA4JCCAJsQMZktQsffXSzsGgyXDg36jY3Hhr2aOHjlaZpLhroa9kFAmAH05Lu/dhpEzkB2QhBgA3ccov7bavfYeVkOE3T/mbVs600lAAk2AUCYCNJSf92WHUNQDgjBAE24HaPPmv1O6ycDCdjqEOoDTEAsQsEwFbuSpr1a8GROCBghCBAPX3M2LHtVr/ENM2vWvXsr3/j63+x6tlW2bK5omiwAUiwCwTAZiZ5Ej+LHz/O8n87AKciBAE2YPUlqUII0dN7McaiR0sJcaG04O7EHUNZD3aBANhRwm2eE4LdICAghCBAMRlDBZobDw2z6tmuqCi/jBAXKv0C0GCHRLALBMCW+OEMEDhCEKDYN6Oj/z+r3/GXS39xCQsmw2matj+vYENuqJ9rlQACELtAAGyNI3FAYAhBgGJxcTe/Y/U7/vDa6R9Z8Fh9xYr0zeFyP1AgAUiwCwTA5jgSBwSGEAQo9t2xY95SXUMA9HtmJ/msvuA1VLLTluYFEICEpmkmu0AA7Iy/o4DAEIIAtfSbRt70vtUvCfF4bD1+/Lj2wie37grhMy2TnbY077XTryeIoR8H1O9KnH7UipoAIJQ4EgcMHSEIUCxcjpP1iY0Z3luz15evuo7BCCIACU3TzHAJegAiG0figKEjBAEKyZgMJ4QQPb0XR4TiOZqm7c9Zt6YwFM+yWjABSLALBCCMcCQOGDpCEKCQpml/k/Ee0zS1EDxGf+SRnMJw2LnaUpy/IIgAxC4QgLAzelRct+oagHBCCAIUGj9ubJvqGgZJX7Rwwe5wuA+ouqJs5v4DB5eJwEeCswsEIOz84AdTmlXXAIQTQhCg0Ne/8fW/WP2OFw/UjwnyEfrUKZNbcgpKDoakIAtVV5TNrK2rzxZB3InELhCAcHRX0qxfC/qCgEEjBAEKjRk7VtZEn4BDQWzM8N7K2j2loSzGCqEIQIJdIABhapIn8TNXVJRfdR1AuCAEAeroN0bdaOt/sDRN2/9Y0c+yVdcxkL21T3tCEIDYBQIQ1iZNnPB71TUA4YIQBCgkY8jAubffnhDgR/VHHskpnORJ/CykBYVYc+OhYTt21KwTQQYgwS4QgDB36/cntwqOxAGDQggCHO7T//n0xgA+FhaDEJobDw17tPDxStM0FwX7LHaBAIS7JWkrW1XXAIQLQhCgiI3HmYbFIIRQBiDBLhAAh7Dxvy2ArRCCAPyDcBiEEOIAxC4QAMcIo6sXAKUIQYAiN//LyHdV13ClcBmEEMoAJNgFAuAg35865beCviBgQIQgQJGvfe1rn6qu4Qr6ihXpm+0+CGHB3Yk7TNPUQvU8doEAOIndezkBuyAEAQ738Z/+NGIQX6bfMzvJZ/em2gV3J+7o6b0YI4KfBPcFdoEAOA19QcDA/ll1AUCkunxkwXL//d9//vYAX6LHjx/XbvfdECsCkBBCvP5G2w+Xzp89SQghvvqVr/wtLu7md77+ja//ZczYse38RBVAOLr5X0a++977H6guA7A1QhAQ4WJjhvfW7PXlq67jeqwKQEII0dN7cXn/X3d0nu37H/Xi4jLhiory3zQi9nz8hH89fVfSrF/b/bggANz6/cmtrzSf0oUFf2cCTkEIAiKYpmn7c9atKVRdx/Vkpy3NsyoADcArhBD+S5eE/9Il0dF5Vuw/cFB3RUX5J02c8Pu53n/fL+OyWwAYqiVpK1u3bt2uugzA1ghBgBr6yLib31ddw9IfL6q28zfy2WlL8147/XqCsM9PM73+S5fEK82nUl5pPjUrdnNF77RptzfY/U4lAJHHFRXl91+6pLoMwLYYjAAoovhYlX7ntNuPZazZeFxhDddlwwB0JW9P78Xl+w8cXDYjYfK+DVnpWW2tTTeoLgoAhBDiphGx51XXANgZIQiIPHpszPDeTdtrbHtWIgwCUH9e0zQXvdJ8qvKnGQ8f2JCVnqW6IACIi7v5HdU1AHZGCAIc7lvf+uaf+v9a0zTzYEPTClX1DKRo/eqHwigAXcn7SvOpWTMSJu8rWr/6IdXFAIhcXJoKXB8hCFBA0zRT1ruGffvbF/r9Un/kkRzbDkKoriib+dLLjckiPANQH69pmoteerkxecHdiTtePFA/RnVBACIPI/6B6yMEAQrExgy/MPBXhZy+aOGC3Xb9h7G6omxmbV19tgjvANSft6f34vLi4rJydoUAqOCKivKrrgGwK0IQEBn0+PHj2u06xcyBAag/b9+uEIMTAMgUHe36s+oaALsiBAERwM4Xojo8APXx9vReXL4mO+dZjscBkGX8uLFtqmsA7IoQBDjc17/x9b/Y9ULU5sZDwyIgAH3BNM1FxcVl5dUVZTNV1wLA+b47dsxbqmsA7IrLUgGHs+sRuObGQ8MeLXy8UkRIAOrHW1tXL97tenecnceUAwh/N4286X3x+YS4SPt7FhgQO0EApOsLQKZpLlJdiyLeV5pPzcpOW5qnuhAAzjUt6d6PVdcA2BUhCIBUBKAveF87/XoCQQiAlZgQB1wdIQhQ4Ktf+crfVNegAgHoS7yvnX49gRHaAKzChDjg6ghBgAJxcTe/o7oGFbZsrigiAH2J96WXG5MZlgDACkyIA66OEARAiqXzZ2/p6b0Yo7oOm/LW1tVnNzceGqa6EAAAIgEhCIDlNmSlZ733/gduwYSi6/FenpYHACHz/alTfqu6BsCOCEEALLW39mnPK82nZgkC0IBM09SWzp+9RXUdAJzjxqgb/eLzMdkA+iEEAbDUjh016wQBaLC8773/gXtLcf4C1YUAcAbGZANXRwgCYJn0JcklpmlqqusIM179yEuL21qbblBdCAAATkUIAmCJFw/Uj+noPDtBsAs0ZKZpLnqyZNOTqusA4AyjR8V1q64BsBtCEKDAx3/60wjVNVhte2VVviAABey99z9w76192qO6DgAAnIgQBCjw3//952+rNBBUyAAAIABJREFUrsFKRetXP+S/dMmluo4w592969mVqosAEP5u/peR76quAbAbQhCAkPtN08k5gl2goPkvXXJxiSqAYH3ta1/7VHUNgN0QggCEVNH61Q8xDCFkvAcPHn5QdRFAoF48UD/mxQP1Y1TXAQBX+mfVBQBwFpvuAumuqCj/TSNiz8fF3fyOEEJ8d+yYt955+9y/CiHEX//6169/+Mfz37l8oasQNqq/bzcoY83G46prAYZq7sKUc0vnz94yd2FKjupaItn3p0757UsvN6ouA7AVQhCAkKmuKJtpo10gPTZmeO+cOXcf8PzohycneRI/u8rXtF75G3trn/acMk61vHb69YTLv6U6EHmPHm3oJQQhXH3yif+bzY2HhnFfDQA7IQQBCJmjRxsWCvWhQR89Kq77Jw8sfWbuwpRzQ/3wkrSVrUvSVrYK8fnRvt80nTRN01wU+jIHr6f3YgzfRCJcRUe7/rx/7/70aUn3lqquJcLpQv3fz4Bt0BMEICSaGw8N6+m9GKOwBF3TtP2rV2eV7Dn8ck4gAehKhU9u3VVRueXB+PHjSsXn30Co4t2/d3+6wvcDAfvWt775p347q1AgFH8fAk5DCAIQEi/qv14k1P2UUY8fP679RMvri/t2cUJlkifxs5q9vvxFCxfsFgqDUHtH5yRV7waCMezb374gxOc7q4pLAYAvEIIABXp6LzrustS2N9t/oOjV+tQpk1tq9vryrXxJTkHJwZ+Xl2Vomrbfyvdci2maGpenIhzFxMacF0J4f/u7lhmqawGAPoQgQAEbDQ8IiebGQ8MUXY6qT50yuaWydo+UXoNpSfd+/ETRY9mKgpD3lHGKO4MQdkbcdNOHQnw+6ZBx2QDsghAEIGhN/++Je4T8o3B6/Phx7bICUJ9pSfd+vGJF+mah4GhcV1f3WNnvBEJEF0J4Xz768v2qC4lUrqgov+oaADshBAEIWufZt6X3q7iiovxWH4G7liVpK1vvmZ3kE5KDkP/SJVdba9MNMt8JBKt/Uz69bepER7v+rLoGwE4IQQCC1u+SUVn0rOzMEsnv/AeFT27dFRszvFfya72tv/3ddMnvBELGNE2tuqKMY50AlCMEAYo0Nx4aprqGUFDxv8fUKZNb7DDy9T/S06Qfi3u3691xMt8HhJi35dVWBiQAUI4QBKjh/culv6gYJBByZ9/qnCjk9gPp6T9d/guJ77umuQtTzo0eFdct850f/vH8d2S+DwiF/n9OOjrPTlBZCwAIQQgCEKTent6RMt8XP35c+yRP4mcy33k93vnzfiUk7gYpOHoIhBzj3gGoRggCEBTJQxH0mUkzD0t834CWpK1sZeoSMCSMewegHCEIUOTCRx/drLqGUDBN86sy37ckbWWrzPcNxqSJE34v833ctYJwx5Q4AKoRggBFZB8js0pP78UYWe+S3X8zWLd+f7LMYCb7PiYgaF/9ylf+1v/XpmlqThkOAyA8EYIAhI3x48a2qa7hasZPiH9DSOwLOvf22zSWI6zExd38zhW/5b18yTIAKEEIAhA2vjt2zFuqa7ga2YMaPv2fT2+U+T7ACiouWQaAPoQgQBG+ARi6b3zjG7YdQKDg4lQgrDHpEIBKhCAAAaNB/+80TfvbwF8FoD/+DgGgCiEIUEO/+V9Gvqu6CABQyPuH107/SHURACITIQhQIDZmeO+m7TXbVdcRrLkLU86prsEuenovjlBdAxBuOBYMQBVCECCfnrNuTaHqIsKRnaeimaapqa4BCDf88ACAKoQgQC79ntlJvmlJ936supBwdNGm3zDJvu8kJjbmvMz3AVbhviAAqhCCAIlGj4rrLnxy6y7VdYSSpmmmrHede6fre7LeNRRn3+qcKCReYjripps+lPUuwGLey39+AEAqQhAgiaZp+9fnb1ivuo5Qi40ZfkHWu3p6L8bIetdQtLzaOkPi66RdygrI8G7Xu+NU1xAJPvnE/03VNQB2QggC5NCX/nhRtexLNWX46le+InU0dHVF2UyZ7xuMjs6zUnuVGEgBJ/nwj+e/o7qGSOC/dMmlugbATghBgPX0+PHj2jPWbDyuuhArxMXd/I7E13mPHm1YKPF9A5IdylxRUba9MBa4lg8++PC71/pvDEcAoAIhCLCYpmlmzV5fvuo6rPLdsWPekvm+nt6LMXa6YPHgwcMPCon9QNHRrj/LehcQKn/73//96rX+G5MVAahACAKspa9Ykb5ZdRFWGj8h/g0ht0/F+581teskvu+athTnL5B9xGT8uLFtMt8HyGCnH2wAiAyEIMA6+tQpk1uWpK1sVV2IlSZ5Ej+TOSFOiM93g7YU5y+Q+c6r0Y+8tFhI3AUSQuiyd94ACbx2vgPMCQiZwJcRggCLuKKi/JW1e0pV1yHDd0aP6pL8Sq9+5KXFKu8XWTp/9hYVx3icHqoRmT79n09vVF1DBJD5AxvA9ghBgDX0rOzMEtVFyJJwm+eE7HeaprmotHhTuez3CiFEdtrSvPfe/8AtJH9TERszvFfm+4BQGWg8c+fZtyfJqgUAhCAEAVbQ75x2+7FIGmPs+dEPTwoF99f4L11yLbg7cYfMd1ZXlM187fTrCULBT1Un3zrpd7LfCYTCQL1zpmlec3ACgveH107/SHUNgN0QgoAQc0VF+Tdtr9muug6ZJnkSP1O0S+Ht6b0YIysIbchKz6qtq88Wao6V6In/NuMlBe8FLGfXi5ABOBchCAgtPa9gQ67qIlSYNu32BkWv9vb0XoyZkTB5n5XNv+lLkkteaT41Syg6V++KivJPS7r3YxXvBhDe/vrXv35ddQ2A3RCCgNDR75md5IvUb1TvSpr1a6HgSNxlXtM0FxUXl5VvyErPCuWDqyvKZs5ImLyvo/PsBKGwsfhHP0yQ3ncFhMJgfzjBBDPrfPjH899RXQNgN/+sugDAKWJjhvcWPrl1l+o6VJnkSfwsfvy49o7OsyonEHlfaT4lZiRMnnZX4vSj3vuS90zyJH4WyIOqK8pmHjx4+MHLvQyqpyrp3vuS9yiuAQjGQH+GvEKIiNxFB6AGIQgIDT1n3ZpC1UWolnxf8u6O4jKlOybi810h8dLLjYteerkxOX78uPaE2zwnPD/64cmBAtHe2qc9b/zhdU/L709Puzz+WnX4EUIIMXXK5JZAwxwQLs69/faEuUJEzEAZmS5PswTQDyEICF5EH4Prb+7ClHP/WVPb29N7UXUpfbwdnWe9HZ1n82rr6nUhhBg9Kq77yi/65BP/N/tNr7JF8OlHnz1n9vOqiwACNdjJZNwVBEAmQhAQpEg/BnelOXPuPlBbVx8j7BcmvEII8d77H6iuY0hGj4rrjqRx6wBCS+Wl0oCdMRgBCA7H4K6QsWbjcVdUlF91HQ6h/+SBpc+oLgIIxmAnk33wwYfftbqWSPSXS3+xQ18jYDuEICBwHIO7hqzszBKhblKcY7ALBCcY7GSyv/3v/3JhqgXOvf32BNU1AP9/e/cfVdV5J/r/mVl3ufa6acs533W/KsapepqaeHEwXlOwTWKgoyax43Ew8Ucdg0JFKwERDRf5pVXgYL5EQTBYxQt64liVxKPbGgVsIbLTRiY2EqXYDvVHxojprNvg3M7cs/pPv38oFhN/cOCc59k/3q+/Jj885+nDmrjf7v18thkRQcAguaKienkM7t6+Ny/5t/c6e4OQ6LkF63JVLwKAtXHWCrg3IggYHP323Q7cx+0LeO4GDY4+64WZASbCwQ6YTKZW18XfTFK9BsCMiCAgdPpzzz7dzGNKDzYpLuFPs16YGRCEUMi4ywgn6rnx2SjVa7CjYDDIY4bAPRBBQIhcUVG9m7fv3q56HVZQ9Pq2PdEjR9xQvQ6L4S4jbCOUyWS3382FMOu58dlI1WsAzIgIAkLDBWqINhT/KFPTtEOq12ER+qwXZga4ywi7YDKZWozHBu6PCAIGTo+Z8MQFLlBDMyku4U+Lvj+/VvBY3MPo48aOucRjcLATJpOp9em1T8cKIhS4JyIIGCBN04K7DwQKVK/DitJW55167tmnmwUhdF+uqKje/UdPZqteBxBOTCZT619+89v/rnoNgFkRQcDA6LfvZmCQNm/fvT1mwhMXBCH0JZqmHcovXJejeh1AuPECVLXYf+D+iCBgAMaNHXMpbXXeKdXrsLrdBwIFtwclEEJ/oW8q3pDJS3dhR7wAVa0/fP75f1O9BsCsiCBgABgxGj6HG1tXEEJ36KkpydUEEOyKsddqMRkOuD8iCBiAnhufjZz7fMJO1euwC0JICHE7gLjDCDtj7LU6xxv841WvATAzIggYGC8hFF5ODiFN0w4VFublEECwMy7C1bo9mY/JcMB9EEHAwHl7bnw2MjN1Ub7qhdjF4cbWFU9NmXxGOCeEdE3TDm0q3pDJqHXYHRfhal26dPkJ1WsAzIwIAkLj/fDsR/GEUPhU1+33zZ83d6+wfwjp0SNH3Gg589ECzgDBCbgIV+vTT6+PUb0GwMyIICB0hFCYZReWHi4szMvRNO2QsGcM6c89+3Tz4cbWFaoXAsjCRbhaDEUAHowIAgaHEAqz781L/m3LmY8W2OxdQrorKspfWJiXs3n77u2qFwPIxEW4OpzHAh6OCAIGjxCKgN0HAgVZWRmlrqgov7B2DOnPPft084nTHyzh/A+chotwtTiPBTwcEQQMDSEUAQtTX20/cfqDJbNemBkQ1gshfdzYMZX/X3lZGnd/4FS/+vDsdwQX4cp0Xvj1FNVrAMyOCAKGjhCKkKLXt+35ce2OeU9NmVwgzB9Ddx5923/0ZDbDD+BkXRd/MynUX3N7ZD7C4HeXrzymeg2A2f0X1QsAbML74dmPRGbqovzquv0+1Yuxk0lxCX+qjkvwdbS3Dtv9412vXejsmnT7BYxm+VNmfdzYMZf+cfGiHTz2Btxy+cpVT6i/RtO0/4zEWpymo711GC+pBR6OCALCx/vh2Y9ERUnB3OzC0sOqF2M3fTEkhBC1lWXTT5xovHH74LWKGNI1TQvGf2tK2/eTF++aFJfwJwVrAEzpQN2bcarX4GTtv/jlNGGePyQCTIsIAsLLe6jhsPjKV77y72mr806pXoxdpa3OO5W2Ou9UR3vrsJ83Nf99W9v7z/ebRBWp3/x1V1RU72OPeX7z9DNPn1qY+mp7hL4HsLRzv/ooTnARrszHH58nQoEBIIKA8PPW1fuFELcu1hWvxdYmxSX8aVJcwuFsIQ4LcetPoM/96qPmT/712jf6PY4zmIsxXYhbZxQefXTUVY9n3MWn4r5lcM4HeLjf/kv33w7m1339b0b/LtxrcaLu7kuPq14DYAVEEBAZhJACC1NfbV+YKu7coelobx127eonY69/+unXb/TcGN33969e/eSb//l//+9/FeLWhdcjjzzyRyGE+MpXv/Lv4x9//MLXor7WS/AAoetobx022PcD9f3/IQavo711WO/Nmy7V6wCsgAgCIocQUuzWnSLxWyEEAwsACX7e1Pz3gkfhlGH/gYEjgoDIIoQAOMZQ3k8zMnrktXCuxYl4PxAwcEQQEHmEEABH6Oy6OHGwv3bUo49+Es61OBHvBwIGjggC5CCEANhabWXZ9CH8crO/DNn0jjf4x/N+IGDgiCBAHm9dvV989Wtf+3fGKwOwmzMftCeKIZxH4WXDQ9P23umZgvNAwID9teoFAA7j3blz99q2piPDVS8EAMJpKI/CYegGO5occCoiCJAsGAzOX1+0sZoQAmAXQ3wUTkSPHHEjXGtxoqGMJgeciggCFCCEANjJUB+F0zTtP8O4HMdhNDYQOiIIUIQQAmAHHe2tw4b6KNzX/2b078K1Hidqa3v/edVrAKyGCAIUIoQAWF047kI88sgjfwzTchyJR+GA0BFBgGKEEAAra2r62ZyhfsY3Hx//63CsxYmGeh4LcCoiCDABQgiAFR1v8I/vvXnTNcSP0b/61a/2hmVBDjTU81iAUxFBgEkQQgCs5uSJky+LMFyA846gwWM0OTA4RBBgIsFgcL6vZHO56nUAwEB8ePaj+KF+hisqirtAg1RRUjBX9RoAqyKCAJPpvXnTNff5hJ2q1wEAD1Kcm7U0HJ/jdrv+EI7PcaLbU+F4FA4YBCIIMB9vz43PRhJCAMzsF788E5azKBOeeLwjDMtxHF6QCgwNEQSYEyEEwLRqK8umh2EgghBCiJHRI6+F43OcRn8nsEhwFwgYNCIIMC9CCIAptbS89z0RngtwfdSjj34Shs9xnNt34gAMEhEEmBshBMBUjjf4x1++ctUTrs9jMlzowjSaHHA0IggwP0IIgGmEayy2EEJEjxxxIxyf4zTh/BkATkUEAdZACAFQrqO9dVg4xmL3efTRUVfD9VlOEs6fAeBURBBgHd6eG5+NXDTnhQrVCwHgTLt/vOs1EcY7EB7PuIvh+iyn4N1AQHgQQYC1eC9fuerJTF2Ur3ohAJwl3HeBhBD6+McfvxDGz3OEpqafzRE8CgcMGREEWI/3w7MfxRNCAGQK910gIRiKECoGIgDhQwQB1kQIAZAmAneBxLixYy6F8/OcIPBOYIngLhAQFkQQYF2EEAApInEX6Ot/M/p34fw8u+tobx3W2XVxoup1AHZBBAHWRggBiKhI3AUSQogn/8fk9nB/pp39xL9vueAuEBA2RBBgfYQQgIip3rptgwj/xbc+YWLMuTB/pq2d+eezz6peA2AnRBBgD4QQgLA73uAfH4lHsFxRUb2T4hL+FO7PtauKkoK5wWBQU70OwE6IIMA+CCEAYfVP+/avFBF4BOuxxzy/Cfdn2hljsYHwI4IAe/F+ePaj+NrKsumqFwLA2g7UvRl3+cpVTyQ+Ozb2bzkPNEC1lWXTGYsNhN9/Ub0AAGHnrav3CyGESFudd0rxWgBY1N49b70qInP3QY/7zrdPR+Bzbenw4aOvCO4CAWFHBAH2RAgBGLTi3Kylkbr7ED1yxA3OAw0Md4GAyCGCAPsihACErKO9ddjPW0+/KCJ092H8Nx87H4nPtaMTJxrnCe4CARFBBAH2RggBCEn11m0bgsHg/Ah9vM77gQbmeIN/fM+Nz0aqXgdgV0QQYH+EEIABidRI7P4Wpr5KBA1ApCbzAbiFCAKcgRAC8FDbq2sKRAQvvGMmPHEhUp9tJ7WVZdMjNZkPwC1EEOAchBCA+4rkMIQ+8VPjWiL5+XbBRDgg8nhPEOAs3rp6f+bxBv941QsBYB5tTUeGv3uyKUlE9sKb0dgDwEQ4QA4iCHAe7xtvVBS3NR0ZrnohAMyhYktlsYjwnQdGYw8Md4EAOYggwIGCweD89UUbqwkhAMW5WUtlTCF79tmnGyP9HVZXUVIwl7tAgBxEEOBQhBCAtqYjwyP5TqB+9KfivmVE+DssTz/27gLBXSBACiIIcDBCCHC2ii2VxRF8J9Adrqio3mdn/sPvI/09Vlacm7U0GAxqqtcBOAURBDgcIQQ4k6zH4IQQYlLsxH+W8T1W1dHeOkzCYAoA/RBBAEQwGNRaf9YyS/U6AMghaRpcH/37yYt3Sfgey6reum2DIIAAqXhPEOBs+rixYy794+JFO743L/m3qhcDQA5fyeZyIemim6lwD3a8wT++s+viRNXrAJyGCAKcSdc0Lbjo+/NreXEq4CyZqYvyZU4gYyrcg22vrikQ3AUCpCOCAOfRZ70wM1D0+rY9qhcCQK4DdW/GfXj2o3gh76Jb/+7MGT+V9F2WU5ybtZSR2IAaRBDgHPq4sWMu5Rasy+XRFMB5Otpbh+3cuXutkHjXYdzYMZf47829dbS3DpM0nhzAPRBBgP3prqio3ozM9FLO/QDOtbHoR9UyxmH3oycmPndc4vdZyuulm1+X/PMA0A8RBNiXrmla8LsJ007w6BvgbJmpi/JljcPuo2lakDOH91ZbWTb98pWrHtXrAJyMCALsSX9qyuQz1XX7faoXAkCt2sqy6ZLPAQkhhJgYM6FD5vdZyf6fHEoTPAYHKEUEAfbCyGsAd7Q1HRmu6IJbn79w/m7J32kJyxYmlQaDQU31OgCnI4IAe2DkNYAv8ZVsLldx7mTc2DGXnp35D7+X/b1md6Duzbjb7wTiLhCgGBEEWB8jrwF8yaI5L1QoGr/MQIT7kD2dD8D9EUGAdTHyGsA9ZaYuyr998F76BbcrKqqXO9JfxmNwgLkQQYD1MPIawH2pGoRwm/6db8e3KPheU6utLJvOY3CAuRBBgHUw8hrAAx1v8I+vq/dnCkUX25qmBfnv09062luHMQ0OMB8iCLAGRl4DeKC2piPD33ijoliou9jWv5sw7YSi7zYtBS+pBTAARBBgboy8BjAgqibB9eEu0JcV52Ytlf2SWgADQwQB5sTIawADNvf5hJ2KJsH14S7QFxxv8I9/92RTkuAxOMCUiCDAfBh5DWDAFs15oeL23QZlF9vcBfoyxY8mAngIIggwD0ZeAwiJylHY/XAX6AsWzXmhgnHYgLkRQYB6jLwGELLM1EX5Ckdh38FdoLuty1iWYYIwBfAQRBCgDiOvAQxKRUnBXDMEkOAu0F0O1L0Z917b+zOE+p8LgIcgggA1GHkNYFBqK8umH2o4vESY4ELbFRXVyx/i3NLWdGT4zp271woT/FwAPBwRBMjFyGsAg1ZbWTZd5ctQv0CfO3fOW6oXYRYVWyqLeR8QYB1EECAHI68BDInJAkhEjxxxg/+e3dJvQh8AiyCCgMjTn3v26ebN23dvV70QANZktgASQug/WJa6RfUizMAkE/oAhIgIAiKHkdcAhsyMAfTUlMlneKT31s/GJAMqAISICALCT3dFRfUuWfrKmwtTX21XvRgA1mXCABKapgUZ6iLE8Qb/eLP9bAAMHBEEhJGmaYcYeQ0gHMwYQEII3Tt71kHVi1CtrenI8DfeqCgW5vrZAAgBEQSEhx4z4YkLmWuyNvLoG4ChMmkAiXFjx1zKLiw9rHodqq0v2ljNJDjA2oggYGj06JEjbvxgWeoWno8HEA5mDSAhhL7y1R+WqV6EanOfT9gZDAY11esAMDREEDA4uqZpQe/sWQf5U1EA4bIuY1nGe23vzxAmDKBZL8wMPDvzH36veiEqzX0+YeftUdhm+/kACBERBIROf2rK5DMcDAYQTpmpi/LNOmkseuSIG04/67hsYVIpAQTYBxEEDByPvgGICDMHkBBCz167ukj1IlTKTF2U39l1caIw588HwCAQQcDA6LNemBlw+p+EAgg/kz9i5fjH4EweqAAGiQgCHkyPHjniRvba1UVOvggAEH4d7a3DNhb9qNrEAeT4x+AIIMC+iCDg/vTnnn26efP23dtVLwSAvbQ1HRlu9jHLmqYd2lD8o0zV61CFAALsjQgCvkzXNC342mvZRZz9ARBuB+rejNu5c/daMweQEEJf9P35tU597xkBBNgfEQTcTR83dsyl/UdPZqteCAD7qSgpmHuo4fASYe6La/2pKZPPpK3OO6V6ISoQQIAzEEHAXzD8AEDEWOXiOnrkiBtOfQWAVX5GAIaOCALErWffefwNQKSYfALcHZqmHXLqOGwCCHCWv1a9AEAxPXrkiF2V1RWvEEAAwq2t6cjwxPjJB60QQOL2OSAnTsIkgADn4U4QnEyPmfDEhd0HAgWqF9KntrJs+uHDR1/5zrfjW3gsD7C22sqy6XX1/kxhjQtrx54DsspdOgDhRQTBqUx1/ud4g3/89uqagt6bN11CCO+7J5tcH51L+DbvJwKsyWJ3FnSnngMigADnIoLgRHpqSnK1Gf7Es6O9ddjrpZtfv3zlqkfc/Zuwt+fGZ+J/5uSNnPWzFtPEGoAHs8ILUL9I07Tg4cbWFarXIVNb05HhFVsqi630cwIQXkQQHEXTtEObijdkhuPuSlvTkeFfc7l6B/sejeLcrKU/bz394kPeFeJ992ST4K4QYH4Wef/PXfr+m6h6HTJZ4UW1ACKPCIJjhCOAOtpbh/3Ev295x8cXviWEECdOf7Ak1M8YxJ9AclcIMLl1Gcsy3mt7f4aw1l0Fxw1CqK0sm77/J4fSCCAARBCcQI8eOeLGhuIfZQ72rk1tZdn0Eyca5/ULF72wMC8n1M8Z4osSuSsEmIwVH3+7TZ/1wsyAGR4LlsUiL6oFIAkRBLvTo0eOuDGY592PN/jHnzxx8uXbh5uF+MtvnHrMhCcuhDpSe9GcFyrucfYnVNwVAkzCwncV9KemTD7jpP9+WGxQBQAJiCDY2aAC6B53fe6iaVowlLHaxxv84994o6I4GAxq9/q8QeKuEKDQsoVJpZ1dFycK611UO24SHBPgANwLEQS7CjmA+g0qeFCs6N7Zsw4O9DMj/PgFd4UAyb44zl71ekI06DvjVtRvAEI4/wAKgE0QQbCjAf9G39HeOkx/J7BoAPEjhBAieuSIG9mFpYcHsgiJj1943z3ZJH7xy6mJGZnppaE+pgdgYCw6/OAOJ43CttiLagEoQATBbgYcQMW5WUvfPdmUJAb+m6T+g2WpWwbyLyp4/MLbe/OmKCkpc7W9d7p58/bd2yV9L2B7bU1HhvtKNpdb9O6PEMJZo7A5/wNgIIgg2MmAAmiAj719yUCGIZjg8Qvve23vi8T4yc+uWLFsy8LUV9sVrAGwDavf/REivO9HMzNegAogFEQQbONhAdRvktNgAkXPXJO18UH/golelOgNBoNi27bt2qmmUxcy12RtHOxocMCpLH725w6nBJCFJ/UBUIQIgi1omnZoQ/GP7vmox/EG//j/tbtu7VD+dPCpKZPPPCgkTPr8ubez66J3dWb2Y97Zsw4O9CwT4HR2uPtzm75ixbItdg8gHn8DMBhEECyv70867xUpYfrNUV/2w+Vv3O8fmjSA7ggGg/MPNRzW2tref/4Hy1K3MDgBuLd+d3PtME1MT01JrrbzI7F2OKsFQB0iCFanv/Za9pfekxPOi5kH3QWy0J9AentufCZKSspGMjgBuFtHe+uw10s3vx6GlxmbhZ6aklydtjrvlOqFRMogBtsAwF2IIFjlYOJMAAAgAElEQVSZnpqSXP3FOxthfonhfe8CWSiA+rszOGHR9+fX2vkiCRgIG15M2zqAOtpbh20s+lE1ww8ADBURBKvSn5oy+Uz/3+iPN/jHv/FGRXE4H2W5310giwZQH28wGBR19X6tpeW976189Ydldj8zAHzRgbo34/bueetVmz1KZesAqigpmKsfe3cBww8AhAMRBEuKHjniRnXdfl/fX0foIPM97wJZPID6816+clX8z5w8z3P6T3lEDo5gw0ff+tg2gGz8MwOgEBEEy9E0TfSfBBepF5PGTHjiwhfvAhXnZi21SQD1d+cROabIwc5sNPXtLpqmHXrttewiOw496fdeN+7+AAirv1a9ACBUK1YsE5PiEv7U1nRkeGL85IMRejZcT3opaW//v1FbWTbdZmcH+vPeniK35MVpU/ceb/CPV70gIFyKc7OWJsZPPmjXANpUvCHTbgHU1nRk+NznE3a+e7IpiQACEAncCYKlPPfs02L2P8wWtZVlf66r90fse1xRUb39LyrMPgY7jLy9N2+KkpIy1z/t238pt2BdLi9ahVXVVpZNP3z46Cs2O/dzh11fhGrXO3YAzIUIgmW4oqJEelamKF6/SbzX9n5Ev2vmzL872vd/tzUdGb7/J4fShLN+Q/ZevnJV/DBtpeepKZPP9D9/BZjd8Qb/+O3VNQV2jR8hhO6KiurNL1yXY6cAqq0sm77/J4fSbPKeJgAmRwTBMjIy00V52eviw7MfRfqr9O/OnPHTvr9YX7Sx2sGPY3g/PPuRSIyffPC7CdNOFL2+bY/qBQH3c7zBP/6f9u1fafMD9Hr0yBE3Dje2rlC9kHBpazoyfMebP86z+c8NgMkQQbCEp6ZMFidPnJQRQHcNRJj7fMLO238q6WTeYDAo3j3ZpP28dfKLvF8IZuOQ+BFCCH3c2DGX9h89ma16IeFio2mbACyGCIIlfPrpddFz4zMp3xU/Na5FiFvPpfNCvrvceb/Q4cNHX5k7d85bxBBUclD8CHH73Wh2eTS139Q3Hn0DoAQRBEuQFUBCCJG2Ou/Ugbo34ziYe1/e3ps3RV2930UMQYUDdW/G6UePfd8h8SOEEPqsF2YG7PA4qt2HVQCwDiII6Gfc2DHik3/p+PPOnbtVL8UK7sRQS8t73/vHxYt22G1ML8zFoRfQtngJ6vEG//j/tbtuLXfXAZgFEQT0861vTRHrXssVwWBQ9VKsxHv5ylVRUlLm+ad9+y8lJj533OoXbDCX4tyspb/45ZlEp8WPpmlBq4/AdtgjiwAshAgC+vnj//mjuHzlquplWJX38pWr4nK938NjchiqjvbWYbt/vOu1C51dkxx4bsTyE+CIHwBmRwQB/fzil2dUL8EOODOEQTtQ92bcqaZTczq7Lk4Uzrx4tvQABOIHgFUQQUA/vTdvql6CndyJof0/OZTGe4bwIBUlBXObmn42x2GPvH2RPn/e3L3ZhaWHVS8kVMQPAKshggBE2l3vGZoYM6Fj2Q+Xv9H3LiY41/EG//iTJ06+fPs9MUI49+JZ1zQt+Npr2UVWGy7iwEl9AGyCCAIgizcYDIoPz340/8O0lfExE564kPRS0l6rXfRhaDraW4fp7wQWOXDQwf1Y8vyPQyf1AbARIgiACt7OrovezpKyidura3pnzvy7o1Z8BAgDV1tZNr2l5b3vccfgLvpzzz7dvHn77u2qFzJQvOQUgF0QQQBU8vbevCkONRx26cfeXTAxZkLH/IXzd1t5JDD+oraybPqZD9oTbw85EIKL5js0TTu0YsWyLQtTX21XvZaHaWs6MvzQgUPLeGwRgJ0QQQDM4C+Pyp39KN5Vspm7QxZF+DyUHj1yxI0NxT/KNPu5uNrKsuknTjTO4wWnAOyICAJgNnfuDh1qOLwkZsITF+KnxrUwZtucOtpbh7X/4pfTCJ8B0We9MDNg5imJHe2tw37i37f8zD+ffZZH3gDYGREEwKy8QgjR2XXR29l1ceL+nxxKmxgzoePpZ54+ZYVHiOysrenI8Naftcz66FzHt7lLMCC6KyqqNyMzvdSsg0C46wPAaYggAFZw1+NyO3fuDhJE8vS/2/O7y1ce4w5BSPSYCU9c2H0gUKB6IV90oO7NuPeN96df6OyaxM8UgNMQQQCs5ktB9I1xY7t5ZC582pqODL/4667Yjz8+H9fdfelxxiAPiq5pWtBsww/amo4MP67/dH7Hxxe+xc8VgJMRQQCszBsMBkVn10XR2XVxYl29PzN65Igbk5+c9MuEv0t8lylzA3O8wT/+Vx+e/c7Vq598kzs9YWGquz+EDwB8GREEwC68QgjRc+Mz0XOyafm7J5t0rWhj8BvjxnbHTPzvZ5+K+5ZBFN0Knt/+5jcTOy/8esqn13tG374oFoIL43Awzd0fwgcAHowIAmBX/e8SiUMNh3WtaGMweuSI6xOeeLzjfzw15RdmPaQeLn3Bc+nS5Sc+/fT6mNuH3oXggjgSlN/9Od7gH9/23umZhA8APBwRBMApvMFgUFy+clVcvnJVvHuySS8pKROuqKjeR0dFXxsz5uv/8s3Hx//60dGPXrHaHaO+2Pnj//nj17ou/mbS55/3/j/c4ZFG6d2f2sqy6R9/fD6O4QYAEBoiCIBTeYUQovfmTdF786bo7LooxMkmIYTQRU6eiB454oamaf854YnHO77y1a/8+/jHH78ghBCy7x4db/CPF0KI659++vUbPTdG/8d//MdXPvnXa98IBoP/td+dnTv/eyCV/tyzTzdv3r57u6wvvMd4ciH42QNAyIggALjbnbNFQghx+crV/v9MLykpE0II4YqK6nW7XX/o+wdf/5vRv3vkkUf+GOqX/f7f/m3U//7ff/h/+/76HnFzZ00wDT165IgbP1iWuiXSUdzR3jrs503Nf9954ddTGFoBAOFDBAHAwN25+Oy7g9TnC7EEm9I07dB3E6adKHp9255IfD7jyQFADiIIAICH05+aMvnMsh8uf2NSXMKfwvWh/af1cacHAOQhggAAuL+wPfrWd5fnd92/e+KTf732jctXrnpu/yOiBwAkI4IAAPgyXdO04KLvz69NW513KtRfTPAAgLkRQQAA3G3AU9862luHXbv6ydhffXj2O7//t38bxfuYAMAaiCAAAG4bN3aMWPnqD9O++K6o4w3+8X1jyq9e/eSbf/j88/9G7ACAdRFBCn19nOe3bpf7p5/3fu4SQjyjej0A4GSzXpgphBCi9Wcts3a8+eNJQgjR7zE2IYgdAOFnxMRMPCuOvKt6HY7zV6oX4GR//vOfhRBC+ApzM44d0xcIQggAAMAJDI/H052csqzieW/Sx3/1V1ySy8aOK9QXQUII0XW+Q9taVlx+obPzSUEMAQAA2JHhdrl75y1YWJuSvkrv+5tEkHzsuEL9I6hPox6I3VVTXXC9p2eUIIYAAADswpg923swv+T1Lw1dIYLkY8cVulcE9amvqfL699Zn3n5xHjEEAABgTcbEmJhza/KKcib87aTgvf4FIkg+dlyhB0VQn/ys9PyW1pYXBSEEAABgJcao6Ojry9MzS5/3Jn38oH+RCJKPHVdoIBEkxK3zQiXr83dcunTpMUEMAQAAmJmhaVowKemlt1atK/QP5BcQQfKx4woNNIL6NOqB2G1byksZqQ0AAGBKRmJC4gnfthpfKL+ICJKPHVco1AjqU7W5JDkQeOcVzgsBAACYguHxeLoLN/lW3u/cz4MQQfKx4woNNoL6rE5bUnamvf0ZQQgBAACoYLhd7t6stTkFDzv38yBEkHzsuEJDjSAhhPjgdOvo6oryYs4LAQAASGNomhacMWPm0XuNvA4VESQfO65QOCKoz9v79kyrq92Vw3khAACAiDLi4+KMytq9eeH6QCJIPnZcoXBGUB9fYW5Gc3PTnGAwOD3sHw4AAOBchsfj6c7MzimaOi3hWjg/mAiSjx1XKBIRJMStkdo7q7Zu4LwQAADAkBlul7s3NW15+cuLl56OxBcQQfKx4wpFKoL6NOqBWH/97mzOCwEAAIRO07RT4Tr38yBEkHzsuEKRjqA+9TVVXv/e+kxGagMAAAyIER8XZ6xYtWbjYEZeh4oIko8dV0hWBPXxFeZmHDumLxCEEAAAwL0Yo6Kjry9PzywdysjrUBFB8rHjCsmOICFunRfaWlZcfqGz80lBDAEAAAhxe+R18pKU6pT0VbrsLyeC5GPHFVIRQX0a9UDsrprqgus9PaMEMQQAAJzLmD3bezDS534ehAiSjx1XSGUE9anaXJIcCLzzCueFAACAwxgTY2LOrckrypFx7udBiCD52HGFzBBBffKz0vNbWlteFIQQAACwN8Ptcvdmrc0pkHnu50GIIPnYcYXMFEFC3DovVLI+fwcjtQEAgA0ZmqYFk5JeemvVukK/6sX0RwTJx44rZLYI6tOoB2K3bSkv/bz3c5cghgAAgPUZiQmJJ3zbanyqF3IvRJB87LhCZo2gPr7C3Izm5qY5nBcCAAAWZXg8nu7CTb6Vqs/9PAgRJB87rpDZI6jP6rQlZWfa258RhBAAALAGw+1y96amLS9/efHS06oX8zBEkHzsuEJWiSAhhPjgdOvo6oryYs4LAQAAEzM0TQvOmDHzqMqR16EiguRjxxWyUgT1qa+p8jYcPJDGeSEAAGAyRnxcnFFZuzdP9UJCRQTJx44rZMUI6tPvvNB01WsBAACOZng8nu7klGUVZhl5HSoiSD52XCErR5AQt0Zq76zauoHzQgAAQAHD7XL3zluwsDYlfZWuejFDQQTJx44rZPUI6tOoB2J31VQXXO/pGSWIIQAAEGGapp2y2rmfByGC5GPHFbJLBPWpr6ny+vfWZzJSGwAARIgxMSbm3Jq8ohwzj7wOFREkHzuukN0iqI+vMDfj2DF9gSCEAABAeBijoqOvL0/PLLXquZ8HIYLkY8cVsmsECXHrvNDWsuLyC52dTwpiCAAADI6haVoweUlKtdXP/TwIESQfO66QnSOoT6MeiN22pbyUkdoAACBExuzZ3oN2OffzIESQfOy4Qk6IoD5Vm0uSA4F3XuG8EAAAeAjD4/F0F27yrbTTuZ8HIYLkY8cVclIE9cnPSs9vaW15URBCAADgbobb5e7NWptTYMdzPw9CBMnHjivkxAgS4tZ5oZL1+TsuXbr0mCCGAABwOkPTtGBS0ktvrVpX6Fe9GBWIIPnYcYWcGkF93t63Z1pd7a4czgsBAOBYRmJC4gnfthqf6oWoRATJx44r5PQI6uMrzM1obm6aw3khAAAcw/B4PN2Z2TlFU6clXFO9GNWIIPnYcYWIoLutTltSdqa9/RlBCAEAYFeG2+XuTU1bXv7y4qWnVS/GLIgg+dhxhYigL2vUA7H++t3ZnBcCAMBeNE07NWPGzKNOGHkdKiJIPnZcISLo/uprqrwNBw+kcV4IAADLM+Lj4owVq9ZsdMrI61ARQfKx4woRQQ/X77zQdNVrAQAAITE8Hk93csqyCqeNvA4VESQfO64QETQwXec7tK1lxeUXOjufFNwVAgDA7Ay3y907b8HC2pT0VbrqxVgBESQfO64QERSaRj0Qu6umuuB6T88oQQwBAGBGxuzZ3oOc+wkNESQfO64QETQ49TVVXv/e+kxGagMAYBrGxJiYc2vyinI49xM6Ikg+dlwhImhofIW5GceO6QsEIQQAgCrGqOjo68vTM0s59zN4RJB87LhCRNDQdZ3v0ErW5+9gpDYAAFIZmqYFk5ekVHPuZ+iIIPnYcYWIoPBp1AOx27aUlzJSGwCAiDMSExJP+LbV+FQvxC6IIPnYcYWIoPCr2lySHAi88wrnhQAACDvD4/F0F27yreTcT3gRQfKx4woRQZGzOm1J2Zn29mcEIQQAwFAZbpe7N2ttTgHnfiKDCJKPHVeICIqsD063jq6uKC/mvBAAAINiaJoWnDFj5lFGXkcWESQfO64QESTH2/v2TKur3ZXDeSEAAAbMiI+LMypr9+apXogTEEHyseMKEUFy+QpzM5qbm+YEg8HpqtcCAIBJGR6PpzszO6do6rSEa6oX4xREkHzsuEJEkHxd5zu0nVVbN3BeCACAuxhul7s3NW15+cuLl55WvRinIYLkY8cVIoLUadQDsf763dmcFwIAOJ2maac496MWESQfO64QEaRefU2Vt+HggTTOCwEAHMiIj4szVqxas5GR12oRQfKx4woRQebhK8zNOHZMXyAIIQCA/Rkej6c7OWVZBSOvzYEIko8dV4gIMpeu8x3a1rLi8gudnU8KYggAYD+GpmnB5CUp1Snpq3TVi8FfEEHyseMKEUHm1KgHYnfVVBdc7+kZJYghAIA9GLNnew9y7seciCD52HGFiCBzq6+p8vr31mcGg0FNEEMAAGsyJsbEnFuTV5TDuR/zIoLkY8cVIoKsIT8rPb+lteVFQQgBAKzDcLvcvVlrcwo492N+RJB87LhCRJB1dJ3v0ErW5+9gpDYAwOQMTdOCSUkvvbVqXaFf9WIwMESQfOy4QkSQ9TTqgdhtW8pLGakNADAhIzEh8YRvW41P9UIQGiJIPnZcISLIunyFuRnNzU1zOC8EADABw+PxdBdu8q3k3I81EUHyseMKEUHWtzptSdmZ9vZnBCEEAJDPcLvcvalpy8tfXrz0tOrFYPCIIPnYcYWIIHv44HTr6OqK8mLOCwEAJDE0TQvOmDHzKCOv7YEIko8dV4gIspe39+2ZVle7K4fzQgCACDLi4+KMytq9eaoXgvAhguRjxxUiguyp33mh6arXAgCwDcPj8XRnZucUTZ2WcE31YhBeRJB87LhCRJB9dZ3v0HZWbd3AeSEAwBAZbpe7d96ChbUp6at01YtBZBBB8rHjChFB9teoB2L99buzOS8EAAiVpmmnOPfjDESQfOy4QkSQc9TXVHn9e+szGakNABgAY2JMzLk1eUU5jLx2BiJIPnZcISLIeXyFuRnHjukLBCEEAPgyY1R09PXl6Zmlz3uTPla9GMhDBMnHjitEBDlT1/kObWtZcfmFzs4nBTEEALg98jp5SUo1536ciQiSjx1XiAhytkY9ELttS3kpI7UBwNGM2bO9Bzn342xEkHzsuEJEEIQQompzSXIg8M4rnBcCAEcxPB5Pd+Em30rO/YAIko8dV4gIQn/5Wen5La0tLwpCCADszHC73L1Za3MKOPeDPkSQfOy4QkQQvqjrfIdWsj5/ByO1AcB2DE3TgklJL721al2hX/ViYC5EkHzsuEJEEO7n7X17ptXV7srhvBAA2IKRmJB4wretxqd6ITAnIkg+dlwhIggP4yvMzWhubprDeSEAsCTD4/F0Z2bnFE2dlnBN9WJgXkSQfOy4QkQQBmp12pKyM+3tzwhCCACswHC73L2pacvLX1689LTqxcD8iCD52HGFiCCE4oPTraOrK8qLOS8EAOaladqpGTNmHmXkNUJBBMnHjitEBGEw6muqvA0HD6RxXggATMWIj4szVqxas5GR1wgVESQfO64QEYSh6HdeaLrqtQCAgxkej6c7OWVZBSOvMVhEkHzsuEJEEIaq63yHtrNq6wbOCwGAdIbb5e6dt2BhbUr6Kl31YmBtRJB87LhCRBDCpVEPxO6qqS643tMzShBDABBpxuzZ3oOc+0G4EEHyseMKEUEIt/qaKq9/b30mI7UBICKMiTEx59bkFeVw7gfhRATJx44rRAQhUnyFuRnHjukLBCEEAOFgjIqOvr48PbOUcz+IBCJIPnZcISIIkdR1vkMrWZ+/g5HaADBohqZpweQlKdWc+0EkEUHyseMKEUGQoVEPxG7bUl7KSG0ACImRmJB4wretxqd6IbA/Ikg+dlwhIggyVW0uSQ4E3nmF80IA8ECGx+PpLtzkW8m5H8hCBMnHjitEBEGF/Kz0/JbWlhcFIQQA/Rlul7s3a21OAed+IBsRJB87rhARBFU+ON06urqivJjzQgBw69zPjBkzjzLyGqoQQfKx4woRQVDt7X17ptXV7srhvBAAhzLi4+KMytq9eaoXAmcjguRjxxUigmAWvsLcjObmpjmcFwLgEIbH4+nOzM4pmjot4ZrqxQBEkHzsuEJEEMxmddqSsjPt7c8IQgiAPRlul7s3NW15+cuLl55WvRigDxEkHzuuEBEEM2rUA7H++t3ZnBcCYCeapp3i3A/MigiSjx1XiAiCmdXXVHkbDh5I47wQAIsz4uPijBWr1mxk5DXMigiSjx1XiAiCFfgKczOOHdMXCEIIgLUYHo+nOzllWQUjr2F2RJB87LhCRBCsout8h7a1rLj8Qmfnk4IYAmBuhqZpweQlKdUp6at01YsBBoIIko8dV4gIgtU06oHYXTXVBdd7ekYJYgiA+RizZ3sPcu4HVkMEyceOK0QEwarqa6q8/r31mYzUBmASxsSYmHNr8opyOPcDKyKC5GPHFSKCYHX5Wen5La0tLwpCCIAahtvl7s1am1PAuR9YGREkHzuuEBEEO+g636GVrM/fwUhtABIZmqYFk5JeemvVukK/6sUAQ0UEyceOK0QEwU4a9UDsti3lpYzUBhBhRmJC4gnfthqf6oUA4UIEyceOK0QEwY6qNpckBwLvvMJ5IQBhZng8nu7CTb6VnPuB3RBB8rHjChFBsLPVaUvKzrS3PyMIIQBDY7hd7t7UtOXlLy9eelr1YoBIIILkY8cVIoJgdx+cbh1dXVFezHkhAINgaJoWnDFj5lFGXsPuiCD52HGFiCA4xdv79kyrq92Vw3khAANkxMfFGZW1e/NULwSQgQiSjx1XiAiC0/gKczOam5vmBIPB6arXAsCUDI/H052ZnVM0dVrCNdWLAWQhguRjxxUiguBEXec7tJ1VWzdwXghAP4bb5e6dt2BhbUr6Kl31YgDZiCD52HGFiCA4WaMeiPXX787mvBDgbJqmneLcD5yOCJKPHVeICAKEqK+p8vr31mcyUhtwHGNiTMy5NXlFOYy8htMRQfKx4woRQcBf+ApzM44d0xcIQgiwO2NUdPT15emZpc97kz5WvRjADIgg+dhxhYgg4G5d5zu0rWXF5Rc6O58UxBBgN4amacHkJSnVnPsB7kYEyceOK0QEAffWqAdid9VUF1zv6RkliCHADozZs70HOfcD3BsRJB87rhARBDxY1eaS5EDgnVc4LwRYluHxeLoLN/lWcu4HuD8iSD52XCEiCBiY/Kz0/JbWlhcFIQRYheF2uXuz1uYUcO4HeDgiSD52XCEiCBi4rvMdWsn6/B2M1AZMzdA0LZiU9NJbq9YV+lUvBrAKIkg+dlwhIggIXaMeiN22pbz0897PXYIYAszESExIPOHbVuNTvRDAaogg+dhxhYggYPB8hbkZzc1NczgvBChneDye7szsnKKp0xKuqV4MYEVEkHzsuEJEEDB0q9OWlJ1pb39GEEKAbIbb5e5NTVte/vLipadVLwawMiJIPnZcISIICI8PTreOrq4oL+a8ECCHpmmnZsyYeZSR10B4EEHyseMKEUFAeL29b8+0utpdOZwXAiLGiI+LM1asWrORkddA+BBB8rHjChFBQGT0Oy80XfVaAJswPB5Pd3LKsgpGXgPhRwTJx44rRAQBkdN1vkPbWbV1A+eFgCEx3C5377wFC2tT0lfpqhcD2BURJB87rhARBEReox6I3VVTXXC9p2eUIIaAUBizZ3sPcu4HiDwiSD52XCEiCJCnvqbK699bn8lIbeChjIkxMefW5BXlcO4HkIMIko8dV4gIAuTzFeZmHDumLxCEEPBFxqjo6OvL0zNLOfcDyEUEyceOK0QEAWp0ne/QtpYVl1/o7HxSEEOAoWlaMHlJSjXnfgA1iCD52HGFiCBArUY9ELttS3kpI7XhYEZiQuIJ37Yan+qFAE5GBMnHjitEBAHmULW5JDkQeOcVzgvBQQyPx9NduMm3knM/gHpEkHzsuEJEEGAu+Vnp+S2tLS8KQgj2Zbhd7t6stTkFnPsBzIMIko8dV4gIAsyn63yHVrI+f8elS5ceE8QQ7MPQNC04Y8bMo4y8BsyHCJKPHVeICALM6+19e6bV1e7K4bwQbMCIj4szKmv35qleCIB7I4LkY8cVIoIA8/MV5mY0NzfN4bwQLMjweDzdmdk5RVOnJVxTvRgA90cEyceOK0QEAdaxOm1J2Zn29mcEIQTzM9wud29q2vLylxcvPa16MQAejgiSjx1XiAgCrKVRD8T663dnc14IZqVp2inO/QDWQwTJx44rRAQB1lRfU+VtOHggjfNCMBEjPi7OWLFqzUZGXgPWQwTJx44rRAQB1tbvvNB01WuBYxkej6c7OWVZBSOvAesiguRjxxUiggDr6zrfoW0tKy6/0Nn5pOCuEOQxNE0LJi9JqU5JX6WrXgyAoSGC5GPHFSKCAPto1AOxu2qqC6739IwSxBAiy5g923uQcz+AfRBB8rHjChFBgP3U11R5/XvrMxmpjQgwJsbEnFuTV5TDuR/AXogg+dhxhYggwL58hbkZx47pCwQhhKEzRkVHX1+enlnKuR/Anogg+dhxhYggwN66zndoJevzdzBSG4NkaJoWTEp66a1V6wr9qhcDIHKIIPnYcYWIIMAZGvVA7LYt5aWM1EYIjMSExBO+bTU+1QsBEHlEkHzsuEJEEOAsVZtLkgOBd17hvBAewPB4PN2Fm3wrOfcDOAcRJB87rhARBDhTflZ6fktry4uCEMJfGG6Xuzc1bXn5y4uXnla9GAByEUHyseMKEUGAc31wunV0dUV5MeeFHM/QNC04Y8bMo4y8BpyLCJKPHVeICALw9r490+pqd+VwXsiRjPi4OKOydm+e6oUAUIsIko8dV4gIAtDHV5ib0dzcNCcYDE5XvRZEnOHxeLozs3OKpk5LuKZ6MQDUI4LkY8cVIoIA9Nd1vkPbWbV1w5n29mcEd4XsyHC73L3zFiysTUlfpateDADzIILkY8cVIoIA3EujHoj11+/O5ryQfWiadopzPwDuhwiSjx1XiAgC8CD1NVXehoMH0jgvZI//FHAAAAW8SURBVGlGfFycsWLVmo2MvAZwP0SQfOy4QkQQgIHwFeZmHDumLxCEkJUYo6Kjry9Pzyx93pv0serFADA3Ikg+dlwhIgjAQHWd79C2lhWXX+jsfFIQQ2ZmaJoWTF6SUs25HwADRQTJx44rRAQBCFWjHojdVVNdcL2nZ5QghszGmD3be5BzPwBCRQTJx44rRAQBGKz6miqvf299ZjAY1AQxpJrh8Xi6Czf5VnLuB8BgEEHyseMKEUEAhio/Kz2/pbXlRUEIqWC4Xe7erLU5BZz7ATAURJB87LhCRBCAcOg636GVrM/fwUhtaQxN04JJSS+9tWpdoV/1YgBYHxEkHzuuEBEEIJwa9UDsti3lpYzUjigjMSHxhG9bjU/1QgDYBxEkHzuuEBEEIBJ8hbkZzc1NczgvFFaGx+PpzszOKZo6LeGa6sUAsBciSD52XCEiCEAkrU5bUnamvf0ZQQgNheF2uXtT05aXv7x46WnViwFgT0SQfOy4QkQQgEj74HTr6OqK8mLOC4XM0DQtOGPGzKOMvAYQaUSQfOy4QkQQAFne3rdnWl3trhzOCw2IER8XZ1TW7s1TvRAAzkAEyceOK0QEAZCt33mh6arXYkKGx+PpTk5ZVsHIawAyEUHyseMKEUEAVOg636HtrNq6gfNCdxhul7t33oKFtSnpq3TViwHgPESQfOy4QkQQAJUa9UCsv353tsPPCxmzZ3sPcu4HgEpEkHzsuEJEEAAzqK+p8vr31mc6bKS2MTEm5tyavKKcCX87Kah6MQCcjQiSjx1XiAgCYCa+wtyMY8f0BcLeIWSMio6+vjw9s5RzPwDMggiSjx1XiAgCYDZd5zu0rWXF5Rc6O58U9oohQ9O0YPKSlGrO/QAwGyJIPnZcISIIgFk16oHYXTXVBdd7ekYJ68eQkZiQeMK3rcaneiEAcC9EkHzsuEJEEACzq9pckhwIvPOKRc8LGR6Pp7twk28l534AmBkRJB87rhARBMAq8rPS81taW14U1gghw+1y92atzSng3A8AKyCC5GPHFSKCAFhJ1/kOrWR9/g4Tj9Q2NE0LJiW99NaqdYV+1YsBgIEiguRjxxUiggBY0dv79kyrq92V83nv5y5hnhgy4uPijMravXmqFwIAoSKC5GPHFSKCAFiZrzA3o7m5aY7i80KGx+PpzszOKZo6LeGaojUAwJAQQfKx4woRQQDsYHXakrIz7e3PCLkhZLhd7t7UtOXlLy9eelri9wJA2BFB8rHjChFBAOzig9Oto6sryotlnBfSNO3UjBkzj+aXvL49kt8DALIQQfKx4woRQQDspr6myttw8EBahM4LGfFxccaKVWs2MvIagJ0QQfKx4woRQQDsqt95oelh+DjD4/F0J6csq2DkNQA7IoLkY8cVIoIA2FnX+Q5tZ9XWDUM4L2RomhZMXpJSnZK+Sg/3+gDALIgg+dhxhYggAE7QqAdid9VUF1zv6RklBh5DxuzZ3oOc+wHgBESQfOy4QkQQACepr6ny+vfWZz5kpLYxMSbm3Jq8ohzO/QBwCiJIPnZcISIIgBP5CnMzjh3TF4i7Q8gYFR19fXl6ZinnfgA4DREkHzuuEBEEwKm6zndoW8uKyy90dj6paVowKemlt1atK/SrXhcAqEAEyceOK0QEAXC6D063jp46LeGa6nUAgEpEEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgL39/3p1WzTboJ1DAAAAAElFTkSuQmCC',
                  width: 50,
                  height: 50,
                  alignment: 'center'
                },
        {
          text: 'New Fit', fontSize: 18,
          style: 'header',
          bold: true,
          margin: [ 1, 2, 5, 5 ],
          alignment: 'center'
        },

        {text: ' ' + obj.firstname + ' ' + obj.lastname, alignment: 'center'},
        {text: ' ' + obj.phonenumber,  alignment: 'center'},
        {text: ' ' + obj.email,  alignment: 'center'},
        {text: ' ' + obj.streetaddress + ' ' + obj.unitnumber, alignment: 'center'},
        {text: ' ' + obj.city + ' , ' + obj.state + ' ' + obj.zip,  alignment: 'center'},

        {
          style: 'tableExample',
          margin: [0, 10, 0, 0],
          table: {
            body:[
              ['Saddle Height', 'Saddle Height Over Bars', 'Saddle to Handlebar reach', 'Saddle Angle', 'Saddle Fore-aft', 'Saddle Brand/Width', 'Stem Length', 'Stem Angle', 'Handle Bar Width', 'Handle Bar Brand and Model'],
              ['' + $scope.saddleHeight, '' + $scope.saddleHeightOverBars, '' + $scope.saddleToHandlebarReach, '' + $scope.saddleAngle, '' + $scope.saddleForeAft, '' + $scope.saddleBrandAndWidth, '' + $scope.stemLength, '' + $scope.stemAngle, '' + $scope.handleBarWidth, '' + $scope.handleBarWidth],
            ]
          }
        },
        {
          style: 'tableExample',
          margin: [0, 10, 0, 0],
          alignment: 'center',
          table: {
            body:[
              ['Pedal Brand and Model', 'Shoe Brand/Model/Size', 'Brake Level Position', 'Crank Length', 'Standover', 'Stack'],
              ['' + $scope.pedalBrandAndModel, '' + $scope.shoeBrandModelSize, '' + $scope.brakeLevelPosition, '' + $scope.crankLength, '' + $scope.standover,  '' + $scope.stack],
            ]
          }
        },


      ]// end pdf content
    }; // end docDefinition
    pdfMake.createPdf(docDefinition).download('newFitForm.pdf');
  };// end downloadFormTwoPdf

}]);//end form2Controller
