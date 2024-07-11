const express = require('express');
const router = express.Router();
const { saveResponseForm } = require('../controllers/responseformController');
const requireAuth = require('../middleware/requireAuth');

router.post('/save',requireAuth ,saveResponseForm);

module.exports = router;
