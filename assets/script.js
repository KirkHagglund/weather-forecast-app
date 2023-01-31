//Variable assignment section
let cityName = document.getElementById('city');
let currentCity = document.getElementById('current-section');
let forecastSection = document.getElementById('forecast-section');
const searchBtn = document.getElementById('search-btn');
const pastSearches = document.getElementById('past-searches');
let pastCard = document.getElementById('past-cards');

var today = dayjs();

//Function tied to event listener
var submitRequest = function (event) {
    event.preventDefault();
    forecastSection.textContent = "";
    currentCity.textContent = "";
    var cityInput = cityName.value;

    if (cityInput) {
        getCityWeather(cityInput);
        getForecast(cityInput);
    }   else {
        alert('PLease enter a city name');
    };
    cityName.value = '';
};

var recallRequest = function (event) {
    event.preventDefault();

    getCityWeather(button.textContent);
    getForecast(button.textContent);
}

//Current weather function
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
                
                cityHeading.textContent = data.name + ' ' + today.format('MMM D, YYYY');
                cityTemp.textContent = 'Temp: ' + Math.floor(data.main.temp) + '°C';
                cityHumidity.textContent = 'Humidity: ' + data.main.humidity + '%';
                cityWind.textContent = 'Wind: ' + data.wind.speed + ' KmPH';
                cityWeather.src = 'http://openweathermap.org/img/wn/' + (data.weather[0].icon) + '@2x.png';                            
                
                currentCity.appendChild(cityHeading);
                currentCity.appendChild(cityWeather);
                currentCity.appendChild(cityTemp);
                currentCity.appendChild(cityHumidity);
                currentCity.appendChild(cityWind);
                
                //Local Storage Section
                const searchedCityObject = {
                    name: data.name
                }

                let pastCities = JSON.parse(localStorage.getItem('cities')) || [];

                pastCities.push(searchedCityObject);

                localStorage.setItem('cities', JSON.stringify(pastCities));   
                
                const button = document.createElement("button");
                button.classList.add("past-search-btn");
                button.textContent = data.name;
                button.setAttribute('class', 'search-card');
                pastCard.appendChild(button);


            });
    });
};

//Five day forecast function
const getForecast = (city) => {
    const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=3f84325a852afcf6282b9ff4cc366d95&units=metric';
    fetch(forecastUrl).then(function (response) {
        if (response.ok) {
            console.log(response);
        };
            response.json().then(function (data) {
                console.log(data);
                let forecastArray = [data.list[7], data.list[15], data.list[23], data.list[31], data.list[39]];
                console.log(forecastArray);

                for (i=0; i<forecastArray.length; i++) {
                    let forecastHeading = document.createElement('h4');
                    let forecastWeather = document.createElement('img');
                    let forecastTemp = document.createElement('p');
                    let forecastHumidity = document.createElement('p');
                    let forecastCard = document.createElement('div');
                    let unixTimestamp = forecastArray[i].dt;
                    let milliseconds = unixTimestamp * 1000;
                    let dateObject = new Date(milliseconds);
                    let humanDayFormat = dateObject.toLocaleString('en-us', {weekday: 'short'});
                    let humanDateFormat = dateObject.toLocaleString('en-us', {day: 'numeric'});
                    let humanMonthFormat = dateObject.toLocaleString('en-us', {month: 'short'});
                    forecastCard.style.width = '19%';
                    forecastCard.style.height = 'fit-content';
                    forecastCard.style.backgroundColor = 'rgb(24, 24, 143)';
                    forecastCard.style.color = 'rgb(192, 205, 241)';
                    forecastCard.style.margin = '3px';
                    forecastWeather.style.height = '75px';
                    forecastHeading.textContent = humanDayFormat + ' ' + humanDateFormat + ' ' + humanMonthFormat;
                    forecastTemp.textContent = 'Temp: ' + Math.floor(forecastArray[i].main.temp) + '°C';
                    forecastHumidity.textContent = 'Humidity: ' + forecastArray[i].main.humidity + '%';
                    forecastWeather.src = 'http://openweathermap.org/img/wn/' + (forecastArray[i].weather[0].icon) + '@2x.png';

                    forecastSection.appendChild(forecastCard);
                    forecastCard.appendChild(forecastHeading);
                    forecastCard.appendChild(forecastWeather);
                    forecastCard.appendChild(forecastTemp);
                    forecastCard.appendChild(forecastHumidity);
                };          
            });
    });
};

//Event listener to trigger fetch calls
searchBtn.addEventListener('click', submitRequest);

pastCard.addEventListener('click', recallRequest);