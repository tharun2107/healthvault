import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { toast } from 'react-toastify';

export default function SleepPage() {
  const [wakeTime, setWakeTime] = useState('07:00');
  const [sleepTime, setSleepTime] = useState('22:00');
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [applyToMonth, setApplyToMonth] = useState(false);

  const handleSave = async () => {
    try {
      await axios.post('https://healthvault-atbd.onrender.com/api/sleep/set', {
        wakeTime,
        sleepTime,
        date,
        applyToMonth
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success('Sleep schedule saved!');
    } catch (err) {
      toast.error('Failed to save sleep schedule');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">🛌 Sleep Schedule</h1>

      <label className="block mb-2 font-semibold">Select Date</label>
      <input
        type="date"
        className="w-full mb-4 p-2 border rounded"
        value={date}
        onChange={e => setDate(e.target.value)}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold">Wake Time</label>
          <input
            type="time"
            className="w-full p-2 border rounded"
            value={wakeTime}
            onChange={e => setWakeTime(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Sleep Time</label>
          <input
            type="time"
            className="w-full p-2 border rounded"
            value={sleepTime}
            onChange={e => setSleepTime(e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center mt-4">
        <input
          type="checkbox"
          checked={applyToMonth}
          onChange={() => setApplyToMonth(!applyToMonth)}
          className="mr-2"
        />
        <label>Apply to entire month</label>
      </div>

      <button
        onClick={handleSave}
        className="mt-15 w-full bg-green-600 text-green py-2 rounded hover:bg-green-700 transition"
      >
        Save Schedule
      </button>
    </div>
  );
}