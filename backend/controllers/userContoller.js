const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

// login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.signin(email, password);

        // create token
        const token = createToken(user._id);

        const response = { name: user.name, email, token };
        //console.log('Login Response:', response); 
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// signup user
const signupUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await User.signup(name, email, password);

        // create token
        const token = createToken(user._id);

        const response = { name, email, token };
        //console.log('Signup Response:', response); 
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports = { signupUser, loginUser }
