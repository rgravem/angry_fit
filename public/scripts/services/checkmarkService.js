myApp.service('checkmarkService', function(){
  var existingFitChecked= false;

  var existingFitSubmitted= function(){
    console.log(existingFitChecked);
    existingFitChecked= true;
    console.log(existingFitChecked);
    return existingFitChecked;
  };
  return{
    existingFitChecked: existingFitChecked,
    existingFitSubmitted: existingFitSubmitted
  };
});
