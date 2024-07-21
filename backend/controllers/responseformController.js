const ResponseForm = require('../models/responseform');
const mongoose = require('mongoose');
const User = require('../models/userModel'); 

const saveResponseForm = async (req, res) => {
  const {  topic, difficulty, level, numQuestions, focusAreas ,score} = req.body;
  const userId = req.user._id;

 console.log(topic, difficulty, level, numQuestions, focusAreas,userId,questionType, score)
  if (!userId || !topic || !difficulty || !level || !numQuestions || !focusAreas ) {
    return res.status(400).json({ error: 'All fields are required'});
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
      questionType,
      score
    });

    const savedResponseForm = await responseForm.save();
    console.log(savedResponseForm)

    res.status(201).json(savedResponseForm);
  } catch (error) {
    res.status(500).json({ error: 'Failed to save response form' });
  }
};


const getResponseForms = async (req, res) => {

    const userId = req.user._id;
   console.log(userId)
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
  
    try {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ error: 'Invalid user ID' });
      }
  
      const userExists = await User.findById(userId);
      if (!userExists) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const responseForms = await ResponseForm.find({ userId });
  
      res.status(200).json(responseForms);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve response forms' });
    }
  };

  const deleteResponseForm = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
  
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid quiz ID' });
      }
  
      const responseForm = await ResponseForm.findOneAndDelete({ _id: id, userId });
      if (!responseForm) {
        return res.status(404).json({ error: 'Quiz not found' });
      }
  
      res.status(200).json({ message: 'Quiz deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete quiz' });
    }
  };

module.exports = {
  saveResponseForm,getResponseForms,deleteResponseForm
};
