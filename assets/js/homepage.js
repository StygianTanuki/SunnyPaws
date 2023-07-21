document.addEventListener("DOMContentLoaded", function () {
  var wuffEl = document.getElementById("buttonWuff");
  wuffEl.addEventListener("click", function () {
    var enteredCity = document.querySelector("input[type='text']").value;
    localStorage.setItem("enteredCity", enteredCity);
    window.location.href = "location.html";
  });
});
