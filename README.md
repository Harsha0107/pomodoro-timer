# Pomodoro Timer

A polished, browser-based Pomodoro timer built with plain HTML, CSS, and JavaScript. It helps you stay focused by cycling through work sessions and breaks, with a modern interface and simple controls.

## Features

- Work, short break, and long break sessions
- Start, pause, reset, and skip controls
- Customizable session lengths for work, short break, and long break
- Session counter that tracks completed work rounds
- Visual countdown with a progress-style indicator
- Bell sound when a session finishes
- Settings saved in the browser using local storage

## How to Use

1. Open the project in a browser.
2. Click Start to begin a work session.
3. Use Pause or Reset whenever needed.
4. Adjust the session timings in the settings section to match your preferred workflow.
5. After each work session, the app automatically switches to a break session.

## Project Structure

- index.html: Main page structure
- style.css: Styling and responsive layout
- script.js: Timer logic, session transitions, settings, and sound playback
- sounds/bell.mp3: Audio file played at session completion

## Customization

You can change the default timer values by editing the settings form in the app or by modifying the default values in the JavaScript file.

## Running Locally

You can open index.html directly in a browser, or serve the folder with a simple local server if you prefer.

Example:

```bash
python3 -m http.server 8000
```

Then visit http://127.0.0.1:8000/ in your browser.

## Notes

The timer uses the browser’s audio playback support, so the bell sound may require one initial interaction before it plays automatically.
