/* TODO:

When typing a city into the input form, click needs to generate two fetches.
The first fetch brings up current weather, appending it to the #current-section
The second fetch brings up the five day forecast, appending it to the #forecast-section
Requires an addEventListener
Fetched information must be then stored in localStorage and once replaced, it should populate inside the #past-searches section

*/

let cityName = document.getElementById('city').value;
let requestUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=3f84325a852afcf6282b9ff4cc366d95';
fetch(requestUrl)
    .then(function (response) {
        return respsonse.json();
    });