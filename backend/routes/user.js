
const {signupUser, loginUser } = require('../controllers/userContoller')
const express = require('express');
const router = express.Router();

//signin route
router.post('/',loginUser)

//signup route
router.post('/signup',signupUser)


module.exports = router;