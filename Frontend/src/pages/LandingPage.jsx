// src/pages/LandingPage.jsx
import React from 'react';

const LandingPage = () => (
  <div className="text-center bg-light py-5">
    <h1 className="text-success display-4">Welcome to HealthVault</h1>
    <p className="lead">Track your health goals with personalized insights and a clean green interface.</p>
    <img src="https://via.placeholder.com/500x300" alt="Health Hero" className="img-fluid my-4 rounded" />
    <div className="container mt-4">
      <h4>About Us</h4>
      <p>HealthVault is your all-in-one wellness tracker covering diet, fitness, sleep, and more.</p>
    </div>
    <footer className="bg-white border-top mt-5 py-3">
      <p>Contact us: healthvault@example.com | +91-1234567890</p>
    </footer>
  </div>
);

export default LandingPage;