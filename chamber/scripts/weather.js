const myKey = "a818c31567ea4e98be4144003252501";
const myLat = "40.6828";
const myLong = "141.5455";

// Function to display current weather
function displayCurrentWeather(data) {
    const currentDiv = document.querySelector('#current-weather');
    const currentWeather = data.current;

    if (currentDiv) {
        currentDiv.innerHTML = `
            <h2>Current Weather</h2>
            <img src="${currentWeather.condition.icon}" alt="${currentWeather.condition.text}" width="100" height="100">
            <p>Current weather in Misawa, Japan is ${currentWeather.condition.text}</p>
            <p>Temperature: ${currentWeather.temp_f.toFixed(0)}&deg;F</p>
            <p>Feels like: ${currentWeather.feelslike_f.toFixed(0)}&deg;F</p>
            <p>Humidity: ${currentWeather.humidity}%</p>
            <p>Wind: ${currentWeather.wind_mph} mph</p>
        `;
    } else {
        console.error('Error: #current-weather element not found.');
    }
}

// Function to display concise 3-day forecast with boxes
function displayForecast(data) {
    const forecastDiv = document.querySelector('#forecast');

    if (forecastDiv) {
        // Extract forecast data from the API response
        const forecastDays = data.forecast.forecastday;

        // Build the forecast summary with boxes for each day
        let forecastSummary = "<h2>Weather Forecast</h2>";
        forecastDays.forEach((day, index) => {
            const dayName = index === 0 ? "Today" : new Date(day.date).toLocaleDateString("en-US", { weekday: "long" });
            forecastSummary += `
                <div class="forecast-box">
                    <img src="${day.day.condition.icon}" alt="${day.day.condition.text}" width="80" height="80">
                    <p class="forecast-day">${dayName}</p>
                    <p class="forecast-temp">${day.day.maxtemp_f.toFixed(0)}°F</p>
                    <p class="forecast-desc">${day.day.condition.text}</p>
                </div>
            `;
        });

        // Inject the forecast summary into the HTML
        forecastDiv.innerHTML = forecastSummary;
    } else {
        console.error('Error: #forecast element not found.');
    }
}

// Function to fetch weather data from the API using latitude and longitude
function fetchWeather(lat, long) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${myKey}&q=${lat},${long}&days=3&aqi=no&alerts=no`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Call functions to display current weather and forecast
            displayCurrentWeather(data);
            displayForecast(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            const currentDiv = document.querySelector('#current-weather');
            const forecastDiv = document.querySelector('#forecast');
            
            if (currentDiv) {
                currentDiv.innerHTML = `<p>Error fetching current weather data.</p>`;
            }
            if (forecastDiv) {
                forecastDiv.innerHTML = `<p>Error fetching forecast data.</p>`;
            }
        });
}

// Fetch weather for Misawa, Japan using latitude and longitude
fetchWeather(myLat, myLong);
