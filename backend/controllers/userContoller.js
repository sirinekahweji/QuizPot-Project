const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')
const crypto = require('crypto');



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

//forgotPassword
const forgotPassword =async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const newPassword = crypto.randomBytes(6).toString('hex');
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);
  
      user.password = hash;
  
      await user.save();
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'your_email@gmail.com',
          pass: 'your_email_password',
        },
      });
  
      const mailOptions = {
        from: 'your_email@gmail.com',
        to: user.email,
        subject: 'Password Reset',
        text: `Your new password is ${newPassword}`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).json({ message: 'Failed to send email' });
        }
        res.status(200).json({ message: 'New password sent to your email' });
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

module.exports = { signupUser, loginUser ,forgotPassword}
