import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      
      {/* HERO SECTION: Changed to White background for better contrast */}
      <section className="hero-section" style={{ backgroundColor: '#ffffff', color: '#1f2937', padding: '80px 20px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '20px', color: '#111827' }}>
          Healthcare Simplified.
        </h1>
        <p style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px' }}>
          Book your consultation online. Skip the queue and manage your health on your own time.
        </p>
        <Link to="/book">
                  <button className="cta-button">
                     Book Appointment Now
                </button>
        </Link>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        
        {/* Feature 1: Calendar Icon */}
        <div className="feature-card">
          <div className="icon" style={{ color: '#2563eb', marginBottom: '20px' }}>
            {/* SVG Calendar Icon */}
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
          </div>
          <h3>Online Booking</h3>
          <p>Choose your schedule from home.</p>
        </div>

        {/* Feature 2: Bell Icon */}
        <div className="feature-card">
          <div className="icon" style={{ color: '#2563eb', marginBottom: '20px' }}>
            {/* SVG Bell Icon */}
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </div>
          <h3>SMS Reminders</h3>
          <p>Get alerts 24 hours before.</p>
        </div>

        {/* Feature 3: Activity/Queue Icon */}
        <div className="feature-card">
          <div className="icon" style={{ color: '#2563eb', marginBottom: '20px' }}>
            {/* SVG Pulse Icon */}
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
            </svg>
          </div>
          <h3>Live Queue</h3>
          <p>Track your turn real-time.</p>
        </div>

      </section>
    </div>
  );
};

export default Home;