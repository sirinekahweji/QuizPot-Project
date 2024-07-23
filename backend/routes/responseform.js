const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { saveResponseForm ,getResponseForms,deleteResponseForm} = require('../controllers/responseformController');
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
  
  router.post('/save', requireAuth, upload.single('file'), saveResponseForm);
router.get('/',requireAuth ,getResponseForms);
router.delete('/:id',requireAuth ,deleteResponseForm);


module.exports = router;
