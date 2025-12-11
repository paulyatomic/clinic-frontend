import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API_URL from './config'; 
import './App.css'; 

const Admin = () => {
  const [appointments, setAppointments] = useState([]);
  const [activeTab, setActiveTab] = useState('Pending');
  
  const [viewAppt, setViewAppt] = useState(null);
  const [rescheduleAppt, setRescheduleAppt] = useState(null);
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  // 1. Fetch Data on Load
  useEffect(() => {
    fetchAppointments();
  }, []);

  // 2. Clear Modals when switching tabs
  useEffect(() => {
    setRescheduleAppt(null);
    setViewAppt(null);
  }, [activeTab]);

  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${API_URL}/appointments`);
      const data = await res.json();
      const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));
      setAppointments(sortedData);
    } catch (err) { console.error("Error fetching data:", err); }
  };

  const calculateAge = (birthday) => {
    const dob = new Date(birthday);
    const diff_ms = Date.now() - dob.getTime();
    const age_dt = new Date(diff_ms); 
    return Math.abs(age_dt.getUTCFullYear() - 1970);
  };

  // --- ACTION: APPROVE / DONE ---
  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/appointment/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      
      if (res.ok) {
        const updatedItem = await res.json();
        setAppointments(prev => prev.map(appt => 
          appt._id === id ? { ...appt, status: updatedItem.status } : appt
        ));
      }
    } catch (err) { console.error(err); }
  };

  // --- ACTION: RESCHEDULE (No Alerts) ---
  const handleRescheduleSubmit = async () => {
    // Simple check to ensure data exists
    if (!newDate || !newTime) return; 

    try {
      const res = await fetch(`${API_URL}/appointment/${rescheduleAppt._id}`, {
        method: 'PATCH', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          status: 'Rescheduled', 
          date: newDate, 
          time: newTime 
        })
      });
      
      if (res.ok) {
        // 1. Instantly update the list on the screen (So it moves tabs immediately)
        setAppointments(prev => prev.map(appt => 
            appt._id === rescheduleAppt._id ? { ...appt, status: 'Rescheduled', date: newDate, time: newTime } : appt
        ));
        
        // 2. Close the modal immediately
        setRescheduleAppt(null);
        setNewDate('');
        setNewTime('');
        
        // (No alerts here anymore)
      }
    } catch (err) { console.error(err); }
  };

  // --- ACTION: DELETE ---
  const deleteAppointment = async (id) => {
    if (window.confirm("Are you sure you want to PERMANENTLY delete this record?")) {
      try {
        const res = await fetch(`${API_URL}/appointment/${id}`, {
          method: 'DELETE'
        });
        
        if (res.ok || res.status === 204) {
          setAppointments(prev => prev.filter(appt => appt._id !== id));
        }
      } catch (err) { console.error(err); }
    }
  };

  // Filter Logic
  const filteredAppointments = appointments.filter(appt => {
    if (activeTab === 'Done') return appt.status === 'Completed';
    return (appt.status || 'Pending') === activeTab;
  });

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Link to="/"><button className="back-home-btn">← Home</button></Link>
          <h2>Clinic Management</h2>
        </div>
      </div>

      <div className="admin-tabs">
        {['Pending', 'Approved', 'Rescheduled', 'Done'].map((tab) => (
          <button 
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`} 
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'Done' ? 'History / Done' : tab}
          </button>
        ))}
      </div>

      <div className="table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th style={{ width: '13%' }}>Date & Time</th>
              <th style={{ width: '18%' }}>Patient Name</th>
              <th style={{ width: '12%' }}>Status</th>
              <th style={{ width: '15%' }}>Contact</th>
              <th style={{ width: '15%' }}>Emergency</th>
              <th style={{ width: '27%', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appt) => (
                <tr key={appt._id}>
                  <td>
                    <div className="date-cell">{appt.date}</div>
                    <div className="time-cell">{appt.time}</div>
                  </td>
                  <td>
                    <strong>{appt.firstName} {appt.lastName}</strong><br/>
                    <span className="sub-text">{appt.sex}, {calculateAge(appt.birthday)} yrs</span>
                  </td>
                  
                  <td>
                    <span className={`status-badge ${appt.status || 'Pending'}`}>
                      {appt.status || 'Pending'}
                    </span>
                  </td>

                  <td>{appt.phone}</td>
                  <td>
                    {appt.emergencyName}<br/>
                    <span className="sub-text">{appt.emergencyPhone}</span>
                  </td>
                  
                  <td>
                    <div className="action-buttons">
                      <button className="btn-view" onClick={() => setViewAppt(appt)}>View</button>
                      <div className="btn-divider"></div>

                      {activeTab === 'Pending' && (
                        <>
                          <button className="btn-approve" onClick={() => updateStatus(appt._id, 'Approved')}>Approve</button>
                          <button className="btn-reschedule" onClick={() => setRescheduleAppt(appt)}>Reschedule</button>
                        </>
                      )}

                      {activeTab === 'Approved' && (
                        <>
                          <button className="btn-done" onClick={() => updateStatus(appt._id, 'Completed')}>Done</button>
                          <button className="btn-reschedule" onClick={() => setRescheduleAppt(appt)}>Reschedule</button>
                        </>
                      )}

                      {activeTab === 'Rescheduled' && (
                          <button className="btn-approve" onClick={() => updateStatus(appt._id, 'Approved')}>Approve</button>
                      )}

                      {(activeTab !== 'Done' || activeTab === 'Done') && (
                        <button className="btn-delete" onClick={() => deleteAppointment(appt._id)}>Delete</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="empty-state">No {activeTab} appointments found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {viewAppt && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Patient Details</h3>
            <div className="modal-grid">
              <p><strong>Name:</strong> {viewAppt.firstName} {viewAppt.lastName}</p>
              <p><strong>Age/Sex:</strong> {calculateAge(viewAppt.birthday)} / {viewAppt.sex}</p>
              <p><strong>Status:</strong> <span className={`status-badge ${viewAppt.status || 'Pending'}`}>{viewAppt.status || 'Pending'}</span></p>
              <p><strong>Phone:</strong> {viewAppt.phone}</p>
              <p><strong>Email:</strong> {viewAppt.email}</p>
              <p><strong>Address:</strong> {viewAppt.address}</p>
              <p><strong>Emergency:</strong> {viewAppt.emergencyName} ({viewAppt.emergencyPhone})</p>
              <p><strong>Reason:</strong> {viewAppt.reason || "None"}</p>
            </div>
            <button className="close-btn" onClick={() => setViewAppt(null)}>Close</button>
          </div>
        </div>
      )}

      {rescheduleAppt && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Reschedule Appointment</h3>
            <p>Current: {rescheduleAppt.date} at {rescheduleAppt.time}</p>
            <div className="modal-form">
              <label>New Date:</label>
              <input type="date" className="form-input" onChange={(e) => setNewDate(e.target.value)} />
              <label>New Time:</label>
              <input type="time" className="form-input" onChange={(e) => setNewTime(e.target.value)} />
            </div>
            <div className="modal-actions">
              <button className="close-btn" onClick={() => setRescheduleAppt(null)} style={{background:'#666'}}>Cancel</button>
              <button className="close-btn" onClick={handleRescheduleSubmit} style={{background:'#1e90ff'}}>Confirm Move</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;