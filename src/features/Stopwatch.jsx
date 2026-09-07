import { useEffect, useState } from "react";

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;

    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (timeValue) => {
    const minutes = Math.floor(timeValue / 60000);

    const seconds = Math.floor(
      (timeValue % 60000) / 1000
    );

    const milliseconds = Math.floor(
      (timeValue % 1000) / 10
    );

    return `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}.${String(milliseconds).padStart(2, "0")}`;
  };

  const reset = () => {
    setRunning(false);
    setTime(0);
    setLaps([]);
  };

  const addLap = () => {
    setLaps((previousLaps) => [
      ...previousLaps,
      time
    ]);
  };

  return (
    <div className="stopwatch">

      <h2>Stopwatch</h2>

      <div className="stopwatch-time">
        {formatTime(time)}
      </div>

      <div className="stopwatch-buttons">

        <button onClick={() => setRunning(!running)}>
          {running ? "Pause" : "Start"}
        </button>

        <button
          onClick={addLap}
          disabled={!running}
        >
          Lap
        </button>

        <button onClick={reset}>
          Reset
        </button>

      </div>

      {laps.length > 0 && (
        <div className="laps">

          <h3>Laps</h3>

          {laps.map((lap, index) => (
            <div className="lap" key={index}>

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