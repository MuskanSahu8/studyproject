
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import{Routes,Route } from 'react-router-dom'
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './ProtectedRoute';
import Logout from './pages/Logout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route 
      path='/login'
      element={<Login />}/>
      <Route path="/signup" element={<Signup />}/>
      <Route
      path="/logout" element={<Logout />} />
    </Routes>
  );
}
export default App;
