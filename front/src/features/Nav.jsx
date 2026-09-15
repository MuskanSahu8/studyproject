import React from 'react'
import { Link } from 'react-router-dom'
import deskb from "../assets/deskbuddy.png"

const Nav = () => {
  return (
   <nav className='navbar'>
    <div className='navbar-logo'>
        <img src={deskb}></img>
        <span>DeskBuddy</span></div>
    <div className='nav-links'>
        <Link to="/">Home</Link>
        <a href="#features">Features</a>
        <a href="#about">About</a>
      
    </div>

   </nav>
  )
}

export default Nav
