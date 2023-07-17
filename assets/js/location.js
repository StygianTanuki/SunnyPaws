var googleApi = "AIzaSyAiKNEaOOEcNyMz_CmFsiM5pH9EtvAK5uk";
var weatherApi = "cf9803c3b377a9b6c5550c2755ccbd51"
var searchBtn = document.getElementById("");
var currentWeather = document.getElementById("");

function search() {
    var content = searchCity.value;
    console.log(content);
}


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

function initMap() {
  // Create a new map instance
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.7128, lng: -74.0060 }, // Coordinates for the map center (New York City)
    zoom: 12, // Initial zoom level
  });
}

// ^ Google Maps JS ^

if (JSON.parse(localStorage.getItem("enteredCity")) == -1){
  form.style.display = "none";
}