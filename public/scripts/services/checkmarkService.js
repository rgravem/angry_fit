myApp.service('checkmarkService', function(){

  var existingFitSubmitted= function(){
    document.getElementById("checkmark1").innerHTML = '<md-icon class="material-icons md-22" style="color: #002f54;"> done </md-icon>';
    return;
  };
  var newFitSubmitted = function(){
    document.getElementById("checkmark2").innerHTML = '<md-icon class="material-icons md-22" style="color: #002f54;"> done </md-icon>';
    return;
  };
  var customFrameGeometrySubmitted = function(){
    document.getElementById("checkmark3").innerHTML = '<md-icon class="material-icons md-22" style="color: #002f54;"> done </md-icon>';
    return;
  };
  var customFrameDetailsSubmitted = function(){
    document.getElementById("checkmark4").innerHTML = '<md-icon class="material-icons md-22" style="color: #002f54;"> done </md-icon>';
    return;
  };
  return{
    newFitSubmitted: newFitSubmitted,
    existingFitSubmitted: existingFitSubmitted,
    customFrameGeometrySubmitted: customFrameGeometrySubmitted,
    customFrameDetailsSubmitted: customFrameDetailsSubmitted,
  };
});
