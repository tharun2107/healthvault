// --- Frontend (React + Bootstrap) ---
// pages/MenstruationPage.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const MenstruationPage = () => {
  const [lastPeriodDate, setLastPeriodDate] = useState('');
  const [nextPeriod, setNextPeriod] = useState(null);
  const [showArrivedPrompt, setShowArrivedPrompt] = useState(false);

  // 🔐 Fetch token from localStorage
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios
        .get('https://healthvault-atbd.onrender.com/api/menstruation', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data?.lastPeriodDate) {
          const date = moment(res.data.lastPeriodDate);
          setLastPeriodDate(date.format('YYYY-MM-DD'));
          const next = date.clone().add(30, 'days');
          setNextPeriod(next);

          const diff = moment().diff(next, 'days');
          if (diff >= 0 && diff <= 3) {
            setShowArrivedPrompt(true);
          }
        }
      })
      .catch((err) => {
        console.error('Error fetching menstruation data:', err.message);
      });
  }, [token]);

  const handleSubmit = async () => {
    try {
      await axios.post(
          'https://healthvault-atbd.onrender.com/api/menstruation',
        { lastPeriodDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Updated successfully!');
    } catch (err) {
      console.error('Error updating date:', err.message);
      alert('Something went wrong while updating.');
    }
  };

  const handleConfirmArrival = async () => {
    const today = moment().format('YYYY-MM-DD');
    setLastPeriodDate(today);

    try {
      await axios.post(
          'https://healthvault-atbd.onrender.com/api/menstruation',
        { lastPeriodDate: moment().toISOString() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowArrivedPrompt(false);
      alert('Period date updated. Stay strong ❤️');
    } catch (err) {
      console.error('Error confirming arrival:', err.message);
      alert('Error confirming period arrival.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow rounded p-4">
        <h3 className="mb-4 text-danger">🩸 Menstruation Tracker</h3>

        <div className="mb-3">
          <label className="form-label fw-bold">Last Period Date</label>
          <input
            type="date"
            className="form-control"
            value={lastPeriodDate}
            onChange={(e) => setLastPeriodDate(e.target.value)}
          />
        </div>

        <button className="btn btn-danger" onClick={handleSubmit}>
          Update Date
        </button>

        {nextPeriod && (
          <div className="alert alert-info mt-4">
            Your next expected period is on:{' '}
            <strong>{nextPeriod.format('MMMM D, YYYY')}</strong>
          </div>
        )}

        {showArrivedPrompt && (
          <div className="alert alert-warning mt-4">
            <h5>🩸 Is your period started today?</h5>
            <button
              className="btn btn-outline-danger mt-2"
              onClick={handleConfirmArrival}
            >
              Yes, update to today
            </button>
          </div>
        )}

        <div className="mt-5 text-center text-muted">
          <p>
            <i>“Taking care of yourself is part of loving yourself.”</i>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MenstruationPage;
