var googleApi = "AIzaSyAiKNEaOOEcNyMz_CmFsiM5pH9EtvAK5uk";
var weatherApi = "cf9803c3b377a9b6c5550c2755ccbd51";
var searchBtn = document.getElementById("");
var currentWeather = document.getElementById("");
// let cityArray = [];
// Input
var citySearch = document.querySelector("#citySearch");
// button
var submitButton = document.querySelector("#submitButton");
console.log(document.querySelector("#submitButton"));
// api Key
var apiKey = "f3ff5901402986dd4ec3b605204bfe0c";

function search() {
  var content = citySearch.value;
  console.log(content);
}

async function getCoordinates(param) {
  // DONT FORGET TO ADD HTTPS WHEN DEPLOYING
  var apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${param}&limit=5&appid=${apiKey}&units=imperial`;
  await fetch(apiUrl)
    .then(function (Response) {
      return Response.json();
    })
    .then(function (data) {
      var currentTemp = document.querySelector("#currentTemp");
      var icon = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;

      currentTemp.innerHTML = `<h2>${data.name} <br>Current Forecast:</h2><img src=${icon}></img><div>Tempature: ${data.main.temp}</div><div>Humidty: ${data.main.humidity}</div><div>Wind Speed: ${data.wind.speed} mph</div>`;

      fiveDay(data.coord.lon, data.coord.lat);
      citySave(data.name);
    });
}

async function fiveDay(lon, lat) {
  var apiFiveDay = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

  await fetch(apiFiveDay)
    .then(function (Response) {
      return Response.json();
    })
    .then(function (data) {
      // this will clear the existing forecast
      document.getElementById("forecast").innerHTML = "Five Day Forecast:";

      for (var i = 3; i < data.list.length; i += 8) {
        var icon = `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;

        document.getElementById(
          "forecast"
        ).innerHTML += `<div class = "card col-2">
        <img src=${icon} class = "iconClass"></img>
        <div>Tempature: ${data.list[i].main.temp}</div>
        <div>Humidty: ${data.list[i].main.humidity}</div>
        <div>Wind Speed: ${data.list[i].wind.speed} mph</div>
        </div>`;
      }
    });
}

submitButton.addEventListener("click", function () {
  console.log("click");
  getCoordinates(citySearch.value);
  localStorage.setItem("searchCity", JSON.stringify(citySearch));
});
// v Google Maps JS integration v
// Initialize and add the map
// let map;

// async function initMap() {
//   // The location of Orlando
//   const position = { lat: 28.538336, lng: -81.379234 };
//   // Request needed libraries.
//   //@ts-ignore
//   const { Map } = await google.maps.importLibrary("maps");
//   const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

//   // The map, centered at Orlando
//   map = new Map(document.getElementById("map"), {
//     zoom: 4,
//     center: position,
//     mapId: "DEMO_MAP_ID",
//   });

//   // The marker, positioned at Orlando
//   const marker = new AdvancedMarkerElement({
//     map: map,
//     position: position,
//     title: "Orlando",
//   });
// }

// initMap();

// function initMap() {
//   // Create a new map instance
//   const map = new google.maps.Map(document.getElementById("map"), {
//     center: { lat: 40.7128, lng: -74.0060 }, // Coordinates for the map center (New York City)
//     zoom: 12, // Initial zoom level
//   });
// }

// // Trying to get the string from the homepage to this page.
// if (JSON.parse(localStorage.getItem("enteredCity")) == -1) {
//   form.style.display = "none";
// }
