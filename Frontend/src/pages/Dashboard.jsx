// src/pages/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../App.css'; // Optional custom CSS

AOS.init();

const Dashboard = () => {
  return (
    <>
      <div className="hero-section text-white text-center d-flex align-items-center justify-content-center" style={{ height: '90vh', backgroundImage: 'url(https://source.unsplash.com/1600x900/?health,fitness)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="bg-dark bg-opacity-50 p-5 rounded">
          <h1 className="display-4 fw-bold" data-aos="fade-up">Welcome to HealthVault</h1>
          <p className="lead mt-3" data-aos="fade-up" data-aos-delay="200">Your Personalized Wellness Companion</p>
          <Link to="/track" className="btn btn-success btn-lg mt-4" data-aos="zoom-in" data-aos-delay="400">Start Tracking</Link>
        </div>
      </div>

      <div className="container py-5">
        <h2 className="text-center text-success mb-5" data-aos="fade-right">Features</h2>
        <div className="row g-4">
          {[
            { title: 'Diet Tracking', img: 'https://source.unsplash.com/400x300/?healthy,food' },
            { title: 'Sleep Monitoring', img: 'https://source.unsplash.com/400x300/?sleep,bed' },
            { title: 'Fitness Goals', img: 'https://source.unsplash.com/400x300/?fitness,gym' },
            { title: 'Medication Reminders', img: 'https://source.unsplash.com/400x300/?medicine,reminder' },
            { title: 'Menstruation Tracker', img: 'https://source.unsplash.com/400x300/?female,calendar' },
            { title: 'Overall Wellness', img: 'https://source.unsplash.com/400x300/?wellness,mindfulness' }
          ].map((feature, i) => (
            <div className="col-md-4" key={i} data-aos="zoom-in" data-aos-delay={`${i * 100}`}>
              <div className="card h-100 shadow-sm border-0">
                <img src={feature.img} alt={feature.title} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title text-success">{feature.title}</h5>
                  <p className="card-text">Track your {feature.title.toLowerCase()} with smart analytics and reminders.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-light py-5">
        <div className="container text-center">
          <h2 className="text-success mb-4" data-aos="fade-up">Why Choose HealthVault?</h2>
          <p className="lead mb-4" data-aos="fade-up" data-aos-delay="200">We blend modern tech with holistic health approaches to give you the best wellness tracking experience.</p>
          <div className="row justify-content-center">
            {['AI-based Recommendations', 'Real-time Tracking', 'Fully Personalized'].map((item, i) => (
              <div className="col-md-3" key={i} data-aos="flip-up" data-aos-delay={`${i * 150}`}>
                <div className="p-3 shadow rounded bg-white mb-3">
                  <h5 className="text-success">{item}</h5>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-5">
        <h2 className="text-center text-success mb-4" data-aos="fade-right">What Our Users Say</h2>
        <div className="row justify-content-center">
          {[{
            name: 'Aarav K.',
            msg: 'HealthVault helped me lose 10kgs and stay fit with regular insights.',
            img: 'https://randomuser.me/api/portraits/men/45.jpg'
          }, {
            name: 'Sneha R.',
            msg: 'The menstrual tracker is spot on and very intuitive!',
            img: 'https://randomuser.me/api/portraits/women/65.jpg'
          }].map((user, i) => (
            <div className="col-md-5" key={i} data-aos="fade-up" data-aos-delay={`${i * 200}`}>
              <div className="card mb-4 shadow-sm border-0 p-3">
                <div className="d-flex align-items-center">
                  <img src={user.img} alt={user.name} className="rounded-circle me-3" width="60" />
                  <div>
                    <h6 className="mb-0 text-success">{user.name}</h6>
                    <p className="text-muted mb-1">{user.msg}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-success text-white py-4">
        <div className="container text-center">
          <p>&copy; 2025 HealthVault. All rights reserved.</p>
          <p>Contact: healthvault@app.com | +91 9876543210</p>
          <div>
            <a href="#" className="text-white me-3">Instagram</a>
            <a href="#" className="text-white me-3">Twitter</a>
            <a href="#" className="text-white">LinkedIn</a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Dashboard;
