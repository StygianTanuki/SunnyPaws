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

  // var hiker = "./images/hiker.png";

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

      //   new google.maps.Marker({
      //     position: place.geometry.location,
      //     map,
      //     // icon: hiker, //If you add a custom icon you can add that here
      //     title: place.name,
      //   });
      });
    })
    .catch((err) => console.log(err));
};

// $("#submitButton").on("click", function () {
//   // Get the user input from the input field
//   var userInput = $("#searchCity").val();

//   // Add "dog parks" to the user input to search specifically for dog parks
//   var query = userInput + " dog parks";

//   // Initialize the map
//   var map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: -34.397, lng: 150.644},
//     zoom: 14
//   });

//   // Create a Places service object to perform nearby search
//   var service = new google.maps.places.PlacesService(map);

//   // Perform the nearby search
//   service.nearbySearch({
//     location: map.getCenter(),
//     radius: 5000, // You can adjust the search radius as needed
//     keyword: 'dog park'
//   }, function(results, status) {
//     if (status === google.maps.places.PlacesServiceStatus.OK) {
//       // Clear existing markers on the map
//       clearMarkers();

//       // Display markers for each dog park in the search results
//       for (var i = 0; i < results.length; i++) {
//         createMarker(results[i]);
//       }
//     }
//   });
// });

// var markers = [];

// function createMarker(place) {
//   var marker = new google.maps.Marker({
//     map: map,
//     position: place.geometry.location,
//     title: place.name
//   });
//   markers.push(marker);
// }

// function clearMarkers() {
//   for (var i = 0; i < markers.length; i++) {
//     markers[i].setMap(null);
//   }
//   markers = [];
// }

// var map;
//   var service;
//   var markers = [];

//   function initialize() {
//     // Create the map centered at a specific location (e.g., New York City)
//     var center = new google.maps.LatLng(40.7128, -74.0060);
//     map = new google.maps.Map(document.getElementById('map'), {
//       center: center,
//       zoom: 14
//     });

//     // Create a Places service object to perform text search
//     service = new google.maps.places.PlacesService(map);
//   }

//   $("#submitButton").on("click", function () {
//     // Get the user input from the input field
//     var userInput = $("#searchCity").val();

//     // Perform a text search for "dog parks" near the location specified by the user
//     service.textSearch({
//       query: userInput + " dog parks",
//       radius: 5000 // You can adjust the search radius as needed
//     }, function (results, status) {
//       if (status === google.maps.places.PlacesServiceStatus.OK) {
//         // Clear existing markers on the map
//         clearMarkers();

//         // Display markers for each dog park in the search results
//         for (var i = 0; i < results.length; i++) {
//           createMarker(results[i]);
//         }
//       }
//     });
//   });

//   function createMarker(place) {
//     var marker = new google.maps.Marker({
//       map: map,
//       position: place.geometry.location,
//       title: place.name
//     });
//     markers.push(marker);
//   }

//   function clearMarkers() {
//     for (var i = 0; i < markers.length; i++) {
//       markers[i].setMap(null);
//     }
//     markers = [];
//   }

//   // Initialize the map
//   google.maps.event.addDomListener(window, 'load', initialize);
