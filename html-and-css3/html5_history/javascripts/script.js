/* global $ */
var configureTabSelection = function() {
  //All services will be hidden at the beginning
  $("#services, #about, #contact").hide().attr("aria-hidden", true);
  $("#welcome").attr("aria-hidden",false);

  //When a click event occurs on any link in nav the section the function calls activateTab
  //passing the element that has been clicked
  //The event also calls addTabHistory to include the event in the browser history
  $("nav ul").click(function(event){
    var target = $(event.target);
    if(target.is("a")){
      event.preventDefault(); //prevents the browser to go to href value
      if ( $(target.attr("href")).attr("aria-hidden")){
        addTabToHistory(target);
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

//Add support for the browser back button, the following code add to the browser history the user interactions between tabs
var addTabToHistory = function(target){
  var tab = target.attr("href");
  var stateObject = {tab: tab};
  window.history.pushState(stateObject, "", tab);
};

var configurePopState = function(){
  window.onpopstate = function(e){
    if(e.state){
      activateTab(e.state.tab);
    }
  };
};

var activateDefaultTab = function(){
  var tab = window.location.hash || "#welcome";
  activateTab(tab);
  window.history.replaceState({tab: tab}, "", tab);

};

var init = function(){
  configureTabSelection();
  configurePopState();
  activateDefaultTab();
};

init();

