const express = require('express');
const router = express.Router();
const { saveResponseForm } = require('../controllers/responseformController');

router.post('/save', saveResponseForm);

module.exports = router;
