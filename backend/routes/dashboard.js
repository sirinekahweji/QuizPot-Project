// routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');

const { getDashboardData } = require('../controllers/dashboardController');

router.get('/dashboard',requireAuth ,getDashboardData);

module.exports = router;
