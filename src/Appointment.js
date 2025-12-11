import API_URL from './config';
import React, { useState } from 'react';
import './App.css'; 

const Appointment = () => {
  const [step, setStep] = useState(1);
  
  // Data States
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [details, setDetails] = useState({ 
    firstName: '', lastName: '', sex: '', birthday: '',
    email: '', phone: '', address: '', maritalStatus: '',
    emergencyName: '', emergencyPhone: '', reason: '' 
  });

  // UI States
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const timeSlots = [
    "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM",
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
    "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM",
    "07:00 PM", "07:30 PM", "08:00 PM", "08:30 PM",
    "09:00 PM", "09:30 PM", "10:00 PM"
  ];

  // --- VALIDATION & NAVIGATION ---
  const validateStep2 = () => {
    if (!details.firstName || !details.lastName || !details.sex || 
        !details.birthday || !details.email || !details.phone || 
        !details.address || !details.maritalStatus || 
        !details.emergencyName || !details.emergencyPhone) {
      setError("Please fill out all required fields.");
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll up to show error
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(details.email)) {
      setError("Please enter a valid email address.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return false;
    }
    if (details.phone.length < 11 || details.emergencyPhone.length < 11) {
      setError("Phone numbers must be at least 11 digits.");
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return false;
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (step === 2) {
      if (validateStep2()) {
        setStep(step + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // <--- SCROLL TO TOP
      }
    } else {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' }); // <--- SCROLL TO TOP
    }
  };

  const handleBack = () => {
    setError('');
    setStep(step - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // <--- SCROLL TO TOP
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phone' || name === 'emergencyPhone') {
      if (value === '' || /^[0-9\b]+$/.test(value)) {
        setDetails({ ...details, [name]: value });
      }
    } else {
      setDetails({ ...details, [name]: value });
    }
  };

  // --- SUBMIT TO BACKEND ---
  const handleSubmit = async () => {
    setIsSubmitting(true);
    const appointmentData = { date, time, ...details };

    try {
      // OLD: const response = await fetch('http://localhost:5000/api/book', {
      
      // NEW: Use backticks ( ` ) so we can insert the variable
      const response = await fetch(`${API_URL}/book`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData)
      });
      
      const data = await response.json();
      if (response.ok) {
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top for success message
      } else {
        alert("Booking Failed: " + data.error);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Is the server running?");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="booking-container text-center" style={{ textAlign: 'center', padding: '50px' }}>
        <div className="booking-card">
          <div style={{ color: '#22c55e', fontSize: '4rem', marginBottom: '20px' }}>✓</div>
          <h2 style={{ color: '#000', marginBottom: '10px' }}>Booking Confirmed!</h2>
          <p style={{ color: '#666', marginBottom: '30px' }}>
            Your appointment has been successfully scheduled. <br/>
            We have sent a confirmation to <strong>{details.email}</strong>.
          </p>
          <a href="/">
            <button className="action-btn next">Return to Home</button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-container">
      <div className="progress-bar">
        <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Schedule</div>
        <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Patient Info</div>
        <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Confirm</div>
      </div>

      <div className="booking-card">
        {/* STEP 1 */}
        {step === 1 && (
          <div className="step-content">
            <h2 className="section-header">Select Appointment Slot</h2>
            <label className="section-label">Pick a Date:</label>
            <input type="date" className="date-input" onChange={(e) => setDate(e.target.value)} value={date}/>
            <label className="section-label">Available Time Slots:</label>
            <div className="time-grid">
              {timeSlots.map((slot) => (
                <button key={slot} className={`time-btn ${time === slot ? 'selected' : ''}`} onClick={() => setTime(slot)}>{slot}</button>
              ))}
            </div>
            <div className="actions right">
              <button className="action-btn next" onClick={handleNext} disabled={!date || !time}>Next Step</button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div className="step-content">
            <h2 className="section-header">Patient Information</h2>
            <div className="form-grid">
              <div className="input-group"><label>First Name <span className="required">*</span></label><input name="firstName" className="form-input" onChange={handleChange} value={details.firstName} required /></div>
              <div className="input-group"><label>Last Name <span className="required">*</span></label><input name="lastName" className="form-input" onChange={handleChange} value={details.lastName} required /></div>
              <div className="input-group"><label>Sex <span className="required">*</span></label><select name="sex" className="form-input" onChange={handleChange} value={details.sex} required><option value="">Select...</option><option value="Male">Male</option><option value="Female">Female</option></select></div>
              <div className="input-group"><label>Birthday <span className="required">*</span></label><input type="date" name="birthday" className="form-input" onChange={handleChange} value={details.birthday} required /></div>
              <div className="input-group"><label>Marital Status <span className="required">*</span></label><select name="maritalStatus" className="form-input" onChange={handleChange} value={details.maritalStatus} required><option value="">Select...</option><option value="Single">Single</option><option value="Married">Married</option><option value="Widowed">Widowed</option></select></div>
              <div className="input-group"><label>Email Address <span className="required">*</span></label><input type="email" name="email" className="form-input" onChange={handleChange} value={details.email} required /></div>
              <div className="input-group"><label>Phone Number <span className="required">*</span> (Numbers only)</label><input type="text" name="phone" className="form-input" onChange={handleChange} value={details.phone} maxLength="11" placeholder="09123456789" required /></div>
              <div className="input-group full-width"><label>Home Address <span className="required">*</span></label><input type="text" name="address" className="form-input" onChange={handleChange} value={details.address} required /></div>
              <h3 className="full-width section-title">Emergency Contact</h3>
              <div className="input-group"><label>Contact Person <span className="required">*</span></label><input name="emergencyName" className="form-input" onChange={handleChange} value={details.emergencyName} required /></div>
              <div className="input-group"><label>Emergency Phone <span className="required">*</span> (Numbers only)</label><input name="emergencyPhone" className="form-input" onChange={handleChange} value={details.emergencyPhone} maxLength="11" placeholder="09123456789" required /></div>
            </div>
            <div className="input-group mt-4"><label>Reason for Visit (Optional)</label><textarea name="reason" className="form-textarea" onChange={handleChange} value={details.reason}></textarea></div>
            {error && <p className="error-msg">{error}</p>}
            <div className="actions"><button className="action-btn back" onClick={handleBack}>Back</button><button className="action-btn next" onClick={handleNext}>Review Details</button></div>
          </div>
        )}

        {/* STEP 3 */}
        {step === 3 && (
          <div className="step-content">
            <h2 className="section-header">Review & Confirm</h2>
            <div className="review-card">
              <div className="review-section">
                <h3 className="review-title">Appointment Details</h3>
                <div className="review-row"><span className="review-label">Date:</span><span className="review-value">{date}</span></div>
                <div className="review-row"><span className="review-label">Time:</span><span className="review-value highlight">{time}</span></div>
              </div>
              <div className="review-section">
                <h3 className="review-title">Patient Information</h3>
                <div className="review-row"><span className="review-label">Full Name:</span><span className="review-value">{details.firstName} {details.lastName}</span></div>
                <div className="review-row"><span className="review-label">Sex:</span><span className="review-value">{details.sex}</span></div>
                <div className="review-row"><span className="review-label">Birthday:</span><span className="review-value">{details.birthday}</span></div>
                <div className="review-row"><span className="review-label">Marital Status:</span><span className="review-value">{details.maritalStatus}</span></div>
              </div>
              <div className="review-section">
                <h3 className="review-title">Contact Details</h3>
                <div className="review-row"><span className="review-label">Email:</span><span className="review-value lowercase">{details.email}</span></div>
                <div className="review-row"><span className="review-label">Phone:</span><span className="review-value">{details.phone}</span></div>
                <div className="review-row"><span className="review-label">Address:</span><span className="review-value">{details.address}</span></div>
              </div>
              <div className="review-section no-border">
                <h3 className="review-title">Emergency Contact</h3>
                <div className="review-row"><span className="review-label">Name:</span><span className="review-value">{details.emergencyName}</span></div>
                <div className="review-row"><span className="review-label">Phone:</span><span className="review-value">{details.emergencyPhone}</span></div>
              </div>
            </div>

            <div className="actions">
              <button className="action-btn back" onClick={handleBack} disabled={isSubmitting}>Edit Details</button>
              <button className="action-btn confirm" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Appointment;