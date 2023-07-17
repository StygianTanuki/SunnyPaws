

// This part of the code is to allow the homepage to switch to
// the location.html. Working on getting the city to 
// save when switching to the next page.
document.addEventListener("DOMContentLoaded", function() {
    var wuffEl = document.getElementById("buttonWuff");
    wuffEl.addEventListener("click", function() {
        // localStorage.setItem("enteredCity")
        window.location.href = "location.html";
    });
});
