import React from 'react'
import { useAuth } from './contextApi/AuthContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  const {user,loading}=useAuth();
   // Wait until we check the backend
   if(loading){
    return <h2>checkking authentication...</h2>
   }
   //user is not log in
   if(!user){
    return <Navigate to="/signin" replace />;
   }
   //user is logged in

  return children;
}

export default ProtectedRoute
