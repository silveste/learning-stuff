/*globals $:false*/
function hasColorSupport(){
  window.element = document.createElement("input");
  window.element.setAttribute("type", "color");
  var hasColorType = (window.element.type === "color");
  //If color type is working shouldn't acept normal strings
  if(hasColorType){
    var testStr = "foo";
    window.element.value = testStr;
    hasColorType = (window.element.value != testStr);
  }
  return(hasColorType);
}

var applyColorPicker = function(){
  $('input[type=color]').simpleColor();
};

if(!hasColorSupport()){
  var script = document.createElement('script');
  script.src = "javascripts/jquery.simple-color.js";

  if (script.readyState){ //IE Support
    script.onreadystatechange = function(){
      if (this.readyState === 'loaded' || this.readystate === 'complete'){
        script.onreadystatechange = null;
        applyColorPicker();
      }
    };
  } else { //Normal browsers
    script.onload = applyColorPicker;
  }

  document.getElementsByTagName("head")[0].appendChild(script);
}


