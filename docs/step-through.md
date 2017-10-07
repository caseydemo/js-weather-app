# js-weather app

## in this document I will explain how the js-weather app works
----

### get user input

- in the top of our page weve got an input form for our user to enter a zip code

```html
<div id="inputForm" class="form-inline">

    <!-- user inputs zip code here -->

    <input type="number" class="form-control" placeholder="40507" id="zipInput">

    <button type="button" class="btn btn-success" id="weatherButton">Get Weather</button>

  </div>
  ```


### getWeather() function

- the button with the id="weatherButton" we created sends the user's input to the getWeather function
 
```javascript
weatherButton.onclick = getWeather;
```


- the getWeather function connects to the openweathermaps.org API with the user's specified zip code and retrieves a json file with tons of weather info

```js
function getWeather() {

  var url="http://api.openweathermap.org/data/2.5/weather?zip=<zipcode>&us&appid=ef6a94dab254dc386b931af4d5ca58c7";
  url = url.replace("<zipcode>", zipInput.value); 

  apiRequest = new XMLHttpRequest();
  apiRequest.onload = catchResponse;
  apiRequest.onerror = httpRequestOnError;
  apiRequest.open('get', url, true);
  apiRequest.send();

}
```



- first it creates and defines a variable ('url') to hold the address of the api

- then the 'url.replace' function is run on the created variable to replace the stock zip code with the user's input



 
 
 
 var url="http://api.openweathermap.org/data/2.5/weather?zip=<zipcode>&us&appid=ef6a94dab254dc386b931af4d5ca58c7";
 
 url = url.replace("<zipcode>", zipInput.value);
 
 


### XML Http Request (this part is dense)

- then we create a new XMLHttpRequest() and hold it in the apiRequest variable
- catch the response in the apiRequest.onload method
- check for error with the apiRequest.onerror method
- open the apiRequest with three parameters ('get', 'url', 'true')
- and then call the apiRequest.send method()


```js
apiRequest = new XMLHttpRequest();
  apiRequest.onload = catchResponse;
  apiRequest.onerror = httpRequestOnError;
  apiRequest.open('get', url, true);
  apiRequest.send();
  ```

alot of things just happened... so lets break that down a little more. 


- first thing I need to wrap my head around is this XML request thing - so I looked it up
## [XML Http Request](https://www.w3schools.com/xml/xml_http.asp)

- seems that we've just made contact with the server and asked us to give us stuff

- after we contact the server we catch it's response (apiRequest.onload = catchResponse;)
- if there is an error, we let the user know with our custom made error function ( apiRequest.onerror = httpRequestOnError;) 
- this next part (apiRequest.open('get', url, true);) I don't super get so let me dig...
[Ajax send a request to a server](https://www.w3schools.com/xml/ajax_xmlhttprequest_send.asp)

<br>
<center>apiRequest.open('get', url, true);</center>
<br>



ok thats a little clearer
- method - GET or POST
- url - the file location were trying to reach
- true - wether it's async or not (still fuzzy on that)

- next is the apiRequest.send()... which I can only assume sends the actual api request weve generated (???)

---
## catch the api's response


```
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
  ```

### function catchResponse()

- if the status of the api's response is "OK" then...

	- leave errorMessage.innerHTML  blank (or make it blank if it had something)

		- also set the errorMessage display to 'none' and 'block'



- if the response is anything other than "OK"

	- set the errorMessage display to the message received from the api

		- it has to be parsed through the JSON.parse(apiRequest.responseText) method

	- then set the error display to 'block' and 'none' 

----
### function parseResponse()

woooooo... this one looks like a doozie. lets break it down. but first - heres what the whole function looks like:

```
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
```

- lets break it down section by section
<br>
<br>
<br>


<center>var results = JSON.parse(apiRequest.responseText);</center>

-----

### [JSON parse](https://www.w3schools.com/js/js_json_parse.asp)

- so the variable 'results' is being filled with data being parsed by the built in function -- JSON.parse() -- 
- this method is reaching within the apiRequest to the responseText (apiRequest.responseText) that's where the real message from the api resides

---


```
	var tempK = Math.round(results.main.temp);
    var tempF = Math.round(9/5 * (tempK - 273) + 32); // 9/5 (K - 273) + 32
    var tempC = tempK - 273; // K - 273
```

- then we make three variables to hold data we've snagged from the api
	- var tempK = Math.round(results.main.temp);

		- tempK grabs the temperature from within main which is within results and rounds that number

		- the api gives us temperature in kelvin so this value doesn't need any calculations, however the farenheit and celcius will


	- var tempF = Math.round(9/5 * (tempK - 273) + 32); // 9/5 (K - 273) + 32

		- tempF takes the info gathered from tempK and performs calculations on it to convert it from kelvin to farenheit (9/5*(tempK-271)+32)

