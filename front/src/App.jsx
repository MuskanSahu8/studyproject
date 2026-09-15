import React,{useState} from 'react';
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import{Routes,Route } from 'react-router-dom'
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './ProtectedRoute';
import Logout from './pages/Logout';
import Todo from './features/Todo';
import Calendar from './features/Calender';
import Reminder from './features/Reminder';
import Alarm from './features/Alarm';
import Stopwatch from './features/Stopwatch';

import Note from './features/Note';

function App() {
  // Calendar selected date
  const [selectedDate, setSelectedDate] = useState(new Date());

   // Reminder state
  const [reminders, setReminders] = useState([]);

  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard 
               selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              reminders={reminders}
              setReminders={setReminders}
            />
          </ProtectedRoute>
        }
      />
      <Route 
      path='/login'
      element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route
      path="/logout" element={<Logout />} />
      <Route 
      path='/todo' element ={
        <ProtectedRoute>
          <Todo />
        </ProtectedRoute>
      } />
      <Route path='/calender' element ={
        <ProtectedRoute>
          <Calendar 
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          reminders={reminders}/>
        </ProtectedRoute>
      } />
      <Route  path='/reminder' element ={
        <ProtectedRoute>
          <Reminder 
          reminders={reminders}
          setReminders={setReminders}
          selectedDate={selectedDate}
                              />
        </ProtectedRoute>
      } />
      <Route 
      path='/alarm' element ={
        <ProtectedRoute>
          <Alarm />
        </ProtectedRoute>
      } />
      <Route  path='/stopwatch' element ={
        <ProtectedRoute>
          <Stopwatch />
        </ProtectedRoute>
      } />
      <Route path="/note" element={
        <ProtectedRoute>
          <Note />
          </ProtectedRoute> }/>
    </Routes>
  );
}
export default App;
