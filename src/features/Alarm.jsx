import { useEffect, useState } from "react";

const Alarm = () => {
  const [alarmTime, setAlarmTime] = useState("");
  const [label, setLabel] = useState("");
  const [alarms, setAlarms] = useState([]);

  // Add alarm
  const addAlarm = () => {
    if (!alarmTime) {
      alert("Please select alarm time");
      return;
    }

    const newAlarm = {
      id: Date.now(),
      time: alarmTime,
      label: label || "Alarm",
      active: true,
    };

    setAlarms((previousAlarms) => [
      ...previousAlarms,
      newAlarm,
    ]);

    setAlarmTime("");
    setLabel("");
  };

  // Delete alarm
  const deleteAlarm = (id) => {
    setAlarms((previousAlarms) =>
      previousAlarms.filter((alarm) => alarm.id !== id)
    );
  };

  // ON / OFF
  const toggleAlarm = (id) => {
    setAlarms((previousAlarms) =>
      previousAlarms.map((alarm) =>
        alarm.id === id
          ? { ...alarm, active: !alarm.active }
          : alarm
      )
    );
  };

  // Check alarm every second
  useEffect(() => {
    const interval = setInterval(() => {

      const now = new Date();

      const currentTime = now.toTimeString().slice(0, 5);

      setAlarms((previousAlarms) =>
        previousAlarms.map((alarm) => {

          if (
            alarm.active &&
            alarm.time === currentTime
          ) {
            alert(`⏰ ${alarm.label}`);

            return {
              ...alarm,
              active: false,
            };
          }

          return alarm;
        })
      );

    }, 1000);

    return () => clearInterval(interval);

  }, []);

  return (
    <div className="alarm">

      <h2>⏰ Alarm</h2>

      <div className="alarm-form">

        <input
          type="time"
          value={alarmTime}
          onChange={(e) => setAlarmTime(e.target.value)}
        />

        <input
          type="text"
          placeholder="Alarm label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />

        <button onClick={addAlarm}>
          Add Alarm
        </button>

      </div>

      <div className="alarm-list">

        {alarms.length === 0 ? (
          <p>No alarms set.</p>
        ) : (

          alarms.map((alarm) => (

            <div
              className="alarm-item"
              key={alarm.id}
            >

              <div>
                <h3>{alarm.time}</h3>
                <p>{alarm.label}</p>
              </div>

              <button
                onClick={() => toggleAlarm(alarm.id)}
              >
                {alarm.active ? "ON" : "OFF"}
              </button>

              <button
                onClick={() => deleteAlarm(alarm.id)}
              >
                Delete
              </button>

            </div>

          ))

        )}

      </div>

    </div>
  );
};

export default Alarm;