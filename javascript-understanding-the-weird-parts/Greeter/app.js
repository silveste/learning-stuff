$("#login").click(function(){
  var name = $("#name").val();
  var lastName = $("#last-name").val();
  var lang = $("#lang").val();

  var greet = G$(name, lastName, lang);

  $("#login-div").hide();

  greet.queryGreeting("#greeting", true).log();
});
