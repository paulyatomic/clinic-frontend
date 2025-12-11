import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css'; 

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './Home';
import Appointment from './Appointment';
import Admin from './Admin';
import ProjectCard from './components/ProjectCard';

const AppContent = () => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation(); 

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.body.classList.remove('dark');
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.body.classList.add('dark');
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  // Logic to hide NavBar and Footer
  const isAdminPage = location.pathname === '/admin';
  const isBookingPage = location.pathname === '/book';

  return (
    <div className="App">
      {/* Hide NavBar if on Admin Page */}
      {!isAdminPage && <NavBar darkMode={darkMode} toggleTheme={toggleTheme} />}
      
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book" element={<Appointment />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/idea" element={<ProjectCard />} /> 
        </Routes>
      </main>

      {/* Hide Footer if on Admin OR Booking Page */}
      {!isAdminPage && !isBookingPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;