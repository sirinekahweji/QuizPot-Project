
const { signupUser, loginUser, forgotPassword ,changePassword} = require('../controllers/userContoller')
const express = require('express');
const router = express.Router();

//signin route
router.post('/', loginUser)

//signup route
router.post('/signup', signupUser)
router.post('/forgot-password', forgotPassword)
router.post('/change-password', changePassword);



module.exports = router;