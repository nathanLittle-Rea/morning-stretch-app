#!/usr/bin/env python3
"""
Morning Stretch — macOS menu bar app.
Manages the Flask server process from the menu bar.
"""

import rumps
import subprocess
import webbrowser
import os
import signal

APP_URL = 'http://localhost:5001'
APP_DIR = os.path.dirname(os.path.abspath(__file__))


class MorningStretchApp(rumps.App):
    def __init__(self):
        super().__init__('☀️', quit_button=None)
        self.menu = [
            rumps.MenuItem('Start Server', callback=self.start_server),
            rumps.MenuItem('Stop Server', callback=self.stop_server),
            rumps.MenuItem('Open in Browser', callback=self.open_browser),
            None,  # separator
            rumps.MenuItem('Quit', callback=self.quit_app),
        ]
        self._server_process = None
        self._update_title()

    def _update_title(self):
        self.title = '☀️●' if self._is_running() else '☀️'

    def _is_running(self):
        try:
            result = subprocess.run(
                ['lsof', '-ti', ':5001'],
                capture_output=True, text=True
            )
            return bool(result.stdout.strip())
        except Exception:
            return False

    def start_server(self, _):
        if self._is_running():
            rumps.notification('Morning Stretch', '', 'Server is already running.')
            return
        self._server_process = subprocess.Popen(
            ['python3', 'app.py'],
            cwd=APP_DIR,
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
        )
        import threading
        def open_after_start():
            import time
            time.sleep(2)
            webbrowser.open(APP_URL)
            self._update_title()
        threading.Thread(target=open_after_start, daemon=True).start()
        rumps.notification('Morning Stretch', '', 'Server started.')

    def stop_server(self, _):
        if not self._is_running():
            rumps.notification('Morning Stretch', '', 'Server is not running.')
            return
        try:
            result = subprocess.run(
                ['lsof', '-ti', ':5001'],
                capture_output=True, text=True
            )
            pids = result.stdout.strip().split()
            for pid in pids:
                os.kill(int(pid), signal.SIGTERM)
        except Exception:
            pass
        self._server_process = None
        self._update_title()
        rumps.notification('Morning Stretch', '', 'Server stopped.')

    def open_browser(self, _):
        if not self._is_running():
            rumps.notification('Morning Stretch', '', 'Server is not running. Start it first.')
            return
        webbrowser.open(APP_URL)

    def quit_app(self, _):
        if self._is_running():
            self.stop_server(None)
        rumps.quit_application()


if __name__ == '__main__':
    MorningStretchApp().run()
