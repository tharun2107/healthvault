// src/pages/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    goals: [],
    age: '',
    gender: '',
    height: '',
    weight: '',
    focus: '',
    diet: ''
  });
  const navigate = useNavigate();

  const handleCheckbox = (goal) => {
    const newGoals = formData.goals.includes(goal)
      ? formData.goals.filter(g => g !== goal)
      : [...formData.goals, goal];
    setFormData({ ...formData, goals: newGoals });
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleNext = () => {
    if (step === 1) {
      const { username, email, password, confirmPassword } = formData;
      if (!username || !email || !password || !confirmPassword) {
        return alert("Please fill all fields");
      }
      if (password !== confirmPassword) {
        return alert("Passwords do not match");
      }
      setStep(2);
    } else if (step === 2) {
      if (formData.goals.length === 0) return alert("Select at least one goal");
      setStep(3);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
        const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        alert('Signup successful!');
        navigate('/dashboard');
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert('Signup failed');
      console.error(err);
    }
  };
  

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card p-4 shadow w-100" style={{ maxWidth: '600px' }}>
        <h2 className="text-center text-success mb-4">Signup</h2>
        {step === 1 && (
          <>
            <div className="mb-3">
              <label>Username</label>
              <input type="text" name="username" className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Email</label>
              <input type="email" name="email" className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input type="password" name="password" className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Confirm Password</label>
              <input type="password" name="confirmPassword" className="form-control" onChange={handleChange} required />
            </div>
            <button className="btn btn-success w-100" onClick={handleNext}>Next</button>
          </>
        )}

        {step === 2 && (
          <>
            <p>Select your primary goals (at least one):</p>
            {['Diet', 'Sleep', 'Fitness', 'Overall', 'Medication', 'Menstruation'].map((goal) => (
              <div className="form-check" key={goal}>
                <input className="form-check-input" type="checkbox" onChange={() => handleCheckbox(goal)} checked={formData.goals.includes(goal)} />
                <label className="form-check-label">{goal}</label>
              </div>
            ))}
            <button className="btn btn-success mt-3 w-100" onClick={handleNext}>Next</button>
          </>
        )}

        {step === 3 && (
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>Age</label>
              <input type="number" name="age" className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label>Gender</label>
              <select name="gender" className="form-control" onChange={handleChange} required>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="row">
              <div className="col">
                <label>Height (cm)</label>
                <input type="number" name="height" className="form-control" onChange={handleChange} required />
              </div>
              <div className="col">
                <label>Weight (kg)</label>
                <input type="number" name="weight" className="form-control" onChange={handleChange} required />
              </div>
            </div>
            <div className="mb-3 mt-3">
              <label>Health Focus</label>
              <select name="focus" className="form-control" onChange={handleChange} required>
                <option value="">Choose</option>
                <option>Weight Loss</option>
                <option>Weight Gain</option>
                <option>Muscle Build</option>
                <option>Stay Healthy</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Food Habit</label>
              <select name="diet" className="form-control" onChange={handleChange} required>
                <option value="">Choose</option>
                <option>Vegan</option>
                <option>Vegetarian</option>
                <option>Non-Vegetarian</option>
                <option>Pescatarian</option>
                <option>Flexitarian</option>
              </select>
            </div>
            <button className="btn btn-success w-100">Enroll</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;
