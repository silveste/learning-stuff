/* global $ */
var configureTabSelection = function() {
  //All services will be hidden at the beginning
  $("#services, #about, #contact").hide().attr("aria-hidden", true);
  $("#welcome").attr("aria-hidden",false);

  //When a click event occurs on any link in nav the section the function calls activateTab
  //passing the element that has been clicked
  $("nav ul").click(function(event){
    var target = $(event.target);
    if(target.is("a")){
      event.preventDefault(); //prevents the browser to go to href value
      if ( $(target.attr("href")).attr("aria-hidden")){
        activateTab(target.attr("href"));
      }
    }
  });
};

//hide all elements and then show the element that is passed
var activateTab = function(selector){
  $("[aria-hidden=false]").hide().attr("aria-hidden", true);
  $(selector).show().attr("aria-hidden", false);
};

configureTabSelection();
