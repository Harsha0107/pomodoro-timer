# Pomodoro Timer

A polished, browser-based Pomodoro timer built with plain HTML, CSS, and JavaScript. It helps you stay focused by cycling through work sessions and short or long breaks with a clean, modern interface.

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
2. Click Start to begin a focused work session.
3. Use Pause or Reset whenever needed.
4. Adjust the session durations in the settings section to fit your preferred workflow.
5. After each work session, the app automatically switches to the next break session.

## Project Structure

- index.html: Main page structure
- style.css: Styling, layout, and responsive design
- script.js: Timer logic, session transitions, settings, and sound playback
- sounds/bell.mp3: Audio file played at session completion

## Customization

You can change the default timer values directly in the app using the settings form, or update the default values in the JavaScript file if you want a permanent change.

## Running Locally

You can open index.html directly in a browser, or serve the folder with a simple local server.

Example:

```bash
python3 -m http.server 8000
```

Then visit http://127.0.0.1:8000/ in your browser.

## Notes

The timer uses the browser’s audio playback support, so the bell sound may require one initial interaction before it plays automatically.

## Purpose

This project is a simple productivity tool for practicing focused work intervals and managing breaks effectively.
