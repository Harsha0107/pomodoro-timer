// Timer settings
let workTime = 25 * 60; // 25 minutes in seconds
let timeLeft = workTime;

let timer = null;
let isRunning = false;

// Get HTML elements
const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("start-btn");

// Display the initial time
updateDisplay();

// Start button
startBtn.addEventListener("click", () => {

    if (isRunning) return;

    isRunning = true;

    timer = setInterval(() => {

        timeLeft--;

        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            isRunning = false;
            alert("Work session completed!");
        }

    }, 1000);

});

// Function to update the timer text
function updateDisplay() {

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timeDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}