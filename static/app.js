const API_BASE = 'http://localhost:5001/api';

const exercises = [
    {
        id: 1,
        name: 'Box breathing',
        time: 60,
        desc: 'Set your nervous system for success. Inhale for 4 counts, hold for 4, exhale for 4, hold for 4. This activates your parasympathetic response.',
        isBreathing: true
    },
    {
        id: 2,
        name: 'Neck rolls & shoulder shrugs',
        time: 60,
        desc: 'Slowly roll your head in a full circle (both directions). Combine with 5 slow shoulder shrugs. This releases tension held overnight.'
    },
    {
        id: 3,
        name: 'Cat-cow stretch',
        time: 90,
        desc: 'On hands and knees, alternate between arching your back (cow) and rounding it (cat). Move slowly with your breath. Repeat 10 times.'
    },
    {
        id: 4,
        name: "Child's pose",
        time: 60,
        desc: 'Sink your hips back to your heels, arms stretched forward. Breathe deeply. This gently lengthens your back and calms your nervous system.'
    },
    {
        id: 5,
        name: 'Standing forward fold',
        time: 60,
        desc: 'Stand and fold forward, letting your head hang heavy. Bend your knees generously. This boosts circulation to your brain.'
    },
    {
        id: 6,
        name: 'Quad & hip flexor stretch',
        time: 90,
        desc: 'Pull one foot toward your glute, hold 30 seconds each side. Then do a walking lunge on each leg. Do 5 per side.'
    },
    {
        id: 7,
        name: 'Spinal twist',
        time: 60,
        desc: 'Lying on your back, pull one knee to your chest then gently twist across your body. Hold 20-30 seconds per side.'
    },
    {
        id: 8,
        name: 'Energizing breath',
        time: 60,
        desc: 'Stand tall and do 20 rapid diaphragmatic breaths (belly breathing). This floods your system with oxygen and activates alertness.',
        isBreathing: true
    }
];

const app = {
    state: {
        isRunning: false,
        timeLeft: 600,
        currentExerciseIndex: -1,
        completedExercises: new Set(),
        totalSessions: 0,
        streak: 0,
        lastSession: null,
        sessionStartTime: null,
        preferences: {
            sound_enabled: true,
            notifications_enabled: true
        }
    },

    async init() {
        this.renderExercises();
        await this.loadStats();
        this.updateDisplay();
        this.loadPreferences();
    },

    async loadStats() {
        try {
            const response = await fetch(`${API_BASE}/stats`);
            const stats = await response.json();
            this.state.totalSessions = stats.total_sessions;
            this.state.streak = stats.streak;
            this.state.lastSession = stats.last_session;
            this.state.sessionsThisWeek = stats.sessions_this_week;
            this.state.sessionsToday = stats.sessions_today;
            this.updateStatsDisplay();
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    },

    async loadPreferences() {
        try {
            const response = await fetch(`${API_BASE}/preferences`);
            const prefs = await response.json();
            this.state.preferences = prefs;
            document.getElementById('soundToggle').checked = prefs.sound_enabled;
            document.getElementById('notifToggle').checked = prefs.notifications_enabled;
        } catch (error) {
            console.error('Error loading preferences:', error);
        }
    },

    async updatePreferences() {
        const prefs = {
            sound_enabled: document.getElementById('soundToggle').checked,
            notifications_enabled: document.getElementById('notifToggle').checked
        };
        try {
            await fetch(`${API_BASE}/preferences`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(prefs)
            });
            this.state.preferences = prefs;
        } catch (error) {
            console.error('Error updating preferences:', error);
        }
    },

    renderExercises() {
        const list = document.getElementById('exerciseList');
        list.innerHTML = exercises.map((ex, idx) => `
            <div class="exercise-card ${this.state.completedExercises.has(idx) ? 'completed' : ''} ${this.state.currentExerciseIndex === idx ? 'active' : ''}" onclick="app.selectExercise(${idx})">
                <div class="exercise-header">
                    <div class="ex-number">${this.state.completedExercises.has(idx) ? '✓' : idx + 1}</div>
                    <div>
                        <div class="ex-title">${ex.name}</div>
                    </div>
                    <div class="ex-time">${Math.ceil(ex.time / 60)} min</div>
                </div>
                <div class="ex-desc">
                    ${ex.desc}
                    ${ex.isBreathing ? '<div class="breathing-badge">Breathing</div>' : ''}
                </div>
            </div>
        `).join('');
    },

    selectExercise(idx) {
        if (!this.state.isRunning) {
            this.state.currentExerciseIndex = idx;
            this.renderExercises();
        }
    },

    start() {
        if (this.state.currentExerciseIndex === -1) {
            this.state.currentExerciseIndex = 0;
        }
        this.state.isRunning = true;
        this.state.sessionStartTime = Date.now();

        document.getElementById('startBtn').style.display = 'none';
        document.getElementById('pauseBtn').style.display = 'flex';
        document.getElementById('skipBtn').style.display = 'flex';

        this.playTransitionTone();
        this.showBreathingGuide();
        this.tick();
    },

    pause() {
        this.state.isRunning = false;
        clearInterval(this._breathingInterval);
        document.getElementById('pauseBtn').style.display = 'none';
        document.getElementById('startBtn').style.display = 'flex';
        document.getElementById('skipBtn').style.display = 'none';
        document.getElementById('breathingGuide').classList.remove('active');
    },

    reset() {
        this.state.isRunning = false;
        clearInterval(this._breathingInterval);
        this.state.timeLeft = 600;
        this.state.currentExerciseIndex = -1;
        this.state.completedExercises.clear();
        
        document.getElementById('pauseBtn').style.display = 'none';
        document.getElementById('startBtn').style.display = 'flex';
        document.getElementById('startBtn').textContent = '▶ Start';
        document.getElementById('startBtn').disabled = false;
        document.getElementById('skipBtn').style.display = 'none';
        document.getElementById('breathingGuide').classList.remove('active');
        document.getElementById('exerciseIndicator').textContent = 'Ready to start';
        
        this.updateDisplay();
        this.renderExercises();
    },

    skipExercise() {
        if (this.state.currentExerciseIndex < exercises.length - 1) {
            this.state.completedExercises.add(this.state.currentExerciseIndex);
            this.state.currentExerciseIndex++;
            this.playTransitionTone();
            this.renderExercises();
            this.showBreathingGuide();
        } else {
            this.finishSession();
        }
    },

    tick() {
        if (!this.state.isRunning) return;
        
        if (this.state.timeLeft > 0) {
            this.state.timeLeft--;
            this.updateDisplay();
            setTimeout(() => this.tick(), 1000);
        } else {
            this.finishSession();
        }
    },

    async finishSession() {
        this.state.isRunning = false;
        
        const duration = Math.floor((Date.now() - this.state.sessionStartTime) / 1000);
        const exercisesCompleted = this.state.completedExercises.size + 1;
        
        try {
            const response = await fetch(`${API_BASE}/session/complete`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    duration: duration,
                    exercises: exercisesCompleted
                })
            });
            const result = await response.json();
            this.state.streak = result.streak;
            this.state.totalSessions = result.total_sessions;
        } catch (error) {
            console.error('Error completing session:', error);
        }
        
        document.getElementById('pauseBtn').style.display = 'none';
        document.getElementById('startBtn').style.display = 'flex';
        document.getElementById('startBtn').textContent = '✓ Done!';
        document.getElementById('startBtn').disabled = true;
        document.getElementById('skipBtn').style.display = 'none';
        document.getElementById('breathingGuide').classList.remove('active');
        
        this.playCompletionSound();
        this.showSuccessModal();
        this.loadStats();
    },

    showBreathingGuide() {
        const currentEx = exercises[this.state.currentExerciseIndex];
        if (currentEx && currentEx.isBreathing) {
            document.getElementById('breathingGuide').classList.add('active');
            this.animateBreathing();
        } else {
            document.getElementById('breathingGuide').classList.remove('active');
        }
    },

    animateBreathing() {
        clearInterval(this._breathingInterval);

        const circle = document.getElementById('breathingCircle');
        const text = document.getElementById('breathingText');
        const steps = ['Inhale', 'Hold', 'Exhale', 'Hold'];
        // Frequencies: rising for inhale, mid for holds, falling for exhale
        const stepFreqs = [528, 396, 285, 396];
        let step = 0;

        const tick = () => {
            circle.className = 'breathing-circle';
            text.textContent = steps[step];
            if (step === 0) circle.classList.add('inhale');
            else if (step === 2) circle.classList.add('exhale');
            this.playTone(stepFreqs[step], 0.6, 0.12);
            step = (step + 1) % 4;
        };

        tick();
        this._breathingInterval = setInterval(() => {
            if (!this.state.isRunning) {
                clearInterval(this._breathingInterval);
                return;
            }
            tick();
        }, 4000);
    },

    updateDisplay() {
        const mins = Math.floor(this.state.timeLeft / 60);
        const secs = this.state.timeLeft % 60;
        document.getElementById('timerDisplay').textContent = 
            String(mins).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
        
        if (this.state.currentExerciseIndex >= 0 && this.state.currentExerciseIndex < exercises.length) {
            document.getElementById('exerciseIndicator').textContent = exercises[this.state.currentExerciseIndex].name;
        }
    },

    updateStatsDisplay() {
        document.getElementById('completedCount').textContent = this.state.sessionsToday || 0;
        document.getElementById('sessionCount').textContent = this.state.totalSessions;
        document.getElementById('streakCount').textContent = this.state.streak || 0;
        document.getElementById('weekCount').textContent = this.state.sessionsThisWeek || 0;
    },

    switchTab(tabName, event) {
        document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
        document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

        document.getElementById(tabName + 'Tab').style.display = 'block';
        event.target.classList.add('active');

        if (tabName === 'history') {
            this.loadHistory();
        }
    },

    loadHistory() {
        const list = document.getElementById('historyList');
        list.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Sessions will appear here as you complete them.</p>';
    },

    openSettings() {
        document.getElementById('settingsModal').style.display = 'flex';
    },

    closeSettings() {
        document.getElementById('settingsModal').style.display = 'none';
    },

    showSuccessModal() {
        document.getElementById('successStreak').textContent = this.state.streak || '1';
        document.getElementById('successTotal').textContent = this.state.totalSessions;
        document.getElementById('successModal').style.display = 'flex';
    },

    closeSuccess() {
        document.getElementById('successModal').style.display = 'none';
        this.reset();
    },

    _getAudioContext() {
        if (!this._audioContext) {
            this._audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        return this._audioContext;
    },

    playTone(frequency, duration, volume = 0.1) {
        if (!this.state.preferences.sound_enabled) return;
        const ctx = this._getAudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.value = frequency;
        const now = ctx.currentTime;
        const attack = Math.min(0.05, duration * 0.1);
        const release = Math.min(0.3, duration * 0.4);
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(volume, now + attack);
        gain.gain.setValueAtTime(volume, now + duration - release);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
        osc.start(now);
        osc.stop(now + duration);
    },

    playTransitionTone() {
        // Soft two-note chime: low then slightly higher
        this.playTone(330, 0.5, 0.1);
        setTimeout(() => this.playTone(440, 0.6, 0.08), 280);
    },

    playCompletionSound() {
        // Three ascending tones for session completion
        this.playTone(440, 0.6, 0.12);
        setTimeout(() => this.playTone(528, 0.6, 0.12), 350);
        setTimeout(() => this.playTone(660, 0.9, 0.12), 700);
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
