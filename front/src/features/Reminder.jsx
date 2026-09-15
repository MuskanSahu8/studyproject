import React, { useState, useEffect, useRef } from 'react'
import apiClient from '../ApiClient/interceptor'
import reminderSoundFile from "../assets/alarm.mp3";

const Reminder = ({
  reminders = [],
  setReminders,
  selectedDate,
}) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");

  const reminderSound = useRef(null);
  const [activeReminder, setActiveReminder] = useState(null);

  // =========================
  // FETCH REMINDERS
  // =========================
  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await apiClient.get("/reminders");

        console.log("Reminders:", response.data);

        if (setReminders) {
          setReminders(response.data.data || []);
        }
      } catch (error) {
        console.log("Error fetching reminders:", error);
      }
    };

    fetchReminders();
  }, [setReminders]);

  // =========================
  // CREATE SOUND
  // =========================
  useEffect(() => {
    reminderSound.current = new Audio(reminderSoundFile);
    reminderSound.current.loop = true;

    return () => {
      reminderSound.current?.pause();
    };
  }, []);

  // =========================
  // STOP SOUND
  // =========================
  const stopReminderSound = () => {
    if (reminderSound.current) {
      reminderSound.current.pause();
      reminderSound.current.currentTime = 0;
    }
  };

  // =========================
  // SELECTED CALENDAR DATE
  // =========================
  useEffect(() => {
    if (selectedDate) {
      const year = selectedDate.getFullYear();

      const month = String(
        selectedDate.getMonth() + 1
      ).padStart(2, "0");

      const day = String(
        selectedDate.getDate()
      ).padStart(2, "0");

      setDate(`${year}-${month}-${day}`);
    }
  }, [selectedDate]);

  // =========================
  // ADD REMINDER
  // =========================
  const addReminder = async () => {
    if (!date || !time || !message) {
      alert("All fields are required");
      return;
    }

    try {
      const response = await apiClient.post(
        "/reminders/create",
        {
          date,
          time,
          message,
        }
      );

      console.log("Created:", response.data);

      const newReminder = response.data.data;

      if (setReminders) {
        setReminders((previousReminders) => [
          ...previousReminders,
          newReminder,
        ]);
      }

      setTime("");
      setMessage("");

      alert("Reminder added successfully");
    } catch (error) {
      console.log("Create reminder error:", error);

      alert(
        error.response?.data?.message ||
          "Failed to create reminder"
      );
    }
  };

  // =========================
  // DELETE REMINDER
  // =========================
  const deleteReminder = async (id) => {
    try {
      await apiClient.delete(`/reminders/${id}`);

      if (setReminders) {
        setReminders((previousReminders) =>
          previousReminders.filter(
            (reminder) => reminder._id !== id
          )
        );
      }
    } catch (error) {
      console.log("Delete reminder error:", error);
    }
  };

  // =========================
  // CHECK REMINDERS
  // =========================
  useEffect(() => {
    const interval = setInterval(async () => {
      const now = new Date();

      const currentDate =
        now.getFullYear() +
        "-" +
        String(now.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(now.getDate()).padStart(2, "0");

      const currentTime =
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0");

      const dueReminders = reminders.filter(
        (reminder) =>
          reminder.active &&
          reminder.date === currentDate &&
          reminder.time === currentTime
      );

      for (const reminder of dueReminders) {
        // Show popup
        setActiveReminder(reminder);

        // Play sound
        reminderSound.current
          ?.play()
          .catch((error) => {
            console.log(
              "Reminder sound error:",
              error
            );
          });

        try {
          // Mark reminder completed in MongoDB
          await apiClient.patch(
            `/reminders/complete/${reminder._id}`
          );

          // Update frontend state
          if (setReminders) {
            setReminders((previousReminders) =>
              previousReminders.map((item) =>
                item._id === reminder._id
                  ? { ...item, active: false }
                  : item
              )
            );
          }
        } catch (error) {
          console.log(
            "Error completing reminder:",
            error
          );
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [reminders, setReminders]);

  // =========================
  // SELECTED DATE STRING
  // =========================
  const selectedDateString = selectedDate
    ? `${selectedDate.getFullYear()}-${String(
        selectedDate.getMonth() + 1
      ).padStart(2, "0")}-${String(
        selectedDate.getDate()
      ).padStart(2, "0")}`
    : "";

  // =========================
  // FILTER REMINDERS
  // =========================
  const filteredReminders = reminders.filter(
    (reminder) =>
      reminder.date === selectedDateString
  );

  // =========================
  // JSX
  // =========================
  return (
    <div className="reminder">

      <h2>🔔 Reminders</h2>

      {/* FORM */}
      <div className="reminder-form">

        <input
          type="date"
          value={date}
          onChange={(e) =>
            setDate(e.target.value)
          }
        />

        <input
          type="time"
          value={time}
          onChange={(e) =>
            setTime(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Reminder message"
          value={message}
          onChange={(e) =>
            setMessage(e.target.value)
          }
        />

        <button onClick={addReminder}>
          Add Reminder
        </button>

      </div>

      {/* REMINDER LIST */}
      <div className="reminder-list">

        {filteredReminders.length === 0 ? (
          <p>No reminders for this date.</p>
        ) : (
          filteredReminders.map((reminder) => (

            <div
              className="reminder-item"
              key={reminder._id}
            >

              <div className="reminder-info">

                <h3>
                  🔔 {reminder.message}
                </h3>

                <p>
                  📅 {reminder.date}
                </p>

                <p>
                  ⏰ {reminder.time}
                </p>

              </div>

              <div className="reminder-actions">

                <span
                  className={
                    reminder.active
                      ? "status-active"
                      : "status-done"
                  }
                >
                  {reminder.active
                    ? "ACTIVE"
                    : "DONE"}
                </span>

                <button
                  className="delete-reminder"
                  onClick={() =>
                    deleteReminder(reminder._id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))
        )}

      </div>

      {/* REMINDER POPUP */}
      {activeReminder && (
        <div className="reminder-popup">

          <div className="reminder-popup-content">

            <h2>🔔 Reminder</h2>

            <p>
              {activeReminder.message}
            </p>

            <p>
              ⏰ {activeReminder.time}
            </p>

            <button
              onClick={() => {
                stopReminderSound();
                setActiveReminder(null);
              }}
            >
              Stop
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default Reminder;