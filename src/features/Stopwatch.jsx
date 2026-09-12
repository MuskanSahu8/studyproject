import React, { useEffect, useState } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  // Start stopwatch
  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setTime((previousTime) => previousTime + 10);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [running]);

  // Format time
  const formatTime = (milliseconds) => {
    const minutes = Math.floor(
      milliseconds / 60000
    );

    const seconds = Math.floor(
      (milliseconds % 60000) / 1000
    );

    const ms = Math.floor(
      (milliseconds % 1000) / 10
    );

    return (
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0") +
      ":" +
      String(ms).padStart(2, "0")
    );
  };

  // Reset
  const reset = () => {
    setRunning(false);
    setTime(0);
    setLaps([]);
  };

  // Lap
  const addLap = () => {
    if (time === 0) return;

    setLaps((previousLaps) => [
      ...previousLaps,
      time,
    ]);
  };

  return (
    <div className="stopwatch">

      <h2>⏱️ Stopwatch</h2>

      <div className="stopwatch-display">
        {formatTime(time)}
      </div>

      <div className="stopwatch-buttons">

        <button
          onClick={() =>
            setRunning(true)
          }
          disabled={running}
        >
          Start
        </button>

        <button
          onClick={() =>
            setRunning(false)
          }
          disabled={!running}
        >
          Pause
        </button>

        <button onClick={reset}>
          Reset
        </button>

        <button onClick={addLap}>
          Lap
        </button>

      </div>

      {/* Laps */}
      {laps.length > 0 && (
        <div className="laps">

          <h3>Laps</h3>

          {laps.map((lap, index) => (
            <div
              className="lap"
              key={index}
            >
              <span>
                Lap {index + 1}
              </span>

              <span>
                {formatTime(lap)}
              </span>
            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default Stopwatch;