import React from 'react'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">

      <div className="logo">
        TimeMate
      </div>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/dashboard">
          Dashboard
        </Link>

      </div>

    </nav>
  );
}

export default Navbar
