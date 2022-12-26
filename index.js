//Dates for h3
let now = new Date();

let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let currentDate = now.getDate();
let currentMonth = months[now.getMonth()];
let currentDay = days[now.getDay()];
let currentHour = now.getHours();
if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}
let currentMinutes = now.getMinutes();
if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}
let h3 = document.querySelector("h3");
h3.innerHTML = `${currentDate} ${currentMonth} ${currentDay}, ${currentHour}:${currentMinutes}`;

//search city
function searchSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city.value}`;
}

let search = document.querySelector("#enter-city");
search.addEventListener("submit", searchSubmit);

function showWeather(response) {
  console.log({ response });
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#temp-now").innerHTML = `${Math.round(
    response.data.main.temp
  )}°`;
  document.querySelector("#temp-max").innerHTML = `🌡${Math.round(
    response.data.main.temp_max
  )}°`;
  document.querySelector("#temp-min").innerHTML = `🌡${Math.round(
    response.data.main.temp_min
  )}°`;
  document.querySelector("#feels-like").innerHTML = `Feels like:${Math.round(
    response.data.main.feels_like
  )}°`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind:${Math.round(
    response.data.wind.speed
  )}km/h`;

  document.querySelector("#current-sky").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "7059cb165caa3316bff682d263a01b1e";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}
//show Location
function showLocation(position) {
  let apiKey = "7059cb165caa3316bff682d263a01b1e";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let searchCityForm = document.querySelector("#enter-city");
searchCityForm.addEventListener("submit", handleSubmit);
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Tokyo");
