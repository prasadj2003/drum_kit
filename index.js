var recordedTune = [];
var noOfDrums = document.querySelectorAll(".drum").length;

// Event listeners to record tune
for (var i = 0; i < noOfDrums; i++) {
  document.querySelectorAll(".drum")[i].addEventListener("click", function() {
    var buttoninnerHTML = this.innerHTML;
    recordedTune.push(buttoninnerHTML);  // Record the key
    makeSound(buttoninnerHTML);
    buttonAnimation(buttoninnerHTML);
  });
}

function makeSound(key) {
  switch (key) {
    case "w":
      var tom1 = new Audio('sounds/tom-1.mp3');
      tom1.play();
      break;
    case "a":
      var tom2 = new Audio('sounds/tom-2.mp3');
      tom2.play();
      break;
    case "s":
      var tom3 = new Audio('sounds/tom-3.mp3');
      tom3.play();
      break;
    case "d":
      var tom4 = new Audio('sounds/tom-4.mp3');
      tom4.play();
      break;
    case "j":
      var snare = new Audio('sounds/snare.mp3');
      snare.play();
      break;
    case "k":
      var crash = new Audio('sounds/crash.mp3');
      crash.play();
      break;
    case "l":
      var kickbass = new Audio('sounds/kick-bass.mp3');
      kickbass.play();
      break;
    default:
      console.log("Unknown key: " + key);
  }
}


document.addEventListener("keydown", function(event) {
  recordedTune.push(event.key);  // Record the key
  makeSound(event.key);
  buttonAnimation(event.key);
});

// Save the recorded tune to the backend
function saveTune() {
  fetch("http://localhost:3000/save-tune", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ tune: recordedTune.join('') })
  }).then(response => {
    if (response.ok) {
      alert("Tune saved successfully!");
      fetchTunes();  // Refresh the tunes list
    } else {
      alert("Error saving tune.");
    }
  });
}

// Fetch saved tunes from the backend
console.log("Fetching tunes..."); // To check if this is triggered
fetch("http://localhost:3000/get-tunes")
  .then(response => response.json())
  .then(data => {
    console.log("Fetched tunes:", data); // Log the fetched tunes
    displayTunes(data);
  })
  .catch(error => {
    console.error("Error fetching tunes:", error);
    alert("Failed to fetch tunes.");
  });

// Display the tunes with Play button
// ---------------------------------------This work------------------------------------
function displayTunes(tunes) {
  const tunesList = document.getElementById("tunesList");
  tunesList.innerHTML = "";  // Clear previous tunes

  tunes.forEach(tune => {
    const tuneItem = document.createElement("div");
    tuneItem.classList.add("tune-item");
    tuneItem.innerHTML = `
      <p>Tune ID: ${tune.id}</p>
      <button onclick="playTune('${tune.tune}')">Play</button>
    `;
    tunesList.appendChild(tuneItem);
  });
}
// --------------------------------------------------------------------------------




// Play a recorded tune
// --------------------------------this works---------------------------------------
function playTune(tune) {
  let i = 0;
  const interval = setInterval(() => {
    if (i < tune.length) {
      makeSound(tune[i]); // Call makeSound with the current character
      buttonAnimation(tune[i]);
      i++;
    } else {
      clearInterval(interval); // Clear the interval when done
    }
  }, 500); // Adjust the interval as needed (500 ms between sounds)
}
// ---------------------------------------------------------------------------------

// Play a recorded tune by fetching from the API



// Add Save Tune button
var saveButton = document.createElement("button");
saveButton.innerHTML = "Save Tune";
saveButton.addEventListener("click", saveTune);
document.body.appendChild(saveButton);

// Add a section to display and play saved tunes
// var tunesList = document.createElement("div");
// tunesList.id = "tunesList";
// document.body.appendChild(tunesList);

// // Fetch the tunes on page load
// fetchTunes();

// JavaScript for toggle functionality
const toggleTunesButton = document.getElementById("toggleTunesButton");
const tunesList = document.getElementById("tunesList");

// Add event listener to toggle button
toggleTunesButton.addEventListener("click", function() {
  // Toggle visibility of the tunes list
  if (tunesList.style.display === "none") {
    tunesList.style.display = "block"; // Show the tunes list
    toggleTunesButton.innerText = "Hide Tunes"; // Update button text
  } else {
    tunesList.style.display = "none"; // Hide the tunes list
    toggleTunesButton.innerText = "Show Tunes"; // Update button text
  }
});

// Fetch the tunes on page load
fetchTunes();


