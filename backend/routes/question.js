const express = require('express');
const router = express.Router();
const { generateMoreQuestions,generateQuestions ,saveQuestions,getQuestionsByFormResponseId,generateQuestionsfromText} = require('../controllers/questionController');
const requireAuth = require('../middleware/requireAuth');

router.post('/generate', requireAuth, generateQuestions);
router.post('/generatemore', requireAuth, generateMoreQuestions);
router.post('/generateFromText', requireAuth, generateQuestionsfromText);
router.post('/save-questions', requireAuth,saveQuestions);
router.get('/:formResponseId', requireAuth,getQuestionsByFormResponseId);

module.exports = router;