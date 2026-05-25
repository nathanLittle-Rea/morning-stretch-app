# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the App

```bash
python3 app.py
```

The server starts on port 5001 and auto-opens `http://localhost:5001` in the browser. To change the port, edit `app.py`.

**First run** — install dependencies manually if needed:
```bash
pip install Flask==2.3.2 Flask-CORS==4.0.0 Werkzeug==2.3.6
```

## Architecture

This is a local desktop app: a Flask backend serves a single-page frontend with no build step.

**Backend (`app.py`)** — Flask server with these REST endpoints:
- `GET /` — serves `static/index.html`
- `GET /api/stats` — session counts, streak, weekly/monthly breakdowns
- `POST /api/session/start` — starts a session (currently stateless; returns a timestamp ID)
- `POST /api/session/complete` — persists a completed session; recalculates streak
- `POST /api/session/record` — records an individual exercise (currently no-op beyond echo)
- `GET/POST /api/preferences` — sound and notification toggles
- `GET /api/health` — version check

Persistence is a single flat JSON file (`stretch_data.json`) in the app root. The schema holds a `sessions` array, `total_sessions`, `streak`, `last_session_date`, and `preferences`.

**Frontend (`static/`)** — vanilla JS, no framework, no bundler:
- `app.js` — a single `app` object with all state and UI logic. The `exercises` array at the top is the source of truth for routine content and timing.
- `index.html` — all markup; modals (`settingsModal`, `successModal`) are hidden by default and shown via `display: flex`.
- `styles.css` — CSS custom properties used for theming; dark mode via `@media (prefers-color-scheme: dark)`.

The timer is a `tick()` `setTimeout` chain driven by `state.exerciseTimeLeft` (per-exercise countdown) and `state.transitionTimeLeft` (10s between exercises), toggled by `state.inTransition`. When an exercise timer hits zero, the next exercise starts automatically after the transition. `state.sessionStartTime` is a `Date.now()` timestamp used to compute the session elapsed display independently of the tick chain. The breathing animation runs via `setInterval` stored in `this._breathingInterval`; it is cleared on pause, reset, and before each new animation starts to prevent stacking.
