/* global $ */

var url = 'https://ron-swanson-quotes.herokuapp.com/v2/quotes';
var $quote = $("#quote");

//XHR
// jQuery could be used here.
// I didn't used though for variety sake
var xhrBtn = document.querySelector('#xhr');
xhrBtn.addEventListener("click", function(){
  var XHR = new XMLHttpRequest();
  XHR.onreadystatechange = function() {
  if (XHR.readyState == 4 && XHR.status == 200){
      var res= JSON.parse(XHR.responseText);
      printResult(res);
    }
  };
    XHR.open("GET",url);
    XHR.send();
});

//fetch
var fetchBtn = document.querySelector("#fetch");
fetchBtn.addEventListener("click", function(){
  fetch(url)
    .then(function(res){
      return res.json();
    })
    .then(function(res){
      printResult(res);
    });
});

//jQuery
$("#jquery").click(function(){
  $.getJSON(url)
    .done(function(res){
      printResult(res);
    });
});

//axios
var axiosBtn = document.querySelector("#axios");
axiosBtn.addEventListener("click", function(){
  axios.get(url)
    .then(function(res){
      printResult(res.data);
    });
});

function printResult(response) {
  console.log(response);
  $quote.text(response[0]);
}
