import React, { useState, useEffect } from 'react'
import apiClient from '../ApiClient/interceptor'
const Reminder = ({ reminders, setReminders, selectedDate }) => {
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [message, setMessage] = useState("")
    useEffect(() => {
  const fetchReminders = async () => {
    try {
      const response = await apiClient.get("/reminders");

      console.log("Reminders:", response.data);

      setReminders(response.data.data);
    } catch (error) {
      console.log(
        "Error fetching reminders:",
        error
      );
    }
  };

  fetchReminders();
}, [setReminders]);


    // Automatically use selected calendar date
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

    setReminders((previousReminders) => [
      ...previousReminders,
      newReminder,
    ]);

    setTime("");
    setMessage("");

  } catch (error) {
    console.log(
      "Create reminder error:",
      error
    );

    alert(
      error.response?.data?.message ||
      "Failed to create reminder"
    );
  }
};
    // Delete reminder
    const deleteReminder = async (id) => {
  try {
    await apiClient.delete(
      `/reminders/${id}`
    );

    setReminders((previousReminders) =>
      previousReminders.filter(
        (reminder) => reminder._id !== id
      )
    );

  } catch (error) {
    console.log(
      "Delete reminder error:",
      error
    );
  }
};
    // Check reminders
// Check reminders
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
      // Show notification
      alert(`🔔 ${reminder.message}`);

      try {
        // Update MongoDB
        await apiClient.patch(
          `/reminders/complete/${reminder._id}`
        );

        // Update React state
        setReminders((previousReminders) =>
          previousReminders.map((item) =>
            item._id === reminder._id
              ? { ...item, active: false }
              : item
          )
        );

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
    const selectedDateString = selectedDate
        ? `${selectedDate.getFullYear()}-${String(
            selectedDate.getMonth() + 1
        ).padStart(2, "0")}-${String(
            selectedDate.getDate()
        ).padStart(2, "0")}`
        : "";

    const filteredReminders = reminders.filter(
        (reminder) => reminder.date === selectedDateString
    );

    return (
        <div className="reminder">

            <h2>🔔 Reminders</h2>

            <div className="reminder-form">

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Reminder message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />

                <button onClick={addReminder}>
                    Add Reminder
                </button>

            </div>

            <div className="reminder-list">

                {filteredReminders.length === 0 ? (
                    <p>No reminders for this date.</p>
                ) : (
                    filteredReminders.map((reminder) => (

                        <div
                            className="reminder-item"
                            key={reminder._id}
                        >

                            <div>
                                <h3>{reminder.message}</h3>

                                <p>
                                    📅 {reminder.date}
                                </p>

                                <p>
                                    ⏰ {reminder.time}
                                </p>
                            </div>

                            <span>
                                {reminder.active ? "ON" : "DONE"}
                            </span>

                            <button
                                onClick={() =>
                                    deleteReminder(reminder._id)
                                }>
                                Delete
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Reminder
