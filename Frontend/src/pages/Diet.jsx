import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import 'chart.js/auto';
import '../App.css';

const Diet = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [dailyTarget, setDailyTarget] = useState(2000);
  const [newTarget, setNewTarget] = useState('');
  const [foodItem, setFoodItem] = useState('');
  const [foodLog, setFoodLog] = useState([]);
  const [remaining, setRemaining] = useState(0);
  const [message, setMessage] = useState('');
  const [setForMonth, setSetForMonth] = useState(false);

  const token = localStorage.getItem('token');

  const fetchFoodLog = async () => {
    try {
      const res = await axios.get(`https://healthvault-atbd.onrender.com/api/diet/${selectedDate}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = res.data;
      setFoodLog(data.foodItems || []);
      setDailyTarget(data.dailyTarget || 2000);

      const total = data.foodItems?.reduce((acc, item) => acc + item.calories, 0) || 0;
      const rem = (data.dailyTarget || 2000) - total;

      setRemaining(rem);
      setMessage(rem <= 0 ? '🎉 Goal reached!' : '🥗 Keep going!');
    } catch (err) {
      console.error('Error fetching food log:', err);
      setFoodLog([]);
      setRemaining(dailyTarget);
      setMessage('⚠️ Failed to fetch food log.');
    }
  };

  useEffect(() => {
    fetchFoodLog();
  }, [selectedDate]);

  const handleAddFood = async (e) => {
    e.preventDefault();
    if (!foodItem) return;

    try {
      await axios.post('https://healthvault-atbd.onrender.com/api/diet/add', {
        foodItem,
        date: selectedDate
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setFoodItem('');
      fetchFoodLog();
    } catch (err) {
      console.error('Error adding food:', err);
    }
  };

  const handleSetTarget = async () => {
    try {
      await axios.post('https://healthvault-atbd.onrender.com/api/diet/target', {
        target: Number(newTarget),
        date: selectedDate,
        setForMonth
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setNewTarget('');
      setSetForMonth(false);
      fetchFoodLog();
    } catch (err) {
      console.error('Error setting target:', err);
    }
  };

  const chartData = {
    labels: foodLog.map(item => item.name),
    datasets: [{
      data: foodLog.map(item => item.calories),
      backgroundColor: ['#81c784', '#aed581', '#c8e6c9', '#4caf50', '#2e7d32'],
    }]
  };

  return (
    <div className="container mt-4 diet-wrapper">
      <h2 className="text-success mb-3 animated">🥗 Daily Diet Tracker</h2>

      <div className="card p-4 shadow-sm mb-4">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">📅 Select Date</label>
            <input
              type="date"
              className="form-control"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">🔥 Set Daily Calorie Target</label>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                placeholder="e.g. 1800"
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
              />
              <button className="btn btn-outline-success" onClick={handleSetTarget}>Set</button>
            </div>
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                checked={setForMonth}
                onChange={() => setSetForMonth(!setForMonth)}
                id="monthCheckbox"
              />
              <label className="form-check-label" htmlFor="monthCheckbox">
                Apply to entire month
              </label>
            </div>
          </div>
        </div>

        <h5 className="mt-3">🎯 Target: {dailyTarget} kcal</h5>
        <h6 className={remaining <= 0 ? 'text-success' : 'text-warning'}>
          🧮 Remaining: {remaining} kcal
        </h6>
        <p>{message}</p>

        <form onSubmit={handleAddFood} className="mt-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Enter food item (e.g., Rice)"
            value={foodItem}
            onChange={e => setFoodItem(e.target.value)}
            required
          />
          <button className="btn btn-success w-100">Add Food</button>
        </form>
      </div>

      {foodLog.length > 0 && (
        <div className="mb-5">
          <h5>📊 Calorie Breakdown</h5>
          <Pie data={chartData} />

          <h5 className="mt-4">📋 Food Log for {selectedDate}</h5>
          <div className="row mt-3">
            {foodLog.map((item, index) => (
              <div key={index} className="col-sm-6 col-md-4 col-lg-3 mb-3">
                <div className="card shadow-sm p-3 h-100">
                  <h6 className="mb-1">{item.name}</h6>
                  <p className="mb-0 text-muted">Calories: {item.calories} kcal</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Diet;
