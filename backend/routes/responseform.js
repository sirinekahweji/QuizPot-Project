const express = require('express');
const router = express.Router();
const { saveResponseForm ,getResponseForms,deleteResponseForm} = require('../controllers/responseformController');
const requireAuth = require('../middleware/requireAuth');

router.post('/save',requireAuth ,saveResponseForm);
router.get('/',requireAuth ,getResponseForms);
router.delete('/:id',requireAuth ,deleteResponseForm);


module.exports = router;
