import React, { useEffect, useState } from "react";

const Clock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const time = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const date = currentTime.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="clock-card">
      <div className="clock-icon">🕐</div>

      <div className="clock-time">
        {time}
      </div>

      <div className="clock-date">
        {date}
      </div>
    </div>
  );
};

export default Clock;