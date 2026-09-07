import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
   <>
   <nav className="navbar">
    <div className="logo">FocusSpace</div>
    <div className='nav-links'>
        <Link to="/" >Home</Link>
         <Link to="/dashboard" >Dashboard</Link>
          <Link to="/about" >About</Link>
    </div>
    <div className='auth-btn'>
        <Link to="/signin" className="login-btn">Signin</Link>
        <Link to ="/signup" className='signup-btn'>Get Started</Link>
        
    </div>
   </nav>
   </>
  )
}

export default Navbar
