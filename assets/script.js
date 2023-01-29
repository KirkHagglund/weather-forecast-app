/* TODO:

When typing a city into the input form, click needs to generate two fetches.
The first fetch brings up current weather, appending it to the #current-section
The second fetch brings up the five day forecast, appending it to the #forecast-section
Requires an addEventListener
Fetched information must be then stored in localStorage and once replaced, it should populate inside the #past-searches section

*/
let cityName = document.getElementById('city');
let currentCity = document.getElementById('current-section');
let forecastSection = document.getElementById('forecast-section');
const searchBtn = document.getElementById('search-btn');
let pastSearch = document.getElementById('past-card');
var today = dayjs();


var submitRequest = function (event) {
    event.preventDefault();
    
    var cityInput = cityName.value;

    if (cityInput) {
        getCityWeather(cityInput);
        getForecast(cityInput);
    }   else {
        alert('PLease enter a city name');
    }
    cityName.value = '';
};

const getCityWeather = (city) => {
    const requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=3f84325a852afcf6282b9ff4cc366d95&units=metric';
    fetch(requestUrl).then(function (response) {
        if (response.ok) {
            console.log(response);
         };
            response.json().then(function (data) {
                console.log(data); 
                console.log(data.name, data.weather[0].icon, data.main.temp);
                let cityHeading = document.createElement('h3');
                let cityWeather = document.createElement('img');
                let cityTemp = document.createElement('p');
                let cityHumidity = document.createElement('p');
                let cityWind = document.createElement('p');
                cityHeading.textContent = data.name + ' ' + today.format('MMM D, YYYY') /*+ img.src; "http://openweathermap.org/img/wn/' + cityWeather + '@2x.png'*/;
                cityTemp.textContent = 'Temp: ' + Math.floor(data.main.temp) + '°C';
                cityHumidity.textContent = 'Humidity: ' + data.main.humidity + '%';
                cityWind.textContent = 'Wind: ' + data.wind.speed + ' KmPH'                            
                currentCity.appendChild(cityHeading);
                currentCity.appendChild(cityTemp);
                currentCity.appendChild(cityHumidity);
                currentCity.appendChild(cityWind);               
            });
    });
};

const getForecast = (city) => {
    const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=3f84325a852afcf6282b9ff4cc366d95&units=metric';
    fetch(forecastUrl).then(function (response) {
        if (response.ok) {
            console.log(response);
        };
            response.json().then(function (data) {
                console.log(data);
            });
    });
};

searchBtn.addEventListener('click', submitRequest);