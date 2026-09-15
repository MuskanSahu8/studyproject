import React, { useState } from "react";
import Calendar from "../features/Calender"
import Alarm from "../features/Alarm"
import Reminder from "../features/Reminder";
import Stopwatch from "../features/Stopwatch";
import FocusTimer from "../features/Focus";
import Clock from "../features/Clock";
import "./Dashboard.css";
import Todo from "../features/Todo";
import Logout from "./Logout";
import { useAuth } from "../contextApi/AuthContext";
import { useNavigate } from "react-router-dom";
import Note from "../features/Note";



const Dashboard = ({
  reminders,
  setReminders,
  selectedDate,
  setSelectedDate
}) => {
  const navigate = useNavigate();
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

          <Todo />
          <button className="open-btn"
            onClick={() => navigate("/todo")}>
            open Todo
          </button>
        </div>


        <div className="dashboard-card">

          <Calendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            reminders={reminders}
          />

        </div>

      </div>

      <div className="dashboard-grid">

        <div className="dashboard-card">

          <Alarm />
           <button className="open-btn"
            onClick={() => navigate("/alarm")}>
            open Alarms
          </button>

        </div>


        <div className="dashboard-card">

          <Reminder
            reminders={reminders}
            setReminders={setReminders}
            selectedDate={selectedDate}
          />
           <button className="open-btn"
            onClick={() => navigate("/reminder")}>
            open Reminders
          </button>

        </div>

      </div>


      {/* Focus Timer */}

      <div className="dashboard-wide-card">

        <Stopwatch />

      </div>
      <div className="dashboard-wide-card">
        <Note />
         <button className="open-btn"
            onClick={() => navigate("/note")}>
            open Notes
          </button>
      </div>

    </div>
  );
};


export default Dashboard;