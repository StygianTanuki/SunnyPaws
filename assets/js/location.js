var googleApi = "AIzaSyAiKNEaOOEcNyMz_CmFsiM5pH9EtvAK5uk";
var weatherApi = "cf9803c3b377a9b6c5550c2755ccbd51";
var searchBtn = document.getElementById("");
var currentWeather = document.getElementById("");
var citySearch = document.querySelector("#citySearch");
var apiKey = "f3ff5901402986dd4ec3b605204bfe0c";

function search() {
  var content = citySearch.value;
}

const getWeather = (city) => {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  fetch(weatherUrl)
    .then((response) => response.json())
    .then((data) => {
      var icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      const weatherInfo = `
        <img src=${icon}></img>
        <div>Weather in ${data.name}:</div>
        <div>Temperature: ${data.main.temp}°F</div>
        <div>Description: ${data.weather[0].description}</div>
        <div>Humidity: ${data.main.humidity}%</div>
        <div>Wind Speed: ${data.wind.speed} mph</div>
      `;

      document.getElementById("weatherInfo").innerHTML = weatherInfo;
    })
    .catch((err) => console.log(err));
};
var getLocalStorageItem = localStorage.getItem("enteredCity");

$(window).on("load", function () {
  getCoordinates(getLocalStorageItem);
  getWeather(getLocalStorageItem);
  x();
});

$("#submitButton").on("click", function () {
  getCoordinates($("#searchCity").val());
  getWeather($("#searchCity").val());
  y();
});

function x() {
  // Get the user input from the input field
  // var userInput = $("#searchCity").val();

  var query = getLocalStorageItem + " dog parks";

  // Convert spaces in the user input to plus signs (+) as required by the Google Maps API
  // var query = userInput.replace(/\s+/g, "+");

  // Construct the new URL with the updated location query
  var newSrc =
    "https://www.google.com/maps/embed/v1/place?key=AIzaSyAiKNEaOOEcNyMz_CmFsiM5pH9EtvAK5uk&q=" +
    query;

  // Update the src attribute of the iframe
  $("#mapFrame").attr("src", newSrc);
  // getWeather(userInput);
  // getCoordinates(userInput);
}

function getCoordinates(city) {
  fetch(
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&appid=" +
      apiKey
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var lat = data[0].lat;
      var long = data[0].lon;
      getTrails(lat, long);
    });
}

function y() {
  // Get the user input from the input field
  var query = $("#searchCity").val() + " dog parks";

  // Convert spaces in the user input to plus signs (+) as required by the Google Maps API
  // Construct the new URL with the updated location query
  var newSrc =
    "https://www.google.com/maps/embed/v1/place?key=AIzaSyAiKNEaOOEcNyMz_CmFsiM5pH9EtvAK5uk&q=" +
    query;

  // Update the src attribute of the iframe
  $("#mapFrame").attr("src", newSrc);
}

function getCoordinates(city) {
  fetch(
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&appid=" +
      apiKey
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      var lat = data[0].lat;
      var long = data[0].lon;
      getTrails(lat, long);
    });
}

const getTrails = (lat, long) => {
  let url =
    "https://floating-headland-95050.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
    lat +
    "," +
    long +
    "&radius=50000&type=dog&keyword=park&key=AIzaSyAiKNEaOOEcNyMz_CmFsiM5pH9EtvAK5uk";

  fetch(url, {
    method: "GET",
    dataType: "jsonp",
    headers: {},
  })
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("dogParks").innerHTML = "";

      data.results.forEach((place) => {
        document.getElementById(
          "dogParks"
        ).innerHTML += `<div class = "card col-2">
<div>${place.name}</div>
<div>Rating: ${place.rating}⭐</div>
<div>Address: ${place.vicinity}</div>

</div>`;
      });
    })
    .catch((err) => console.log(err));
};
