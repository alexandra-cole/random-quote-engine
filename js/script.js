/**
 * Full-Stack Fetch Sandbox Core Script
 */

// --- GLOBAL DEVELOPMENT SETTINGS ---
// Modes available: "console" (quiet logging) or "screen" (renders error box in UI)
const ERROR_MODE = "screen"; 

/*
document.getElementById("fetchData").addEventListener("click", () => {
  
  // Clear out any stale errors from a previous click attempt
  clearDisplayErrors();

  fetch("server.php")
    .then((res) => {
      // CRITICAL: Fetch promises do NOT reject on HTTP errors (like 404 or 500).
      // We must explicitly evaluate the response status flag.
      if (!res.ok) {
        throw new Error(`HTTP Error Status: ${res.status} (${res.statusText || 'Unknown State'})`);
      }
      return res.text();
    })
    .then((data) => {
      // Route the raw payload safely into our UI container
      document.getElementById("result").innerHTML = data;
    })
    .catch((err) => {
      // Handle missing files, network dropout, or Backend failures
      handleRoutingError(err);
    });
});
*/

// Select button
const button = document.getElementById("fetchData");

// Typography related
const FONTS = ["Qwitcher Grypen", "Tulpen One", "Shadows Into Light"];
let fontIndex = 0;

// Automation 
// const SERVER = "server.php";
const SERVER = "https://newmanix.com/classes/it102/random_quotes.php";
getQuote(SERVER);
setInterval( () => getQuote(SERVER), 3000);

// Attach event listener
button.addEventListener("click", () => getQuote(SERVER));

/**
 *  Standalone function to send a request to server
 *  including: displayQuote, rotateFonts
 */
function getQuote(server) {
  fetch(server)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP Error Status: ${res.status} (${res.statusText || 'Unknown State'})`);
      }
      return res.text();
    })
    .then((data) => {

      // Animation
      displayQuote(data);
      
      // Change font
      changeFonts(fontIndex);

      // Increment fontIndex
      if (fontIndex < FONTS.length - 1) {
        fontIndex++;
      }
    })
    .catch((err) => {
      alert("Error: " + err);
    })
}

/**
 * Display quotes nicely with animation
 */
function displayQuote(data) {
  const result = document.getElementById("result");
  result.classList.remove("fade-in");
  void result.offsetWidth;    // <-- REFLOW
  result.textContent = data;
  result.classList.add("fade-in");
}

/**
 * Rotate fonts
 */
function changeFonts(fontIndex) {
  const result = document.getElementById("result");
    result.style.fontFamily = FONTS[fontIndex];
}

/**
 * Dispatches errors to the chosen target based on configuration
 */
function handleRoutingError(error) {
  const errorMessage = `⚠️ FETCH FAILURE DETAILS:\n-------------------------\nMessage: ${error.message}\nType: ${error.name}`;
  
  if (ERROR_MODE === "screen") {
    const errorBox = document.getElementById("error-display");
    errorBox.textContent = errorMessage;
    errorBox.style.display = "block";
  } else {
    console.error("❌ AJAX Routing Error:", error);
  }
}

/**
 * Resets the visual layout state before firing a clean request
 */
function clearDisplayErrors() {
  const errorBox = document.getElementById("error-display");
  errorBox.textContent = "";
  errorBox.style.display = "none";
}