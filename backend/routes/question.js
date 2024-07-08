const express = require('express');
const router = express.Router();
const { generateQuestions } = require('../controllers/questionController');
const requireAuth = require('../middleware/requireAuth');

router.post('/generate', requireAuth, generateQuestions);

module.exports = router;
