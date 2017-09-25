var zipInput = document.getElementById("zipInput");
var weatherButton = document.getElementById("weatherButton");

var error = document.getElementById("error");
var errorMessage = document.getElementById("errorMessage");

var apiRequest;



// Wait for page to load before making button work
document.onreadystatechange = function() {
  if (document.readyState == "interactive") {
    weatherButton.onclick = getWeather;
  }
};


function getWeather() {

  var url="http://api.openweathermap.org/data/2.5/weather?zip=<zipcode>&us&appid=ef6a94dab254dc386b931af4d5ca58c7";
  url = url.replace("<zipcode>", zipInput.value); 

  apiRequest = new XMLHttpRequest();
  apiRequest.onload = catchResponse;
  apiRequest.onerror = httpRequestOnError;
  apiRequest.open('get', url, true);
  apiRequest.send();

}


function catchResponse() {

  if (apiRequest.statusText === "OK") {

    console.log("Good request");

  }

  else {

    errorMessage.innerHTML = JSON.parse(apiRequest.responseText).message;
    error.style.display = 'block';

  }
  
  console.log(apiRequest);


}


function httpRequestOnError() {

  alert("request is NOT COOL!");

}