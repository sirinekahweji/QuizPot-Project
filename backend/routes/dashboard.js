// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const { getDashboardData } = require('../controllers/dashboardController');

router.get('/dashboard', getDashboardData);

module.exports = router;
