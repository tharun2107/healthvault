

// routes/fitness.js
const express = require('express');
const router = express.Router();
const Fitness = require('../models/Fitness');
const auth = require('../middleware/authMiddleware');
const moment = require('moment');

// Get today's fitness data
router.get('/', auth, async (req, res) => {
  const today = moment().format('YYYY-MM-DD');
  let data = await Fitness.findOne({ userId: req.user._id, date: today });

  if (!data) {
    // Use last fixedMonthly data or default
    const last = await Fitness.findOne({ userId: req.user._id }).sort({ date: -1 });
    const target = last?.fixedMonthly ? last.target : 1000;
    data = await Fitness.create({ userId: req.user._id, date: today, target });
  }

  res.json(data);
});

// Update steps walked
router.post('/update', auth, async (req, res) => {
  const { steps } = req.body;
  const today = moment().format('YYYY-MM-DD');

  let data = await Fitness.findOne({ userId: req.user._id, date: today });
  if (!data) return res.status(404).json({ message: 'Data not found' });

  data.stepsWalked += steps;
  await data.save();
  res.json(data);
});

// // Set target (can set fixed for month)
// router.post('/set-target', auth, async (req, res) => {
//     const { target, fixedMonthly } = req.body;
//     console.log('Target:', target, 'Fixed Monthly:', fixedMonthly);
//     console.log('USER:', req.user); // 🧪 Test here
//   const today = moment().format('YYYY-MM-DD');

//   let data = await Fitness.findOne({ userId: req.user._id, date: today });
//   if (!data) {
//     data = await Fitness.create({ userId: req.user._id, date: today, target, fixedMonthly });
//   } else {
//     data.target = target;
//     data.fixedMonthly = fixedMonthly;
//     await data.save();
//   }
//   res.json(data);
// });
router.post('/set-target', auth, async (req, res) => {
    const { target, fixedMonthly } = req.body;
    const today = moment().format('YYYY-MM-DD');
  
    console.log('USER:', req.user); // 🧪 Test here
  
    let data = await Fitness.findOne({ userId: req.user._id, date: today });
  
    if (!data) {
      data = await Fitness.create({ userId: req.user._id, date: today, target, fixedMonthly });
    } else {
      data.target = target;
      data.fixedMonthly = fixedMonthly;
      await data.save();
    }
    res.json(data);
  });
  
// Get monthly data
router.get('/monthly', auth, async (req, res) => {
  const start = moment().startOf('month').format('YYYY-MM-DD');
  const end = moment().endOf('month').format('YYYY-MM-DD');

  const data = await Fitness.find({
    userId: req.user._id,
    date: { $gte: start, $lte: end }
  });

  res.json(data);
});

module.exports = router;

