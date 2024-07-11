const express = require('express');
const router = express.Router();
const { saveResponseForm ,getResponseForms} = require('../controllers/responseformController');
const requireAuth = require('../middleware/requireAuth');

router.post('/save',requireAuth ,saveResponseForm);
router.get('/',requireAuth ,getResponseForms);

module.exports = router;
