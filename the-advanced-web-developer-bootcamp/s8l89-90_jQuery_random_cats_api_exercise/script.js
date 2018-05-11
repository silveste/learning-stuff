/* global $ */
  // var btn = document.querySelector("#btn");
  // var img = document.querySelector("#photo");
  // btn.addEventListener("click", function(){
  //   var XHR = new XMLHttpRequest();
  //
  //   XHR.onreadystatechange = function() {
  //     if (XHR.readyState == 4 && XHR.status == 200){
  //       var url = JSON.parse(XHR.responseText).message;
  //       img.src = url;
  //       console.log(url);
  //     }
  //   };
  //   XHR.open("GET","https://dog.ceo/api/breeds/image/random");
  //   XHR.send();
  // });
var url= "https://dog.ceo/api/breeds/image/random";
window.onLoad = setRandomImage();
$("#btn").click(setRandomImage);
function setRandomImage(){
  $.getJSON(url)
  .done( function(res){
    console.log(res);
    $("#photo").attr("src", res.message);
  });
}
