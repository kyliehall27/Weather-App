let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();

let currentDate = document.querySelector("h3");
currentDate.innerHTML = `${day}, ${month} ${date}, ${hour}:${minutes}`;

function submitCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city");
  let city = document.querySelector("h1");
  if (searchInput.value) {
    city.innerHTML = `${searchInput.value}`;
    searchCity(searchInput.value);
  } else {
    alert("Please type a city.");
  }
}
function searchCity(city) {
  let apiKey = "febef54c856480b233a2d1a8e1f8b205";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(`${apiUrl}`).then(showTemperature);
}
let form = document.querySelector("#search-city-form");
form.addEventListener("submit", submitCity);

let apiKey = "febef54c856480b233a2d1a8e1f8b205";
let city = document.querySelector("#search-city");
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temperature");
  currentTemp.innerHTML = `${temperature}`;
}

axios.get(`${apiUrl}`).then(showTemperature);

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = 17;
}

let celsiusButton = document.querySelector("#celsius-button");
celsiusButton.addEventListener("click", convertToCelsius);

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temperature");
  temperatureElement.innerHTML = 62.6;
}

let fahrenheitButton = document.querySelector("#fahrenheit-button");
fahrenheitButton.addEventListener("click", convertToFahrenheit);

function showLocationTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.main.location;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
  let currentTemp = document.querySelector("#current-temperature");
  currentTemp.innerHTML = `${temperature}`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = `febef54c856480b233a2d1a8e1f8b205`;
  let units = "metric";
  let apiPositionUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiPositionUrl).then(showLocationTemp);
}

navigator.geolocation.getCurrentPosition(showPosition);
