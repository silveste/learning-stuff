/*global $*/

//Requires the server installed in the local machine

var setupChat = function(){
  var webSocket = new WebSocket('ws://localhost:9999');
  webSocket.onopen = function(event){
    $('#chat').append('<br>Conected to the server');
  };
  webSocket.onMessage= function(event){
    $('#chat').append('<br>' + event.data);
    $('#chat').animate({scrollTop: $('chat').height()});
  };
  webSocket.onclose= function(event){
    $('#chat').append('<br>' + event.data);
    $('#chat').append('<br>Conection closed');
  };
  $("form#chat_form").submit(function(e){
    e.preventDefault();
    var textfield = $('#message');
    webSocket.send(textfield.val());
    textfield.val("");
  });
};

setupChat();
