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
var weatherImage = document.getElementById("weatherImage");

var apiRequest;



// Wait for page to load before making button work
document.onreadystatechange = function() {
  if (document.readyState == "interactive") {
    weatherButton.onclick = getWeather;
  }
};


function getWeather() {

  var url="https://api.openweathermap.org/data/2.5/weather?zip=<zipcode>&us&appid=ef6a94dab254dc386b931af4d5ca58c7";
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

    parseResponse();

  }

  else {

    errorMessage.innerHTML = JSON.parse(apiRequest.responseText).message;
    error.style.display = 'block';
    output.style.display = 'none';

  }
  
  console.log(JSON.parse(apiRequest.responseText));


}

function parseResponse() {

    var results = JSON.parse(apiRequest.responseText);

    var tempK = Math.round(results.main.temp);
    var tempF = Math.round(9/5 * (tempK - 273) + 32); // 9/5 (K - 273) + 32
    var tempC = tempK - 273; // K - 273

    temperatureOutputK.innerHTML = tempK + "&deg;";
    temperatureOutputF.innerHTML = tempF + "&deg;";
    temperatureOutputC.innerHTML = tempC + "&deg;";

    cityOutput.innerHTML = results.name;

    conditionOutput.innerHTML = results.weather[0].description;

    if (tempF > 92) {
      weatherImage.src = "http://www.thelandofshadow.com/wp-content/uploads/2013/04/mordor_by_edli-d2yrha5.jpg";
    }
    else if (tempF > 85) {
      weatherImage.src = "https://media.rbl.ms/image?u=%2Ffiles%2F2016%2F04%2F15%2F635963469764710781-1002509858_tumblr_n6vi59KPmO1tbh1dho1_400.gif&ho=https%3A%2F%2Faz616578.vo.msecnd.net&s=765&h=09e03017b9751456564b4ce2542f761a7bb5f8d551aaf061b251294fbd316e80&size=980x&c=3646041352";
    }
    else if (tempF > 75) {
      weatherImage.src = "http://i0.kym-cdn.com/photos/images/original/001/093/677/752.png";
    }
    else if (tempF > 65) {
      weatherImage.src = "http://ecotechpoolservice.com/wp-content/uploads/2012/10/Swimming-Pool-Sustainability.jpg";
    }
    else if (tempF > 32) {
      weatherImage.src = "http://yumgoggle.com/wp-content/uploads/2015/12/Hot-Cocoa-DSC_4177-square-600.jpg";
    }
    else {
      weatherImage.src = "https://i.pinimg.com/736x/ba/74/25/ba7425153dfe73f669027c7fc9d0ef75--jon-snow-funny-animals.jpg";
    }

}

function httpRequestOnError() {

    errorMessage.innerHTML = "HTTP request could not be completed";
    error.style.display = 'block';
    output.style.display = 'none';


}