var googleApi = "AIzaSyAiKNEaOOEcNyMz_CmFsiM5pH9EtvAK5uk";
var weatherApi = "cf9803c3b377a9b6c5550c2755ccbd51";
var searchBtn = document.getElementById("");
var currentWeather = document.getElementById("");
var citySearch = document.querySelector("#citySearch");
var submitButton = document.querySelector("#submitButton");
var apiKey = "f3ff5901402986dd4ec3b605204bfe0c";

function search() {
  var content = citySearch.value;
}

async function getCoordinates(param) {

  var apiUrl =
    `https://api.openweathermap.org/data/2.5/weather?q=` +
    param +
    `&limit=5&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  
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

// async function fiveDay(lon, lat) {
//   var apiFiveDay = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

//   await fetch(apiFiveDay)
//     .then(function (Response) {
//       return Response.json();
//     })
//     .then(function (data) {
//       // this will clear the existing forecast
//       document.getElementById("forecast").innerHTML = "Five Day Forecast:";

//       for (var i = 3; i < data.list.length; i += 8) {
//         var icon = `https://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`;

//         document.getElementById(
//           "forecast"
//         ).innerHTML += `<div class = "card col-2">
//         <img src=${icon} class = "iconClass"></img>
//         <div>Tempature: ${data.list[i].main.temp}</div>
//         <div>Humidty: ${data.list[i].main.humidity}</div>
//         <div>Wind Speed: ${data.list[i].wind.speed} mph</div>
//         </div>`;
//       }
//     });
// }

submitButton.addEventListener("click", function () {
  console.log("click");
  getCoordinates(citySearch.value);
  localStorage.setItem("searchCity", JSON.stringify(citySearch));
});

// v Google Maps JS integration v

// document.querySelector("#location") function() {
//   $("#submitButton").on("click", function() {
//     // Get the user input from the input field
//     var userInput = $("#searchCity").val();

//     // Convert spaces in the user input to plus signs (+) as required by the Google Maps API
//     var query = userInput.replace(/\s+/g, "+");

//     // Construct the new URL with the updated location query
//     var newSrc = "https://www.google.com/maps/embed/v1/place?key=AIzaSyAiKNEaOOEcNyMz_CmFsiM5pH9EtvAK5uk&q=" + query;

//     // Update the src attribute of the iframe
//     $("#mapFrame").attr("src", newSrc);
//   });
// };

function mapDisplay() {
  submitButton.on("click", function () {
    // Get the user input from the input field
    var userInput = $("#searchCity").val();

    // Convert spaces in the user input to plus signs (+) as required by the Google Maps API
    var query = userInput.replace(/\s+/g, "+");

    // Construct the new URL with the updated location query
    var newSrc =
      "https://www.google.com/maps/embed/v1/place?key=AIzaSyAiKNEaOOEcNyMz_CmFsiM5pH9EtvAK5uk&q=" +
      query;

    // Update the src attribute of the iframe
    $("#mapFrame").attr("src", newSrc);

    mapDisplay();
  });
}
