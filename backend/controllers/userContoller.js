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
    console.log("email",email)
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const newPassword = crypto.randomBytes(6).toString('hex');
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);
  
      user.password = hash;
      console.log("user passwor:", user.password )

  
      await user.save();
  
     
     

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.USER,
          pass: process.env.PASS
        }
      });
      
      var mailOptions = {
        from: process.env.USER,
        to: user.email,
        subject: 'Password Reset',
        text: `Your new password is ${newPassword}`,
      };
      console.log("transporter",transporter)

  
      console.log("mailOptions",mailOptions)
      console.log("avant sand mail")
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("erreur sand mail")
          return res.status(500).json({ message: 'Failed to send email' });
        }
        console.log(" sent mail")

        res.status(200).json({ message: 'New password sent to your email' });
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  }

module.exports = { signupUser, loginUser ,forgotPassword}
