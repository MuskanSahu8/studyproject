import React, { useState } from 'react'
import TimeWidget from '../components/TimeWidget'
import Stopwatch from '../features/Stopwatch'
import Alarm from '../features/Alarm'
import Reminder from '../features/Reminder'
import Calendar from '../features/Calender'

const Dashboard = () => {
   const [selectedDate, setSelectedDate] = useState(
    new Date()
  );
  return (
    <div className='dashboard'>
      <div className="dashboard-header">
        <div>
          <h1>Welcome back 👋</h1>
          <p className="dashboard-subtitle">
            Manage your learning and productivity.
          </p>
        </div>
      </div>
      <div className="dashboard-grid">
        <TimeWidget />
        <Stopwatch />
        <Alarm />
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate} />
        <Reminder />
      </div>
    </div>
  )
}

export default Dashboard;
