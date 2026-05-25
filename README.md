# Morning Stretch App

A full-featured desktop application for a 10-minute anti-aging stretching routine with guided breathing, progress tracking, and stats.

## Features

- **10-minute guided routine** with 8 carefully sequenced stretches
- **Animated breathing guide** with visual circle that pulses with your breath
- **Real-time timer** with exercise tracking
- **Progress tracking** - streak counter, total sessions, weekly/monthly stats
- **Dark mode support** - automatically adapts to your system preferences
- **Breathing exercises** - box breathing (parasympathetic) and energizing breath (sympathetic)
- **Energy tips** - science-backed post-routine actions to maximize benefits
- **Desktop app** - runs entirely on your computer, no internet required
- **Sound notifications** - optional audio cue when you complete the routine

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
2. The timer counts down from 10:00
3. Each exercise is displayed in the list; click to see full instructions
4. **For breathing exercises**: Follow the animated circle—it expands as you inhale, contracts as you exhale

### During Your Routine

- **Pause**: Click Pause to take a break; press Start to resume
- **Skip**: Move to the next exercise without waiting for the timer
- **Reset**: Start over from the beginning

### After Your Session

- A success popup shows your new streak and total sessions
- Your progress is saved automatically
- Stats update in real-time

### Tabs

- **Routine**: View all 8 exercises with descriptions
- **Energy Tips**: Science-backed actions to boost energy (hydration, cold water, sunlight, etc.)
- **History**: Track your completed sessions (coming soon)

### Settings

Click the gear icon (⚙) to:
- Enable/disable sound notifications
- Enable/disable desktop notifications
- View app version

## The 10-Minute Routine

1. **Box breathing** (1 min) - Calm your nervous system
2. **Neck rolls & shoulder shrugs** (1 min) - Release tension
3. **Cat-cow stretch** (1.5 min) - Mobilize your spine
4. **Child's pose** (1 min) - Relax and decompress
5. **Standing forward fold** (1 min) - Boost brain circulation
6. **Quad & hip flexor stretch** (1.5 min) - Release compression
7. **Spinal twist** (1 min) - Detoxify and release tension
8. **Energizing breath** (1 min) - Activate alertness

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
