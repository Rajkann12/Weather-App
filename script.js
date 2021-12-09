
const locationOutput = document.querySelector(".location-output");
const temperature = document.querySelector(".temperature");
const iconOutput = document.querySelector(".icon");
const temperatureFeel = document.querySelector(".data0");
const descriptionOutput = document.querySelector(".data1");
const humidityOutput = document.querySelector(".data2");
const windSpeed = document.querySelector(".data3");
const locationInput = document.querySelector(".location-input");
const searchButton = document.querySelector(".search-button");
const display = document.querySelector(".display");
const myBody = document.getElementsByTagName("body");



//CURRENT LOCATION WEATHER
let long;
let lat;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        long = position.coords.longitude;
        lat = position.coords.latitude;
        // CALLING FOR USER'S CURRENT LOCATION WEATHER
        weather.fetchWeatherDataViaPosition(lat, long);
    })
}



//DATA FETCH FROM API
let weather = {
    apiKey: '8eb8155ac0e48253fc8d0eedc651e2c1',
    fetchWeatherData: function (city) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`).then((response) => response.json()).then((data) => this.displayWeatherData(data))
    },

    fetchWeatherDataViaPosition: function (lat, long) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${this.apiKey}`).then((response) => response.json()).then((data) => this.displayWeatherData(data))
    },

    displayWeatherData: function (data) {
        const { name } = data;
        const { description, icon, main } = data.weather[0];
        const { temp, feels_like, humidity } = data.main;
        const { speed } = data.wind;
        // console.log(name,description,icon,temp,humidity,speed);

        locationOutput.innerText = `Weather in ${name}`;
        temperature.innerText = `Temperature  ${temp} °C`;
        iconOutput.src = `http://openweathermap.org/img/wn/${icon}.png`;
        temperatureFeel.innerText = `Feels like ${feels_like} °C`
        descriptionOutput.innerText = description;
        humidityOutput.innerText = `Humidity: ${humidity}%`;
        windSpeed.innerText = `Wind: ${speed} m/sec`;
        myBody[0].style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${main}-weather)`;

        display.classList.remove('loading');
    }

}


//EVENT LISTENER 
searchButton.addEventListener("click", function () {
    weather.fetchWeatherData(locationInput.value)
    locationInput.value = ""
});

locationInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        weather.fetchWeatherData(locationInput.value)
        locationInput.value = ""
    };
})

