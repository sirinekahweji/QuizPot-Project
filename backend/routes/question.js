const express = require('express');
const router = express.Router();
const { generateQuestions ,saveQuestions} = require('../controllers/questionController');
const requireAuth = require('../middleware/requireAuth');

router.post('/generate', requireAuth, generateQuestions);
router.post('/save-questions', requireAuth,saveQuestions);


module.exports = router;
