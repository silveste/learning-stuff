
// Required DOM Nodes
var btn = document.querySelector("#btn");
var priceElement = document.querySelector("#price");
var radioButtons = document.getElementsByName("currency");


window.onload = newRequest();
btn.addEventListener("click", newRequest);



function newRequest() {
  var XHR = new XMLHttpRequest();

  XHR.onreadystatechange = function() {
    if (XHR.readyState == 4 && XHR.status == 200){
      var response = JSON.parse(XHR.responseText);
      var currency = getCheckedValue(radioButtons);
      var rate = response.bpi[currency].rate;
      priceElement.textContent = rate + " " + currency;
      console.log("New request:" + rate + " " + currency);
    }
  };
  XHR.open("GET","https://api.coindesk.com/v1/bpi/currentprice.json");
  XHR.send();
}

function getCheckedValue(radioButtons){
  for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            return radioButtons[i].value;
        }
    }
  return null;
}
