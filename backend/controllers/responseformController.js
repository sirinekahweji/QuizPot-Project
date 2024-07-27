const ResponseForm = require('../models/responseform');
const mongoose = require('mongoose');
const User = require('../models/userModel'); 
const Question = require('../models/question');
const path = require('path');
const fs = require('fs').promises;




const saveResponseForm = async (req, res) => {
  const {  topic, difficulty, level, numQuestions, focusAreas ,score} = req.body;
  const userId = req.user._id;
  const file = req.file; 
  console.log("file",file)


  //console.log("path",file.path)
 

 console.log(topic, difficulty, level, numQuestions, focusAreas,userId, score)
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
    let responseForm =null;
    if(file==null){
      console.log("null")
    responseForm = new ResponseForm({
      userId,
      topic,
      difficulty,
      level,
      numQuestions,
      focusAreas,
      score,
      file
    });

  }
  else{
    console.log("!null")

     responseForm = new ResponseForm({
      userId,
      topic,
      difficulty,
      level,
      numQuestions,
      focusAreas,
      score,
      file:file.path 
      });

  }

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

    
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        console.log( 'Invalid quiz ID');

        return res.status(400).json({ error: 'Invalid quiz ID' });
      }
      console.log("avant deleted" );

      const responseForm = await ResponseForm.findOneAndDelete({ _id: id });
      console.log("responseForm deleted" ,responseForm);
      if(responseForm.file){
        await fs.unlink(responseForm.file)

      }

      console.log("responseForm deleted" ,responseForm);

      if (!responseForm) {
        console.log(  'Quiz not found');
        return res.status(404).json({ error: 'Quiz not found' });
      }
  
      const questions = await Question.deleteMany({ formResponseId: id });
      console.log("questions deleted" ,questions);
  
      res.status(200).json({ message: 'Quiz and associated questions deleted successfully' });
    } catch (error) {
      console.log(  'Failed');

      res.status(500).json({ error: 'Failed to delete quiz' });
    }
  };


  const getAllFormResponses = async (req, res) => {
    try {
      const responseForms = await ResponseForm.find().populate('userId', 'name');

      res.status(200).json(responseForms);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve all response forms' });
    }
  };

module.exports = {
  saveResponseForm,getResponseForms,deleteResponseForm,getAllFormResponses
};
