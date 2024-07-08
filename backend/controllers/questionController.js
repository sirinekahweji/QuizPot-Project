
//sauvgarder base de donerr
/*
const QuestionForm = require('../models/responseform'); // Corrected model name
const Question = require('../models/question');
const { run } = require('../../gemini'); // Assuming correct path to your gemini.js or @google/generative-ai module

const generateQuestions = async (req, res) => {
  const { topic, difficulty, level, numQuestions, focusAreas, questionType } = req.body;
  const userId = req.user._id;

  try {
    // Step 1: Save the response form details to MongoDB
    const form = await ResponseForm.create({
      userId,
      topic,
      difficulty,
      level,
      numQuestions,
      focusAreas,
      questionTypes: [questionType] // Store questionType as an array
    });

    // Step 2: Generate prompt for Gemini based on user input
    let prompt = `Generate ${numQuestions} ${questionType} questions on the topic "${topic}" at ${level} level with ${difficulty} difficulty. Focus areas: ${focusAreas}`;

    // Step 3: Call the run function to generate questions using Gemini or Google Generative AI
    const responses = await run(prompt);

    // Step 4: Process the responses and save generated questions to MongoDB
    const questions = responses.map(choice => ({
      formId: form._id,
      questionText: choice.questionText, // Assuming choice.text.questionText from Gemini
      questionType: questionType,
      options: questionType === 'QCM' ? choice.options : [],
      correctAnswer: choice.correctAnswer // Assuming choice.text.correctAnswer from Gemini
    }));

    const savedQuestions = await Question.insertMany(questions);

    // Step 5: Respond with the generated questions
    res.status(200).json({ questions: savedQuestions, message: 'Questions generated successfully' });
  } catch (error) {
    // Step 6: Handle errors
    console.error('Error generating questions:', error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { generateQuestions };

*/
const QuestionForm = require('../models/responceform');
const Question = require('../models/question');

//test
const { run } = require('../../gemini'); // Assurez-vous d'importer correctement

const generateQuestions = async (req, res) => {
  const { topic, difficulty, level, numQuestions, focusAreas, questionType } = req.body;
  const userId = req.user._id;

  try {
    // Enregistrer le formulaire dans la base de données
    const form = await QuestionForm.create({ userId, topic, difficulty, level, numQuestions, focusAreas, questionType });

    // Construire le texte à passer à Gemini
    let prompt = `Generate ${numQuestions} ${questionType} questions on the topic "${topic}" at ${level} level with ${difficulty} difficulty. Focus areas: ${focusAreas}`;

    // Appeler la fonction run() de gemini.js avec le prompt
    const responses = await run(prompt);

    // Traiter les réponses si nécessaire
    console.log(responses);

    res.status(200).json({ message: responses});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { generateQuestions };


//fin test
/*const generateQuestions = async (req, res) => {
  const { topic, difficulty, level, numQuestions, focusAreas, questionType } = req.body;
  const userId = req.user._id;

  try {
    // Enregistrer le formulaire dans la base de données
    const form = await QuestionForm.create({ userId, topic, difficulty, level, numQuestions, focusAreas, questionType });

    // Créer le prompt pour ChatGPT
    let prompt = `Generate ${numQuestions} ${questionType} questions on the topic "${topic}" at ${level} level with ${difficulty} difficulty. Focus areas: ${focusAreas}`;

    const response = await axios.post('https://api.openai.com/v1/engines/davinci-codex/completions', {
      prompt: prompt,
      max_tokens: 150,
      n: parseInt(numQuestions),
      stop: ["\n"]
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // Assume ChatGPT returns a structured response for QCM and Open questions
    const questions = response.data.choices.map(choice => ({
      formId: form._id,
      questionText: choice.text.questionText,
      questionType: questionType,
      options: questionType === 'QCM' ? choice.text.options : [],
      correctAnswer: choice.text.correctAnswer
    }));

    // Enregistrer les questions générées dans la base de données
    await Question.insertMany(questions);

    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { generateQuestions };*/
