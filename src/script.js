// Current day and time with hours and minutes
let now = new Date();
console.log(now);
let currentTime = document.querySelector("#current-time");
// present time to be displayed
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
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

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
console.log(month);

currentTime.innerHTML = `${day}, ${hours}:${minutes}`;
console.log(currentTime);

//Interject the city entered into HTML WEEK 4
//Upon searching for a city it should display the city and the temperature of that city WEEK 5
function showTemperature(response) {
  console.log(response);
  console.log(response.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
  let currentTemperature = Math.round(response.data.main.temp);
  let actualTemperature = document.querySelector("#temperature");
  let description = document.querySelector("#temp-description");
  let humidity = document.querySelector("#humidity");
  let realFeel = document.querySelector("#real-feel");
  let maxTemp = document.querySelector("#max-temp");
  let minTemp = document.querySelector("#min-temp");
  actualTemperature.innerHTML = `Temp: ${currentTemperature}°C`;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
  realFeel.innerHTML = `Real feel: ${Math.round(
    response.data.main.feels_like
  )}°C`;
  maxTemp.innerHTML = `Max: ${Math.round(response.data.main.temp_max)}°C`;
  minTemp.innerHTML = `Min: ${Math.round(response.data.main.temp_min)}°C`;
}

function searchCity(event) {
  event.preventDefault();
  //let cityName = document.querySelector("#city");
  let cityInput = document.querySelector("#cityInput");
  console.log(cityInput);
  let city = `${cityInput.value}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${cityInput.value}`;
  //if (cityInput.value) {
  //cityName.innerHTML = cityInput.value;
  //} else {
  //cityName.innerHTML = `<u>Oopsie!!! Please try again!</u>`;
  //}
  let unit = "metric";
  let apiKey = "a8bb545115365cdae986d0ebd7521ddb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showTemperature);
}
let searchForm = document.querySelector("#search-form");
//console.log(searchForm);
searchForm.addEventListener("submit", searchCity);

//show current location
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "metric";
  let apiKey = "a8bb545115365cdae986d0ebd7521ddb";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showTemperature);
}

function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getPosition);

//fahrenheit temperature
function convert() {
  let newTemp = document.querySelector("#temperature");
  newTemp.innerHTML = 34;
}
let farenheitTemp = document.querySelector("#fahrenheit-link");
farenheitTemp.addEventListener("click", convert);

//celcius temperature
function convertBack() {
  let newTemp = document.querySelector("#temperature");
  newTemp.innerHTML = 1;
}
let celciusTemp = document.querySelector("#celcius-link");
celciusTemp.addEventListener("click", convertBack);
