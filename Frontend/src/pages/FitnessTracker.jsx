// pages/FitnessTracker.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const FitnessTracker = () => {
  const [fitness, setFitness] = useState(null);
  const [steps, setSteps] = useState(0);
  const [monthly, setMonthly] = useState([]);
  const [targetInput, setTargetInput] = useState('');
  const [useMonthly, setUseMonthly] = useState(false);
  const token = localStorage.getItem('token');

  const fetchToday = async () => {
    const res = await axios.get('http://localhost:5000/api/fitness', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setFitness(res.data);
    setTargetInput(res.data?.target || '');
  };

  const fetchMonthly = async () => {
    const res = await axios.get('http://localhost:5000/api/fitness/monthly', {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMonthly(res.data);
  };

  const setTarget = async () => {
    await axios.post(
      'http://localhost:5000/api/fitness/set-target',
      { target: parseInt(targetInput), useForMonth: useMonthly },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchToday();
    alert('Target updated successfully!');
  };

  const updateSteps = async () => {
    if (!steps) return;
    await axios.post(
      'http://localhost:5000/api/fitness/update',
      { steps: parseInt(steps) },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setSteps(0);
    fetchToday();
  };

  useEffect(() => {
    fetchToday();
    fetchMonthly();
  }, []);

  const remaining = fitness ? fitness.target - fitness.stepsWalked : 0;

  const barData = {
    labels: monthly.map((d) => moment(d.date).format('D MMM')),
    datasets: [
      {
        label: 'Steps Walked',
        backgroundColor: '#4CAF50',
        data: monthly.map((d) => d.stepsWalked),
      },
    ],
  };

  const remainingData = {
    labels: monthly.map((d) => moment(d.date).format('D MMM')),
    datasets: [
      {
        label: 'Remaining Steps',
        backgroundColor: '#FF5722',
        data: monthly.map((d) => Math.max(d.target - d.stepsWalked, 0)),
      },
    ],
  };

  return (
    <div className="container mt-5 px-3">
    {/* Goal Setting Card */}
    <div className="card p-4 shadow mb-4">
      <h4 className="mb-3 text-primary text-center text-md-start">🎯 Set Your Step Goal</h4>
  
      <div className="mb-3">
        <label className="form-label fw-bold">Enter Daily Target:</label>
        <input
          type="number"
          className="form-control"
          value={targetInput}
          onChange={(e) => setTargetInput(e.target.value)}
          placeholder="e.g. 5000"
        />
      </div>
  
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          checked={useMonthly}
          onChange={(e) => setUseMonthly(e.target.checked)}
          id="monthlyTargetCheck"
        />
        <label className="form-check-label" htmlFor="monthlyTargetCheck">
          Apply this goal for the entire month
        </label>
      </div>
  
      <div className="d-grid d-md-block">
        <button className="btn btn-primary w-100 w-md-auto" onClick={setTarget}>
          ✅ Save Goal
        </button>
      </div>
    </div>
  
    {/* Daily Status */}
    <div className="card p-4 shadow mb-4">
      <h3 className="text-success mb-3 text-center text-md-start">🚶‍♂️ Daily Fitness Tracker</h3>
  
      {fitness && (
        <>
          <h5 className="text-center my-3">
            {remaining > 0 ? (
              <span className="text-warning">
                💪 More {remaining} steps to go today!
              </span>
            ) : (
              <span className="text-success">
                🎉 You nailed your goal! Great job!
              </span>
            )}
          </h5>
  
          <div className="mb-3">
            <label className="form-label">Steps walked (since last):</label>
            <input
              type="number"
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              className="form-control"
            />
          </div>
  
          <div className="d-grid d-md-block">
            <button className="btn btn-success w-100 w-md-auto" onClick={updateSteps}>
              ➕ Add Steps
            </button>
          </div>
        </>
      )}
    </div>
  
    {/* Charts */}
    <div className="card p-4 shadow mt-4 mb-4">
      <h4 className="mb-3 text-center text-md-start">📊 Monthly Steps Analysis</h4>
      <div className="chart-container" style={{ overflowX: 'auto' }}>
        <Bar data={barData} />
      </div>
    </div>
  
    <div className="card p-4 shadow mb-5">
      <h4 className="mb-3 text-center text-md-start">📉 Remaining Steps Analysis</h4>
      <div className="chart-container" style={{ overflowX: 'auto' }}>
        <Bar data={remainingData} />
      </div>
    </div>
  </div>
  
  );
};

export default FitnessTracker;
