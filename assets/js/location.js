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
    });
}

submitButton.addEventListener("click", function () {
  console.log("click");
  getCoordinates(searchCity.value);
  localStorage.setItem("searchCity", JSON.stringify(searchCity));
});

// v Google Maps JS integration v

$("#submitButton").on("click", function () {
  // Get the user input from the input field
  var userInput = $("#searchCity").val();

  var query = userInput + " dog parks";

  // Convert spaces in the user input to plus signs (+) as required by the Google Maps API
  var query = userInput.replace(/\s+/g, "+");

  // Construct the new URL with the updated location query
  var newSrc =
    "https://www.google.com/maps/embed/v1/place?key=AIzaSyAiKNEaOOEcNyMz_CmFsiM5pH9EtvAK5uk&q=" +
    query;

  // Update the src attribute of the iframe
  $("#mapFrame").attr("src", newSrc);
  getCoordinates(userInput);
});
function getCoordinates(city) {
  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
      city +
      "&appid=" +
      apiKey
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      var lat = data[0].lat;
      var long = data[0].lon;
      // console.log(lat,long);
      getTrails(lat, long);
    });
}

const getTrails = (lat, long) => {
  console.log("Getting Trails");
  console.log(lat, long);
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
      // console.log(data);
      //map over this data and create markers on the map

      data.results.forEach((place) => {
        console.log(place);
document.getElementById("dogParks").innerHTML += 
`<div class = "card col-2">
<div>Dog Park Name: ${place.name}</div>

</div>`;

      });
    })
    .catch((err) => console.log(err));
};
