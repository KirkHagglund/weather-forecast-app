/* TODO:

When typing a city into the input form, click needs to generate two fetches.
The first fetch brings up current weather, appending it to the #current-section
The second fetch brings up the five day forecast, appending it to the #forecast-section
Requires an addEventListener
Fetched information must be then stored in localStorage and once replaced, it should populate inside the #past-searches section

*/
let cityName = document.getElementById('city');
let currentCity = document.getElementById('current-section');

let requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=3f84325a852afcf6282b9ff4cc366d95';

var submitRequest = function (event) {
    event.preventDefault();
    
    var cityInput = cityName.ariaValueMax.trim();

    if (cityInput) {
        getCityWeather(cityInput);

        currentCity.textContent = '';
        cityName.value = '';
    }   else {
        alert('PLease enter a city name');
    }
};
fetch(requestUrl).then(function (response) {
        if (response.ok) {
            console.log(response);        }
            respsonse.json().then(function (data) {
                console.log(data);               
            });
    });