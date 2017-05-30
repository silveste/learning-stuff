var colorChanger = document.getElementById("color-changer");

colorChanger.addEventListener("click", toggleColor);

function toggleColor(){
  console.log("function toggleColor Executed");
  var body = document.getElementsByTagName("body")[0];
  console.log("before if statement");
  if (body.style.backgroundColor === "purple"){
    console.log("setting white");
    body.style.backgroundColor = "white";
  } else {
    console.log("setting purple");
    body.style.backgroundColor = "purple";
  }
}
