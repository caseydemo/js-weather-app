var zipInput = document.getElementById("zipInput");
var weatherButton = document.getElementById("weatherButton");

var error = document.getElementById("error");
var errorMessage = document.getElementById("errorMessage");

var output = document.getElementById("output");

var conditionOutput = document.getElementById("conditionOutput");
var temperatureOutputK = document.getElementById("temperatureOutputK");
var temperatureOutputF = document.getElementById("temperatureOutputF");
var temperatureOutputC = document.getElementById("temperatureOutputC");
var cityOutput = document.getElementById("cityOutput");

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

    errorMessage.innerHTML = '';
    error.style.display = 'none';
    output.style.display = 'block';


  }

  else {

    errorMessage.innerHTML = JSON.parse(apiRequest.responseText).message;
    error.style.display = 'block';
    output.style.display = 'none';

  }
  
  console.log(apiRequest);


}


function httpRequestOnError() {

  alert("request is NOT COOL!");

}