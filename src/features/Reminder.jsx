import React, { useState,useEffect } from 'react'

const Reminder = () => {
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const [message, setMessage] = useState("")
    const [reminders, setReminders] = useState([])

    const addReminder = () => {
        if (!date || !time || !message) {
            alert("all fields are require")
            return;
        }

        const newReminder = {
            id: Date.now(),
            date,
            time, message, active: true,
        }
        setReminders((previousReminder) => [
            ...previousReminder,
            newReminder
        ])
        setDate("");
        setTime("");
        setTime("");
    }
    // Delete reminder
    const deleteReminder = (id) => {
        setReminders((previousReminders) =>
            previousReminders.filter(
                (reminder) => reminder.id !== id
            )
        );
    };

    // Check reminders
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();

            const currentDate = now
                .toISOString()
                .split("T")[0];

            const currentTime = now
                .toTimeString()
                .slice(0, 5);

            setReminders((previousReminders) =>
                previousReminders.map((reminder) => {

                    if (
                        reminder.active &&
                        reminder.date === currentDate &&
                        reminder.time === currentTime
                    ) {
                        alert(`🔔 ${reminder.message}`);

                        return {
                            ...reminder,
                            active: false,
                        };
                    }

                    return reminder;
                })
            );
        }, 1000);

        return () => clearInterval(interval);
    }, []);

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

                {reminders.length === 0 ? (
                    <p>No reminders set.</p>
                ) : (

                    reminders.map((reminder) => (

                        <div
                            className="reminder-item"
                            key={reminder.id}
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
                                    deleteReminder(reminder.id)
                                }
                            >
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
