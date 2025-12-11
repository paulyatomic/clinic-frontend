import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ darkMode, toggleTheme }) => {
  return (
    <header>
      <h1>Community Clinic System</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/book">Appointments</Link></li>
          <li><Link to="/idea">Project Idea</Link></li>
        </ul>
      </nav>

      <button className="theme-btn" onClick={toggleTheme}>
        {darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
};

export default NavBar;