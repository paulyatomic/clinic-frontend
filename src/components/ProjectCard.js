import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Added this import for the link

const ProjectCard = () => {
  // Logic for "Show Problem / Show Solution"
  const [showSolution, setShowSolution] = useState(false);
  
  // Logic for "Patient vs Admin" Tabs
  const [activeTab, setActiveTab] = useState('patient');

  return (
    <section className="project-details" style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <h2>Project Overview</h2>
      <p>Community clinics often face long queues and disorganized appointment records due to manual scheduling. Our project aims to solve this by providing an efficient and secure web-based appointment system that allows patients to book their consultations online.</p>
      <br></br>
      
      <h3>Problem Statement</h3>
      
      {/* Toggle Logic: Show Problem if solution is false */}
      {!showSolution && (
        <ul id="problem-list">
          <li>Overlapping appointments and wasted time.</li>
          <li>Difficulty in managing patient records.</li>
          <li>Poor patient experience due to long waiting times.</li>
        </ul>
      )}

      {/* Toggle Logic: Show Solution if solution is true */}
      {showSolution && (
        <div id="solution-section">
          <h3>Proposed Solution</h3>
          <p>The Clinic Appointment Scheduler provides an online platform for booking, managing, and tracking appointments. It stores patient data securely and sends automated reminders to minimize no-shows and improve clinic efficiency.</p>
        </div>
      )}

      <button className="btn" onClick={() => setShowSolution(!showSolution)} style={{ marginTop: '10px', padding: '10px 20px', cursor: 'pointer' }}>
        {showSolution ? "Show Problem" : "Show Solution"}
      </button>

      <br /><br />

      <h3>Key Features</h3>
      <div className="tabs" style={{ marginBottom: '15px' }}>
        <button 
          className={`tab-btn ${activeTab === 'patient' ? 'active' : ''}`} 
          onClick={() => setActiveTab('patient')}
          style={{ marginRight: '10px', padding: '8px 16px', cursor: 'pointer', fontWeight: activeTab === 'patient' ? 'bold' : 'normal' }}
        >
          Patient Side
        </button>
        <button 
          className={`tab-btn ${activeTab === 'admin' ? 'active' : ''}`} 
          onClick={() => setActiveTab('admin')}
          style={{ padding: '8px 16px', cursor: 'pointer', fontWeight: activeTab === 'admin' ? 'bold' : 'normal' }}
        >
          Admin Side
        </button>
      </div>

      {/* Tab Content Logic */}
      {activeTab === 'patient' && (
        <div className="tab-content" style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
          <ol>
            <li><strong>Online Appointment Booking:</strong> Patients can book appointments anytime and anywhere.</li>
            <li><strong>Reminder System:</strong> Sends alerts to patients about upcoming appointments.</li>
          </ol>
        </div>
      )}

      {activeTab === 'admin' && (
        <div className="tab-content" style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
          <ol>
            <li><strong>Database:</strong> Stores patient profiles.</li>
            <li><strong>Dashboard:</strong> Manage bookings efficiently.</li>
          </ol>
        </div>
      )}

      {/* --- NEW ADMIN LINK SECTION --- */}
      <div style={{ textAlign: 'center', marginTop: '60px', borderTop: '1px solid #ddd', paddingTop: '30px' }}>
        <p style={{ marginBottom: '15px', fontStyle: 'italic', color: '#888' }}>Authorized Personnel Only</p>
        <Link to="/admin">
          <button style={{ 
            backgroundColor: '#374151', 
            color: 'white', 
            padding: '12px 25px', 
            borderRadius: '6px', 
            border: 'none', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}>
            Access Admin Panel
          </button>
        </Link>
      </div>

    </section>
  );
};

export default ProjectCard;