# Morning Stretch App

A guided morning stretching app with 11 physiotherapist-sequenced exercises, animated breathing guides, audio cues, and progress tracking.

## Features

- **11-exercise routine** (~14 min) sequenced floor → quadruped → standing for safe progressive loading
- **Auto-advancing exercises** — each exercise counts down its own timer with a 10-second transition break
- **Animated breathing guide** with visual circle and audio tones for box breathing and energizing breath
- **Gentle audio cues** — distinct tones for each breathing phase and exercise transitions
- **Progress tracking** — streak counter, total sessions, today/weekly stats
- **Dark mode** — automatically adapts to system preferences
- **Energy tips** — science-backed post-routine actions
- **Fully offline** — runs entirely on your computer, no internet required
- **Mobile-friendly** — accessible from any device on the same WiFi network

## System Requirements

- **Python 3.7+** - [Download here](https://www.python.org/downloads/)
- **Any modern browser** (Chrome, Safari, Firefox, Edge)
- **Windows, Mac, or Linux**

## Installation

### Step 1: Download the App

Extract the `morning-stretch-app` folder to your desired location (Desktop, Documents, etc.).

### Step 2: Install Python (if not already installed)

1. Go to https://www.python.org/downloads/
2. Download Python 3.11 or newer
3. Run the installer
4. **IMPORTANT on Windows**: Check "Add Python to PATH" during installation

### Step 3: Launch the App

**On Mac or Linux:**
```bash
cd morning-stretch-app
chmod +x launch.sh
./launch.sh
```

**On Windows:**
1. Navigate to the `morning-stretch-app` folder
2. Double-click `launch.bat`
3. The app will open in your default browser

The first time you launch, it may take 30-60 seconds to install dependencies. Subsequent launches are instant.

## Usage

### Starting a Session

1. Click the **Start** button to begin
2. Each exercise counts down its own timer automatically
3. A 10-second "Up next" transition break plays between exercises
4. **For breathing exercises**: Follow the animated circle and audio tones — they guide each inhale, hold, and exhale

### During Your Routine

- **Pause**: Click Pause to take a break; press Start to resume
- **Skip**: Move to the next exercise without waiting for the timer
- **Reset**: Start over from the beginning

### After Your Session

- A success popup shows your new streak and total sessions
- Your progress is saved automatically
- Stats update in real-time

### Tabs

- **Routine**: View all 11 exercises with descriptions
- **Energy Tips**: Science-backed actions to boost energy (hydration, cold water, sunlight, etc.)
- **History**: Track your completed sessions

### Settings

Click the gear icon (⚙) to:
- Enable/disable sound notifications
- Enable/disable desktop notifications
- View app version

## The Routine (~14 min)

Sequenced floor → quadruped → standing for safe progressive loading.

**Floor (supine)**
1. **Box breathing** (1 min) — Calm your nervous system
2. **Glute bridge** (1 min) — Reactivate glutes dormant after sleep
3. **Spinal twist** (1 min) — Release lumbar tension before standing

**Quadruped**
4. **Cat-cow stretch** (1.5 min) — Mobilize your spine
5. **Thread the needle** (1 min) — Thoracic (upper back) rotation
6. **Child's pose** (1 min) — Decompress and reset

**Seated → Standing**
7. **90/90 hip flow** (1.5 min) — Internal and external hip rotation
8. **Neck rolls & shoulder shrugs** (1 min) — Release neck and trap tension
9. **Standing forward fold** (1 min) — Boost brain circulation
10. **Quad & hip flexor stretch** (1.5 min) — Release hip compression
11. **Energizing breath** (1 min) — Activate alertness

## Troubleshooting

### "Python is not found" / "python is not recognized"

**Windows**: Python was installed but "Add to PATH" wasn't checked.
- Reinstall Python and make sure to check "Add Python to PATH"
- Or manually add Python to PATH: [Instructions](https://docs.python.org/3/using/windows.html)

**Mac/Linux**: Make sure you have Python 3 (not Python 2):
```bash
python3 --version
```

### App won't open in browser

1. Check that port 5001 is not in use by another application
2. The browser window should open automatically after 2 seconds
3. If not, manually visit `http://localhost:5001` in your browser

### "Module not found" error

The dependencies failed to install. Try manually:
```bash
pip install Flask==2.3.2 Flask-CORS==4.0.0 Werkzeug==2.3.6
```

### Data not saving

The app saves to `stretch_data.json` in the app folder. Make sure the folder is writable.

## Tips for Best Results

- **Do this every morning** before coffee for maximum benefits
- **Follow the breathing guides** - they're designed to activate your nervous system
- **Don't skip stretches** - each one targets different age-related stiffness
- **Be consistent** - notice changes within 3-5 days, major improvements within 2 weeks
- **Add cold water splash** after stretching to activate alertness
- **Get morning sunlight** for 5 minutes to regulate cortisol
- **Hydrate immediately** with 16-20 oz of water

## Data Privacy

All your data is stored **locally on your computer** in `stretch_data.json`. Nothing is sent to external servers. You have complete control over your data.

## FAQ

**Q: Can I run this on my phone?**
A: Not in the current version. It's designed for desktop. A mobile version is planned for future releases.

**Q: Does it work without internet?**
A: Yes! The app runs entirely offline. Internet is only used if you choose to update.

**Q: Where is my data stored?**
A: In `stretch_data.json` in the app folder. This is a regular text file you can open and edit.

**Q: Can I delete my data?**
A: Yes. Delete the `stretch_data.json` file or use the settings to reset.

**Q: Why port 5001?**
A: Port 5000 is used by macOS AirPlay Receiver. If 5001 is also taken, you can change it in `app.py`.

## Support & Feedback

For issues or suggestions, check the console output when launching the app. Error messages will help diagnose problems.

## Version

**Morning Stretch App v1.0.0**

Last updated: May 2026

---

Enjoy building your morning routine! 🌅
