var processLogin = function(form,event){
  event.preventDefault();
  var request = $.ajax({
    url: "/login",
    type: "POST",
    data: form.serialize(),
    dataType: "json"
  });
  request.done = function(){
    // Request has been sent, do whatever it needs to do
  };
  return request;
};

var addFormSubmitWithCSSAnimation = function(){
  $(".login").submit(function(event){
    var form = $(this);
    request = processLogin(form, event);
    request.fail(function(){
      console.error("Request failed");
      form.addClass("shake");
    });
  });
};

var addAnimationEndListener = function(){
  $(".login").on("animationend",function(event){
    $(this).removeClass("shake");
  });
};

addFormSubmitWithCSSAnimation();
addAnimationEndListener();
