function showTemperature(response) {
  let temperatureElement = document.querySelector("#todays-temp");
  let cityElement = document.querySelector("#city");
  let dateElement = document.querySelector("#current-date");
  let descriptionElement = document.querySelector("#weather-description");
  let iconElement = document.querySelector("#today-weather-icon");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

// search city

function search(city) {
  let units = "metric";
  let apiKey = "d1be4136ed4955ecd4ad578e1cdcae10";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);

  city.innerHTML = `${city}`;
}

// handle city search and submit

function handleCitySearch(event) {
  event.preventDefault();
  let citySearchInput = document.querySelector("#search-text-input");
  search(citySearchInput.value);
}

let citySearch = document.querySelector("#city-search-form");
citySearch.addEventListener("submit", handleCitySearch);

// show temperature unit change

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#todays-temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#todays-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemperature);

// default city

search("Tokyo");

// current location button and geolocation API

function retrieveCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "d1be4136ed4955ecd4ad578e1cdcae10";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

function searchCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveCurrentLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", searchCurrentPosition);

// get current date and time

function formatDate(timestamp) {
  let date = new Date(timestamp);
  let currentHour = date.getHours();

  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMin = date.getMinutes();

  if (currentMin < 10) {
    currentMin = `0${currentMin}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  return `${currentDay} ${currentHour}:${currentMin}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

//5 day forecast

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="card mb-3" style="max-width: 95%">
        <div class="row">
          <div class="col-md-4">
           <h4 class="forecast-date" id="tomorrow-date">${day}</h4>
            </div>
            <div class="col-md-8">
              <div class="card-body">
              <div class="forecast-temperatures"> 
              <span id="forecast-temperature-max">22°</span>
              <span id="forecast-temperature-min">16°</span>
              </div>
              <img src="http://openweathermap.org/img/wn/50d@2x.png"
                  alt=""
                  width="42"
                   />
                    </div>
                  </div>
                </div>
              </div>
     `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// removed from previous date formatting homework
//let months = [
//  "Jan",
//"Feb",
//"Mar",
//"Apr",
//"May",
//"Jun",
//"Jul",
//"Aug",
//"Sep",
//"Oct",
//"Nov",
//"Dec",
//];

//let currentMonth = months[date.getMonth()];

//let formattedDateTime = `${currentDay} ${currentDate} ${currentMonth} ${currentHour}:${currentMin}`;
//headingDayTime.innerHTML = `${formattedDateTime}`;

//return formattedDateTime;
//}
