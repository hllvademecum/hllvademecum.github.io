if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}

function showPage(pageNumber) {
  document.getElementById('page1').style.display = (pageNumber === 1) ? 'block' : 'none';
  document.getElementById('page2').style.display = (pageNumber === 2) ? 'block' : 'none';
}

var resetInputDistance = true;

document.getElementById("inputDistance").addEventListener("blur", function() {
  calculate();
});

document.getElementById("factionSelect").addEventListener("change", function() {
  if (document.getElementById("inputDistance").value) {
    calculate();
  }
});

function updateInput(num) {
  if (resetInputDistance) {
    document.getElementById("inputDistance").value = "";
    resetInputDistance = false;
  }
  var inputField = document.getElementById("inputDistance");
  inputField.value += num;
  toggleButtons(); // Toggle buttons based on resetInputDistance
  }

function clearLastInput() {
  var inputField = document.getElementById("inputDistance");
  var value = inputField.value;
  
  if (value.length > 0 && !resetInputDistance) {
    // Remove the last character from the value
    var newValue = value.substring(0, value.length - 1);
    inputField.value = newValue;
  } 
  if (newValue.length == 0) {
    resetInputDistance = true;
    toggleButtons(); // Toggle buttons based on resetInputDistance
  }
}

function calculate() {
  resetInputDistance = true; // Set to true before executing calculate
  toggleButtons(); // Toggle buttons based on resetInputDistance
  var faction = document.getElementById("factionSelect").value;
  var x = parseInt(document.getElementById("inputDistance").value);
  var m, b;

  if (isNaN(x) || x < 100 || x > 1600) {
    document.getElementById("error").innerHTML = "Error: Distance must be between 100 and 1600 M.";
    document.getElementById("inputDistance").value = ""; // Reset inputDistance value
    return;
  } else {
    document.getElementById("error").innerHTML = "";
  }

  switch(faction) {
    case "soviet":
      m = -0.2136691176;
      b = 1141.7215;
      break;
    case "german":
      m = -0.237035714285714;
      b = 1001.46547619048;
      break;
    case "britain":
      m = -0.1773;
      b = 550.69;
      break;
    default:
      alert("Invalid faction selected!");
    return;
  }

  var result = m * x + b;
  result = Math.round(result);
  document.getElementById("inputDistance").value = x + " M | " + result +" MIL";
}

function toggleButtons() {
  var button0 = document.getElementById("button0");
  var button00 = document.getElementById("button00");
  button0.disabled = resetInputDistance;
  button00.disabled = resetInputDistance;
}