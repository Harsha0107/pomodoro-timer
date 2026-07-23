const STORAGE_KEY = "pomodoro-settings-v1";

const defaultSettings = {
    work: 25,
    shortBreak: 5,
    longBreak: 15
};

let settings = loadSettings();
let currentSession = "Work";
let completedWorkSessions = 0;
let timeLeft = settings.work * 60;
let timer = null;
let isRunning = false;

const timeDisplay = document.getElementById("time");
const sessionDisplay = document.getElementById("session-type");
const completedDisplay = document.getElementById("completed-sessions");
const statusDisplay = document.getElementById("status-message");
const progressRing = document.getElementById("progress-ring");

const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const skipBtn = document.getElementById("skip-btn");
const applySettingsBtn = document.getElementById("apply-settings-btn");

const workInput = document.getElementById("work-input");
const shortBreakInput = document.getElementById("short-break-input");
const longBreakInput = document.getElementById("long-break-input");

updateSettingsInputs();
updateDisplay();
updateButtons();

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetPomodoro);
skipBtn.addEventListener("click", () => nextSession(false));
applySettingsBtn.addEventListener("click", applySettings);

function loadSettings() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? { ...defaultSettings, ...JSON.parse(saved) } : { ...defaultSettings };
    } catch (error) {
        console.warn("Could not load Pomodoro settings", error);
        return { ...defaultSettings };
    }
}

function saveSettings() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

function updateSettingsInputs() {
    workInput.value = settings.work;
    shortBreakInput.value = settings.shortBreak;
    longBreakInput.value = settings.longBreak;
}

function getSessionDurationSeconds(sessionName) {
    if (sessionName === "Work") return settings.work * 60;
    if (sessionName === "Short Break") return settings.shortBreak * 60;
    return settings.longBreak * 60;
}

function startTimer() {
    if (isRunning) return;

    isRunning = true;
    timer = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            isRunning = false;
            nextSession(true);
        }
    }, 1000);

    updateButtons();
    statusDisplay.textContent = `${currentSession} session in progress.`;
}

function pauseTimer() {
    if (!isRunning) return;

    clearInterval(timer);
    isRunning = false;
    updateButtons();
    statusDisplay.textContent = `${currentSession} paused.`;
}

function nextSession(autoStart = true) {
    if (currentSession === "Work") {
        completedWorkSessions += 1;
        completedDisplay.textContent = completedWorkSessions;

        if (completedWorkSessions % 4 === 0) {
            currentSession = "Long Break";
        } else {
            currentSession = "Short Break";
        }
    } else {
        currentSession = "Work";
    }

    timeLeft = getSessionDurationSeconds(currentSession);
    updateDisplay();
    playNotificationTone();

    if (typeof Notification !== "undefined" && Notification.permission === "granted") {
        new Notification(`${currentSession} started`);
    }

    statusDisplay.textContent = `${currentSession} started.`;
    updateButtons();

    if (autoStart) {
        startTimer();
    }
}

function resetPomodoro() {
    clearInterval(timer);
    isRunning = false;
    currentSession = "Work";
    completedWorkSessions = 0;
    timeLeft = settings.work * 60;
    completedDisplay.textContent = completedWorkSessions;
    updateDisplay();
    updateButtons();
    statusDisplay.textContent = "Ready to focus.";
}

function applySettings() {
    const work = Math.max(1, parseInt(workInput.value, 10) || defaultSettings.work);
    const shortBreak = Math.max(1, parseInt(shortBreakInput.value, 10) || defaultSettings.shortBreak);
    const longBreak = Math.max(1, parseInt(longBreakInput.value, 10) || defaultSettings.longBreak);

    settings = { work, shortBreak, longBreak };
    saveSettings();
    updateSettingsInputs();

    if (!isRunning) {
        timeLeft = getSessionDurationSeconds(currentSession);
        updateDisplay();
        statusDisplay.textContent = "Settings updated.";
    }
}

function updateButtons() {
    startBtn.disabled = isRunning;
    pauseBtn.disabled = !isRunning;
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timeDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    sessionDisplay.textContent = currentSession;
    completedDisplay.textContent = completedWorkSessions;
    document.body.dataset.session = currentSession.toLowerCase().replace(/\s+/g, "-");

    const totalSeconds = getSessionDurationSeconds(currentSession);
    const progress = totalSeconds === 0 ? 0 : Math.max(0, 1 - timeLeft / totalSeconds);
    progressRing.style.setProperty("--progress", `${Math.round(progress * 100)}%`);
}

function playNotificationTone() {
    if (typeof window === "undefined") return;

    const bell = new Audio("sounds/bell.mp3");
    bell.volume = 0.8;
    bell.currentTime = 0;

    bell.play().catch(() => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.type = "triangle";
        oscillator.frequency.value = 880;
        gainNode.gain.value = 0.08;

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);
        oscillator.stop(ctx.currentTime + 0.5);
        ctx.close();
    });
}

if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission().catch(() => {});
}