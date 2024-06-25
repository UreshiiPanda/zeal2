function getWeather() {
    const apiKey = '92928b8e37b84d9658c4ba6b1c94ee41';
    const city = document.getElementById('cityInput').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    console.log('Fetching current weather data for', city);
    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Current weather data received:', data);
            currentWeather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });
}

function currentWeather(data) {
    console.log("function Data", data)
    const cityName = data.name
    console.log(cityName);

    const temp = Math.round(data.main.temp - 273.15) * 9/5 + 32;
    document.getElementById('temperature').innerHTML = temp;

    const hightemp = Math.round(data.main.temp_max - 273.15) * 9/5 +32;
    document.getElementById('temperaturehigh').innerHTML = hightemp;

    const lowtemp = Math.round(data.main.temp_min - 273.15) * 9/5 +32;
    document.getElementById('temperaturelow').innerHTML = lowtemp;

    const feelslike = Math.round(data.main.feels_like -273.15) * 9/5 +32;
    document.getElementById('feelslike').innerHTML = feelslike;

    const outside = data.main.humidity;
    document.getElementById('outside').innerHTML = outside;

    const rain = data.weather[0].main;
    document.getElementById('rain').innerHTML = rain;

    const sunrise = data.sys.sunrise;
    document.getElementById('sunrise').innerHTML = sunrise


}


function showTime() {
    document.getElementById('currentTime').innerHTML = new Date().toUTCString();
}

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();

    // Pad single digit minutes with a leading zero
    minutes = minutes < 10 ? '0' + minutes : minutes;

    const timeString = hours + ':' + minutes;
    document.getElementById('clock').textContent = timeString;
}

// Update the clock once to avoid delay
updateClock();



