// dashboardController.js
const User = require('../models/userModel');
const Quiz = require('../models/responseform');
const Question = require('../models/question');

const getDashboardData = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalQuizzes = await Quiz.countDocuments();
    const totalQuestions = await Question.countDocuments();

    const quizzesPerDay = await Quiz.aggregate([
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    const accountsPerDay = await User.aggregate([
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }, count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    res.status(200).json({
      totalUsers,
      totalQuizzes,
      totalQuestions,
      quizzesPerDay,
      accountsPerDay
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getDashboardData };
