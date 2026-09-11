import { useState } from "react";

const Calendar = ({selectedDate,setSelectedDate,reminders}) => {
  const today = new Date();

  const [currentDate, setCurrentDate] = useState(today);
 

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const monthName = currentDate.toLocaleDateString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    }
  );
    // Format date as YYYY-MM-DD
  const formatDate = (date) => {
    const year = date.getFullYear();

    const month = String(
      date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Check if date is today
  const isToday = (day) => {
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  // Check selected date
  const isSelected = (day) => {
    return (
      selectedDate &&
      day === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    );
  };
   // Check if date has reminder
  const hasReminder = (day) => {
    const date = new Date(year, month, day);

    const dateString = formatDate(date);

    return reminders.some(
      (reminder) => reminder.date === dateString
    );
  };

  // Previous month
  const previousMonth = () => {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  };

  // Next month
  const nextMonth = () => {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  };

  // Select date
  const selectDate = (day) => {
    setSelectedDate(
      new Date(year, month, day)
    );
  };

  const days = [];

  // Empty spaces
  for (let i = 0; i < firstDay; i++) {
    days.push(
      <div
        className="calendar-empty"
        key={`empty-${i}`}
      />
    );
  }

  // Dates
  for (let day = 1; day <= daysInMonth; day++) {

    days.push(

      <button
        key={day}
        onClick={() => selectDate(day)}

        className={`
          calendar-day
          ${isToday(day) ? "today" : ""}
          ${isSelected(day) ? "selected" : ""}
        `}
      >
        {day}
      </button>

    );
  }

  return (
    <div className="calendar">

      {/* Header */}

      <div className="calendar-header">

        <button onClick={previousMonth}>
          ←
        </button>

        <h2>{monthName}</h2>

        <button onClick={nextMonth}>
          →
        </button>

      </div>


      {/* Weekdays */}

      <div className="calendar-weekdays">

        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>

      </div>


      {/* Calendar */}

      <div className="calendar-grid">
        {days}
      </div>


      {/* Selected date */}

      {selectedDate && (

        <div className="selected-date">

          <p>Selected date</p>

          <h3>
            {selectedDate.toLocaleDateString(
              "en-US",
              {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              }
            )}
          </h3>

        </div>

      )}

    </div>
  );
};

export default Calendar;