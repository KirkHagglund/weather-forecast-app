/* TODO:

When typing a city into the input form, click needs to generate two fetches.
The first fetch brings up current weather, appending it to the #current-section
The second fetch brings up the five day forecast, appending it to the #forecast-section
Requires an addEventListener
Fetched information must be then stored in localStorage and once replaced, it should populate inside the #past-searches section

*/
let cityName = document.getElementById('city');
let currentCity = document.getElementById('current-section');
const searchBtn = document.getElementById('search-btn');



var submitRequest = function (event) {
    event.preventDefault();
    
    var cityInput = cityName.value;

    if (cityInput) {
        getCityWeather(cityInput);
        currentCity.textContent = '';
        cityName.value = '';
    }   else {
        alert('PLease enter a city name');
    }
};

const getCityWeather = (city) => {
    const requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=3f84325a852afcf6282b9ff4cc366d95&units=metric';
    fetch(requestUrl).then(function (response) {
        if (response.ok) {
            console.log(response);
         }
            response.json().then(function (data) {
                console.log(data); 
                console.log(data.name, data.weather[0].main, data.main.temp);
                let cityHeading = document.createElement('h3');
                let cityWeather = document.createElement('p');
                let cityTemp = document.createElement('p');
                cityHeading.textContent = data.name;
                cityWeather.textContent = data.weather[0].main;
                cityTemp.textContent = data.main.temp;
                currentCity.appendChild(cityHeading);
                currentCity.appendChild(cityWeather);
                currentCity.appendChild(cityTemp);
            });
    });
};

searchBtn.addEventListener('click', submitRequest);