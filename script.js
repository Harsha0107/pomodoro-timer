// --------------------
// Timer Variables
// --------------------
let workTime = 25 * 60;
let timeLeft = workTime;

let timer = null;
let isRunning = false;

// --------------------
// Get Elements
// --------------------
const timeDisplay = document.getElementById("time");

const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resumeBtn = document.getElementById("resume-btn");
const resetBtn = document.getElementById("reset-btn");

// Show initial timer
updateDisplay();

// --------------------
// Start
// --------------------
startBtn.addEventListener("click", startTimer);

// --------------------
// Pause
// --------------------
pauseBtn.addEventListener("click", () => {

    clearInterval(timer);

    isRunning = false;

});

// --------------------
// Resume
// --------------------
resumeBtn.addEventListener("click", () => {

    if (!isRunning) {
        startTimer();
    }

});

// --------------------
// Reset
// --------------------
resetBtn.addEventListener("click", () => {

    clearInterval(timer);

    isRunning = false;

    timeLeft = workTime;

    updateDisplay();

});

// --------------------
// Timer Function
// --------------------
function startTimer() {

    if (isRunning) return;

    isRunning = true;

    timer = setInterval(() => {

        timeLeft--;

        updateDisplay();

        if (timeLeft <= 0) {

            clearInterval(timer);

            isRunning = false;

            alert("Work Session Complete!");

        }

    }, 1000);

}

// --------------------
// Update Display
// --------------------
function updateDisplay() {

    const minutes = Math.floor(timeLeft / 60);

    const seconds = timeLeft % 60;

    timeDisplay.textContent =
        `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;

}