# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running the App

```bash
python3 app.py
```

The server starts on port 5000 and auto-opens `http://localhost:5000` in the browser. To change the port, edit `app.py` line 156.

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

The timer is a single `tick()` `setTimeout` chain that counts down `state.timeLeft` (starts at 600s). Exercise advancement is not timer-driven — the user skips manually or the session ends when the global timer hits zero. The breathing animation runs independently via `setInterval` in `animateBreathing()` and self-terminates when `state.isRunning` is false.
