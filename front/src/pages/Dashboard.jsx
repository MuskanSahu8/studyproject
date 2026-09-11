import React, { useState } from "react";
import Calendar from "../features/Calender"
import Alarm from "../features/Alarm"
import Reminder from "../features/Reminder";
import Stopwatch from "../features/Stopwatch";
import FocusTimer from "../features/Focus";
import Clock from "../features/Clock";
import "./Dashboard.css";
import Todo from "../features/Todo";
import Login from "./Login";
import Signup from "./Signup";
import Logout from "./Logout";
import { useAuth } from "../contextApi/AuthContext";


const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [reminders, setReminders] = useState([]);

  const [tasks, setTasks] = useState([]);

  const { user, loading } = useAuth();

  // Authentication loading
  if (loading) {
    return <h2>Loading dashboard...</h2>;
  }

  // User not logged in
  if (!user) {
    return <h2>Please login first</h2>;
  }

  return (

    <div className="dashboard">

      {/* Header */}

      <div className="dashboard-header">

        <div>
          <h1>Welcome, {user.name} 👋</h1>

          <p>{user.email}</p>

          <p>
            Manage your time, tasks and focus in one place.
          </p>
        </div>

        <Logout />

      </div>


      {/* Clock + Todo + Calendar */}

      <div className="dashboard-grid">

        <div className="dashboard-card">
          <Clock />
        </div>


        <div className="dashboard-card">

          <Todo
            tasks={tasks}
            setTasks={setTasks}
          />

        </div>


        <div className="dashboard-card">

          <Calendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

        </div>

      </div>


      {/* Alarm + Reminder */}

      <div className="dashboard-grid">

        <div className="dashboard-card">

          <Alarm />

        </div>


        <div className="dashboard-card">

          <Reminder
            reminders={reminders}
            setReminders={setReminders}
            selectedDate={selectedDate}
          />

        </div>

      </div>


      {/* Focus Timer */}

      <div className="dashboard-wide-card">

        <FocusTimer />

      </div>

    </div>
  );
};


export default Dashboard;