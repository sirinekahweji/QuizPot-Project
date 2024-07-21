const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const {generateFromImage, generateMoreQuestions,generateQuestions ,saveQuestions,getQuestionsByFormResponseId,generateQuestionsfromText} = require('../controllers/questionController');
const requireAuth = require('../middleware/requireAuth');

// Configure multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); 
    }
  });
  
  const upload = multer({ storage: storage });


router.post('/generate',requireAuth, upload.single('file'), generateQuestions);
router.post('/generatemore', requireAuth, generateMoreQuestions);
router.post('/generateFromText', requireAuth, generateQuestionsfromText);
router.post('/generateFromImage', requireAuth, upload.single('image'), generateFromImage);
router.post('/save-questions', requireAuth,saveQuestions);
router.get('/:formResponseId', requireAuth,getQuestionsByFormResponseId);

module.exports = router;