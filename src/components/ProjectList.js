import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProjectList = ({ appointments, toggleStatus, onBook, onCancel }) => {
  // Local state for the Booking Form
  const [form, setForm] = useState({ patientName: '', doctor: 'Dr. Smith', date: '', type: 'Check-up' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!form.patientName || !form.date) return alert("Please fill in details");
    
    onBook(form); // Call parent function
    setForm({ patientName: '', doctor: 'Dr. Smith', date: '', type: 'Check-up' }); // Reset
  };

  return (
    <div className="project-container">
      
      {/* 1. BOOKING FORM SECTION */}
      <div className="project-card" style={{ marginBottom: '2rem', borderLeft: '5px solid #28a745' }}>
        <h2 style={{marginTop:0}}>📅 Book Appointment</h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '10px' }}>
            <input 
                placeholder="Patient Name" 
                value={form.patientName}
                onChange={e => setForm({...form, patientName: e.target.value})}
                style={{padding: '8px'}}
            />
            <div style={{display:'flex', gap:'10px'}}>
                <select 
                    value={form.doctor}
                    onChange={e => setForm({...form, doctor: e.target.value})}
                    style={{padding: '8px', flex:1}}
                >
                    <option>Dr. Smith (General)</option>
                    <option>Dr. Jones (Pediatrics)</option>
                    <option>Dr. Doe (Neurology)</option>
                </select>
                <input 
                    type="date" 
                    value={form.date}
                    onChange={e => setForm({...form, date: e.target.value})}
                    style={{padding: '8px', flex:1}}
                />
            </div>
            <button className="btn" style={{backgroundColor: '#28a745'}}>Confirm Booking</button>
        </form>
      </div>

      {/* 2. APPOINTMENT LIST SECTION */}
      <h2>Today's Schedule ({appointments.length})</h2>
      <div className="card-grid">
        {appointments.map((appt) => (
          <div key={appt._id} className="project-card">
            <div style={{display:'flex', justifyContent:'space-between'}}>
                <h3>{appt.patientName}</h3>
                <small>{appt.date}</small>
            </div>
            
            <p style={{color: '#666'}}>
                <strong>Doctor:</strong> {appt.doctor} <br/>
                <strong>Type:</strong> {appt.type}
            </p>

            <p>
                <strong>Status:</strong> 
                <span className={`status-${appt.status === 'Completed' ? 'completed' : 'pending'}`} style={{marginLeft: '5px'}}>
                    {appt.status}
                </span>
            </p>
            
            <div style={{marginTop: '15px'}}>
                <button className="btn-small" onClick={() => toggleStatus(appt._id)}>
                    {appt.status === 'Completed' ? 'Undo Check-in' : 'Check In'}
                </button>
                
                <button className="btn-small" onClick={() => onCancel(appt._id)} style={{backgroundColor:'#dc3545', marginLeft:'5px'}}>
                    Cancel
                </button>

                <Link to={`/project/${appt._id}`} className="details-link" style={{marginLeft: '15px'}}>
                Details →
                </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;