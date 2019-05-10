/*global $*/

//Saving settings
var save_settings = function(){
  //To store a value, we must use localStorage.setItem first parameter is the name and second the value
  localStorage.setItem("background_color", $("#background_color").val());
  localStorage.setItem("text_color", $("#text_color").val());
  localStorage.setItem("text_size", $("#text_size").val());
  apply_preferences_to_page();
};

//Getting settings
var load_settings = function (){
  //To retrieve the values we use localStorage.getItem with the key as a parameter
  var bgColor = localStorage.getItem("background_color");
  var textColor = localStorage.getItem("text_color");
  var textSize = localStorage.getItem("text_size");

  $("#background_color").val(bgColor);
  $("#text_color").val(textColor);
  $("#text_size").val(textSize);

  apply_preferences_to_page();
};

var apply_preferences_to_page = function(){
  $("body").css("backgroundColor", $("#background_color").val());
  $("body").css("color", $("#text_color").val());
  $("body").css("fontSize", $("#text_size").val() + "px");
};

load_settings();

$("form#preferences").submit(function(e){
  e.preventDefault();
  save_settings();
});


/*
localStorage is domain based and changes persists even after browser has closed. To store data only
during session and removes data when browser closes we can use sessionStorage instead
*/


