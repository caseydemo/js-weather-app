# Weather Application

A webpage that prompts a use to enter a zipcode, then
displays current weather information for that location
or a friendly error message if the zipcode is not found.

## Tech

1. HTML
2. CSS
3. JS

## Wireframe

See wireframe-js-weather.png.

## MVP (minimal viable product)

The app should display a title, input box for zipcode, and
a submit button.

That's all that should display by default.

When the submit button is clicked, that application should
fetch weather data from api.openweathermap.org.

If the request is successful, display:

1. City name
2. Current conditions
3. Current temperature in Kelvin, Fahrenheit, and Celsius, and
4. an image, selected by the current temperature.

If the request is unsuccessful, display an error message.
