import { useEffect, useState } from 'react';
import { Clock3, Pause, Play, RotateCcw } from 'lucide-react';

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
  const secs = (seconds % 60).toString().padStart(2, '0');
  return `${mins}:${secs}`;
}

function PomodoroTimer() {
  const [mode, setMode] = useState('focus');
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return undefined;

    const interval = setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          setIsRunning(false);
          const nextMode = mode === 'focus' ? 'break' : 'focus';
          setMode(nextMode);
          return nextMode === 'focus' ? 25 * 60 : 5 * 60;
        }
        return current - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, mode]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setMode('focus');
    setSecondsLeft(25 * 60);
  };

  const focusMessage = mode === 'focus'
    ? 'Stay cozy and focused — one meaningful session at a time.'
    : 'A gentle break is part of a strong study rhythm.';

  return (
    <div className="pomodoro-wrap" id="focus">
      <div className="section-title-row">
        <div>
          <p className="eyebrow">Focus corner</p>
          <h2>Pomodoro timer</h2>
        </div>
        <span className="pill-icon"><Clock3 size={18} /></span>
      </div>

      <div className="timer-display" aria-live="polite">
        <span>{mode === 'focus' ? 'Focus' : 'Break'}</span>
        <strong>{formatTime(secondsLeft)}</strong>
      </div>

      <p className="focus-message">{focusMessage}</p>

      <div className="timer-actions">
        <button type="button" className="primary-btn" onClick={startTimer}>
          <Play size={16} /> Start
        </button>
        <button type="button" className="ghost-btn" onClick={pauseTimer}>
          <Pause size={16} /> Pause
        </button>
        <button type="button" className="ghost-btn" onClick={resetTimer}>
          <RotateCcw size={16} /> Reset
        </button>
      </div>
    </div>
  );
}

export default PomodoroTimer;
