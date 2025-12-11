import React from 'react';

const Header = (props) => {
  return (
    <header>
      {/* REQUIREMENT: Receiving Title via Props */}
      <h1>{props.title}</h1>
      <nav>
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#idea">Project Idea</a></li>
          <li><a href="#team">Developer</a></li>
        </ul>
      </nav>
      {/* Toggle Theme Button */}
      <button className="theme-btn" onClick={props.toggleTheme}>
        {props.darkMode ? "Light Mode" : "Dark Mode"}
      </button>
    </header>
  );
};

export default Header;