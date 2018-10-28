

var btn = document.querySelector("#btn");
var apiURL = "https://randomuser.me/api/";

window.onload = newRequest(apiURL);
btn.addEventListener("click", function(){newRequest(apiURL);});



function newRequest(url) {
  fetch(url)
    .then(handleErrors)
    .then(parseJSON)
    .then(updateProfile)
    .catch(printError);
}

function handleErrors(res){
  if(!res.ok){
    throw Error(res.status);
  }
  return res.json();
}

function parseJSON(res) {
  var data = res.results[0];
  var user = {
    avatar: data.picture.medium,
    fullName: data.name.first + " " + data.name.last,
    userName: data.login.username,
    email: data.email,
    city: data.location.city
  };
  return user;
}

function updateProfile(user){
  document.querySelector("#avatar").src = user.avatar;
  document.querySelector("#fullname").textContent = user.fullName;
  var userName = document.querySelector("#username").textContent = user.userName;
  var email = document.querySelector("#email").textContent = user.email;
  var city = document.querySelector("#city").textContent = user.city;
}

function printError(error){
  console.log(error);
}
