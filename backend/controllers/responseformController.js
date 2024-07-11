const Responseform = require('../models/responseform');
const mongoose = require('mongoose');
const ResponseForm = require('../models/responseFormModel');
const User = require('../models/userModel'); 
const mongoose = require('mongoose');

const saveResponseForm = async (req, res) => {
  const { userId, topic, difficulty, level, numQuestions, focusAreas, questionTypes } = req.body;

  if (!userId || !topic || !difficulty || !level || !numQuestions || !focusAreas || !questionTypes) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const responseForm = new ResponseForm({
      userId,
      topic,
      difficulty,
      level,
      numQuestions,
      focusAreas,
      questionTypes
    });

    const savedResponseForm = await responseForm.save();

    res.status(201).json(savedResponseForm);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save response form' });
  }
};

module.exports = {
  saveResponseForm,
};
