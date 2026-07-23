// Session durations (seconds)
const WORK_TIME = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;

// Current timer state
let currentSession = "Work";
let completedWorkSessions = 0;

let timeLeft = WORK_TIME;

let timer = null;
let isRunning = false;

// HTML Elements
const timeDisplay = document.getElementById("time");
const sessionDisplay = document.getElementById("session-type");
const completedDisplay = document.getElementById("completed-sessions");

const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resumeBtn = document.getElementById("resume-btn");
const resetBtn = document.getElementById("reset-btn");

updateDisplay();

startBtn.addEventListener("click", startTimer);

pauseBtn.addEventListener("click", () => {
    clearInterval(timer);
    isRunning = false;
});

resumeBtn.addEventListener("click", () => {
    if (!isRunning) startTimer();
});

resetBtn.addEventListener("click", resetPomodoro);

function startTimer() {

    if (isRunning) return;

    isRunning = true;

    timer = setInterval(() => {

        timeLeft--;

        updateDisplay();

        if (timeLeft <= 0) {

            clearInterval(timer);

            isRunning = false;

            nextSession();

        }

    }, 1000);

}

function nextSession() {

    if (currentSession === "Work") {

        completedWorkSessions++;

        completedDisplay.textContent = completedWorkSessions;

        if (completedWorkSessions % 4 === 0) {

            currentSession = "Long Break";
            timeLeft = LONG_BREAK;

        } else {

            currentSession = "Short Break";
            timeLeft = SHORT_BREAK;

        }

    } else {

        currentSession = "Work";
        timeLeft = WORK_TIME;

    }

    sessionDisplay.textContent = currentSession;

    updateDisplay();

    alert(currentSession + " started!");

}

function resetPomodoro() {

    clearInterval(timer);

    isRunning = false;

    currentSession = "Work";

    completedWorkSessions = 0;

    timeLeft = WORK_TIME;

    sessionDisplay.textContent = currentSession;

    completedDisplay.textContent = completedWorkSessions;

    updateDisplay();

}

function updateDisplay() {

    const minutes = Math.floor(timeLeft / 60);

    const seconds = timeLeft % 60;

    timeDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}