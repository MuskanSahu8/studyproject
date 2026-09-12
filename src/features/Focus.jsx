import React, { useEffect, useState } from "react";

const FocusTimer = () => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [mode, setMode] = useState("focus");

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds((previous) => previous - 1);
      } else if (minutes > 0) {
        setMinutes((previous) => previous - 1);
        setSeconds(59);
      } else {
        setRunning(false);

        alert(
          mode === "focus"
            ? "🍅 Focus session completed!"
            : "☕ Break completed!"
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [running, minutes, seconds, mode]);

  const startTimer = () => {
    setRunning(true);
  };

  const pauseTimer = () => {
    setRunning(false);
  };

  const resetTimer = () => {
    setRunning(false);

    if (mode === "focus") {
      setMinutes(25);
    } else {
      setMinutes(5);
    }

    setSeconds(0);
  };

  const changeMode = (newMode) => {
    setRunning(false);
    setMode(newMode);

    if (newMode === "focus") {
      setMinutes(25);
    } else {
      setMinutes(5);
    }

    setSeconds(0);
  };

  return (
    <div className="focus-timer">

      <h2>🍅 Focus Timer</h2>

      <div className="timer-modes">

        <button
          className={
            mode === "focus"
              ? "active-mode"
              : ""
          }
          onClick={() =>
            changeMode("focus")
          }
        >
          Focus
        </button>

        <button
          className={
            mode === "break"
              ? "active-mode"
              : ""
          }
          onClick={() =>
            changeMode("break")
          }
        >
          Break
        </button>

      </div>

      <div className="timer-display">
        {String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </div>

      <p>
        {mode === "focus"
          ? "Stay focused and study 📚"
          : "Take a short break ☕"}
      </p>

      <div className="timer-buttons">

        {!running ? (
          <button onClick={startTimer}>
            Start
          </button>
        ) : (
          <button onClick={pauseTimer}>
            Pause
          </button>
        )}

        <button onClick={resetTimer}>
          Reset
        </button>

      </div>

    </div>
  );
};

export default FocusTimer;