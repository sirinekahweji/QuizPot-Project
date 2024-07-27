
const { signupUser, loginUser, forgotPassword ,changePassword,getUsers,deleteUser} = require('../controllers/userContoller')
const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/requireAuth');


//signin route
router.post('/', loginUser);

//signup route
router.post('/signup', signupUser);
router.get('/',requireAuth, getUsers);
router.delete('/delete/:id',requireAuth, deleteUser);
router.post('/forgot-password', forgotPassword);
router.post('/change-password', changePassword);



module.exports = router;