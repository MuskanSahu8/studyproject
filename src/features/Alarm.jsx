import React, { useEffect, useRef, useState } from "react";
import apiClient from "../ApiClient/interceptor";

const Alarm = () => {
  const [time, setTime] = useState("");
  const [label, setLabel] = useState("");
  const [alarms, setAlarms] = useState([]);
  const [ringingAlarm, setRingingAlarm] = useState(null);

  const alarmSound = useRef(null);

  // Create alarm sound
  useEffect(() => {
    alarmSound.current = new Audio("/alarm.mp3");
    alarmSound.current.loop = true;

    return () => {
      alarmSound.current?.pause();
    };
  }, []);

  // Fetch alarms from backend
  useEffect(() => {
    const fetchAlarms = async () => {
      try {
        const response = await apiClient.get("/alarms");

        console.log("Alarms:", response.data);

        setAlarms(response.data.data);
      } catch (error) {
        console.log(
          "Fetch alarms error:",
          error
        );
      }
    };

    fetchAlarms();
  }, []);

  // Create alarm
  const addAlarm = async () => {
    if (!time) {
      alert("Please select alarm time");
      return;
    }

    try {
      const response = await apiClient.post(
        "/alarms/create",
        {
          time,
          label: label || "Alarm",
        }
      );

      console.log(
        "Created alarm:",
        response.data
      );

      const newAlarm = response.data.data;

      setAlarms((previousAlarms) => [
        ...previousAlarms,
        newAlarm,
      ]);

      setTime("");
      setLabel("");

    } catch (error) {
      console.log(
        "Create alarm error:",
        error
      );

      alert(
        error.response?.data?.message ||
        "Failed to create alarm"
      );
    }
  };

  // Delete alarm
  const deleteAlarm = async (id) => {
    try {
      await apiClient.delete(
        `/alarms/${id}`
      );

      setAlarms((previousAlarms) =>
        previousAlarms.filter(
          (alarm) => alarm._id !== id
        )
      );

    } catch (error) {
      console.log(
        "Delete alarm error:",
        error
      );
    }
  };

  // Toggle ON/OFF
  const toggleAlarm = async (id) => {
    try {
      const response = await apiClient.patch(
        `/alarms/toggle/${id}`
      );

      const updatedAlarm = response.data.data;

      setAlarms((previousAlarms) =>
        previousAlarms.map((alarm) =>
          alarm._id === id
            ? updatedAlarm
            : alarm
        )
      );

    } catch (error) {
      console.log(
        "Toggle alarm error:",
        error
      );
    }
  };

  // Stop alarm
  const stopAlarm = () => {
    if (alarmSound.current) {
      alarmSound.current.pause();
      alarmSound.current.currentTime = 0;
    }

    setRingingAlarm(null);
  };

  // Snooze
  const snoozeAlarm = async () => {
  if (!ringingAlarm) return;

  try {
    // Stop sound
    if (alarmSound.current) {
      alarmSound.current.pause();
      alarmSound.current.currentTime = 0;
    }

    const now = new Date();

    now.setMinutes(now.getMinutes() + 5);

    const snoozeTime =
      String(now.getHours()).padStart(2, "0") +
      ":" +
      String(now.getMinutes()).padStart(2, "0");

    const response = await apiClient.patch(
      `/alarms/update-time/${ringingAlarm._id}`,
      {
        time: snoozeTime,
      }
    );

    const updatedAlarm = response.data.data;

    // Update frontend
    setAlarms((previousAlarms) =>
      previousAlarms.map((alarm) =>
        alarm._id === ringingAlarm._id
          ? updatedAlarm
          : alarm
      )
    );

    setRingingAlarm(null);

  } catch (error) {
    console.log(
      "Snooze error:",
      error
    );
  }
};
  // Check alarm
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      const currentTime =
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0");

      const alarm = alarms.find(
        (item) =>
          item.active &&
          item.time === currentTime
      );

      if (alarm) {
        setRingingAlarm(alarm);

        if (alarmSound.current) {
          alarmSound.current
            .play()
            .catch((error) =>
              console.log(
                "Audio error:",
                error
              )
            );
        }

        // Prevent repeated triggering
        setAlarms((previousAlarms) =>
          previousAlarms.map((item) =>
            item._id === alarm._id
              ? {
                  ...item,
                  active: false,
                }
              : item
          )
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [alarms]);

  return (
    <div className="alarm">

      <h2>⏰ Alarm</h2>

      {/* Form */}
      <div className="alarm-form">

        <input
          type="time"
          value={time}
          onChange={(e) =>
            setTime(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Alarm label"
          value={label}
          onChange={(e) =>
            setLabel(e.target.value)
          }
        />

        <button onClick={addAlarm}>
          Set Alarm
        </button>

      </div>

      {/* Alarm List */}
      <div className="alarm-list">

        {alarms.length === 0 ? (
          <p>No alarms set.</p>
        ) : (
          alarms.map((alarm) => (

            <div
              className="alarm-item"
              key={alarm._id}
            >

              <div>
                <h3>{alarm.time}</h3>

                <p>
                  {alarm.label}
                </p>
              </div>

              <span>
                {alarm.active
                  ? "ON"
                  : "OFF"}
              </span>

              <div className="alarm-buttons">

                <button
                  onClick={() =>
                    toggleAlarm(
                      alarm._id
                    )
                  }
                >
                  {alarm.active
                    ? "OFF"
                    : "ON"}
                </button>

                <button
                  onClick={() =>
                    deleteAlarm(
                      alarm._id
                    )
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))
        )}

      </div>

      {/* Ringing Popup */}
      {ringingAlarm && (
        <div className="alarm-popup">

          <h2>🔔 Alarm Ringing!</h2>

          <h3>
            {ringingAlarm.label}
          </h3>

          <p>
            ⏰ {ringingAlarm.time}
          </p>

          <div className="alarm-actions">

            <button onClick={stopAlarm}>
              Stop
            </button>

            <button onClick={snoozeAlarm}>
              Snooze 5 min
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default Alarm;