const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Quiz = require('../models/responseform');
const Question = require('../models/question');
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

    console.log(error.message);
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
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

//forgotPassword
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log("email", email)

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newPassword = crypto.randomBytes(6).toString('hex');
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    user.password = hash;
    console.log("user passwor:", user.password)
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
    console.log("transporter", transporter)


    console.log("mailOptions", mailOptions)
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


const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect old password' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    user.password = hash;
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    //console.log(users)
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

/*const deleteUser = async (req, res) => {
  const { id } = req.params;
  console.log("id user delete", id)

  try {
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      console.log("not found  user delete")

      return res.status(404).json({ message: 'User not found' });
    }
    console.log("deleted successfully")

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.log("server erreur")

    res.status(500).json({ message: 'Server error' });
  }
};*/

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    // Find user's quizzes
    const quizzes = await Quiz.find({ userId: id });
    console.log("quizzes",quizzes)

    // Collect quiz IDs
    const quizIds = quizzes.map(quiz => quiz._id);
    console.log("quizIds",quizIds)


    // Delete user's quizzes
    await Quiz.deleteMany({ userId: id });
    console.log(" Quizzes deleted successfully")


    // Delete questions associated with user's quizzes
    await Question.deleteMany({ formResponseId: { $in: quizIds } });
    console.log(" Questuins deleted successfully")


    // Delete user
    await User.findByIdAndDelete(id);
    console.log(" user deleted successfully")


    res.status(200).json({ message: 'User and associated quizzes and questions deleted successfully' });
  } catch (error) {
    console.error('Error deleting user, quizzes, and questions:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { signupUser, loginUser, forgotPassword ,changePassword,getUsers,deleteUser}
