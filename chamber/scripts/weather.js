// Your API key and location coordinates for Misawa, Japan
const myKey = "a818c31567ea4e98be4144003252501";
const myLat = "40.6828";
const myLong = "141.5455";

// Function to display current weather
function displayCurrentWeather(data) {
    const currentDiv = document.querySelector('#current-weather');
    const currentWeather = data.current;

    currentDiv.innerHTML = `
        <h2>Current Weather</h2>
        <img src="https:${currentWeather.condition.icon}" alt="${currentWeather.condition.text}" width="100" height="100">
        <p>Current weather in Misawa, Japan is ${currentWeather.condition.text}</p>
        <p>Temperature: ${currentWeather.temp_f.toFixed(0)}&deg;F</p>
        <p>Feels like: ${currentWeather.feelslike_f.toFixed(0)}&deg;F</p>
        <p>Humidity: ${currentWeather.humidity}%</p>
        <p>Wind: ${currentWeather.wind_mph} mph</p>
    `;
}

// Function to display 3-day forecast
function displayForecast(data) {
    console.log("displayForecast function called");

    // Select forecast-id HTML elements in the document
    let day1Div = document.querySelector('#forecast1');
    let day2Div = document.querySelector('#forecast2');
    let day3Div = document.querySelector('#forecast3');

    // Directly use WeatherAPI's forecastday data
    const forecastDays = data.forecast.forecastday;

    // Assign the forecast for each day
    day1Div.innerHTML = createForecastCard(forecastDays[0]);
    day2Div.innerHTML = createForecastCard(forecastDays[1]);
    day3Div.innerHTML = createForecastCard(forecastDays[2]);
}

// Helper function to create a forecast card for each day
function createForecastCard(day) {
    return `<section>
        <img src="https:${day.day.condition.icon}" alt="${day.day.condition.text}" width="100" height="100">
        <div>
            <h4>${day.date}</h4>
            <p class="weather-desc">${day.day.condition.text}</p>
            <p>High: ${day.day.maxtemp_f.toFixed(0)}&deg;F</p>
            <p>Low: ${day.day.mintemp_f.toFixed(0)}&deg;F</p>
        </div>
    </section>`;
}

// Function to fetch weather data from the API using latitude and longitude
function fetchWeather(lat, long) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${myKey}&q=${lat},${long}&days=3&aqi=no&alerts=no`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Call functions to display current weather and forecast
            displayCurrentWeather(data);
            displayForecast(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

// Fetch weather for Misawa, Japan using latitude and longitude
fetchWeather(myLat, myLong);
