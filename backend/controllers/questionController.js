const QuestionForm = require('../models/responceform');
const Question = require('../models/question');
const { run } = require('../../gemini');


const saveQuestions = async (req, res) => {
  const { questions } = req.body;

console.log(req.body)
  try {
      const questionsToSave = questions.map(question => ({
          userId: req.user._id, // Utilisateur actuel (remplacez par votre logique d'authentification)
          questionText: question.question,
          questionType: 'QCM', // Remplacez par le type approprié si nécessaire
          options: question.choices,
          correctAnswer: question.answer.split(') ')[1], // Extrait la réponse correcte sans le préfixe "a) "
          explanation: question.explanation || null // Explication, peut être null si non fournie
      }));

      // Enregistrer les questions dans la base de données
      const savedQuestions = await Question.insertMany(questionsToSave);

      // Répondre une seule fois après avoir enregistré toutes les questions
      res.status(200).json({
          message: "Questions saved successfully",
          questions: savedQuestions
      });
  } catch (error) {
      console.error("Error saving questions:", error);
      res.status(500).json({ error: error.message });
  }
};

const generateQuestions = async (req, res) => {
  const { topic, difficulty, level, numQuestions, focusAreas, questionType } = req.body;
  const userId = req.user._id;

  try {
    // Enregistrer le formulaire dans la base de données
   // const form = await QuestionForm.create({ userId, topic, difficulty, level, numQuestions, focusAreas, questionTypes: [questionType] });

    // Construire le texte à passer à Gemini
    //const testPrompt = `create 5 QCM questions on the topic "JavaScript Intermediate Arrays" at Medium level. Focus areas: array methods, manipulation. with each question having 3 choices and only one correct choice. The format should be like these 
    const testPrompt = `create ${numQuestions} ${questionType} questions on the topic "${topic}" at ${level} level with ${difficulty} difficulty. Focus areas: ${focusAreas}.with each question having 3 choices and only one correct choice. The format should be like these 
    :
    
1. <Question 1>
a) <Choice A>
b) <Choice B>
c) <Choice C>

2. <Question 2>
a) <Choice A>
b) <Choice B>
c) <Choice C>

...

## Answers:
1. <Answer 1>;
2. <Answer 2>;
...`;
    // Appeler la fonction run() de gemini.js avec le prompt
    const response = await run(testPrompt);

    // Parsing des questions à partir de la réponse
    //const questions = parseQuestions(response);

    // Préparation des questions avec l'ID du formulaire pour l'insertion
    /*const questionsWithFormId = questions.map(question => ({
      formId: form._id,
      ...question
    }));*/

    // Insertion des questions dans la base de données
    //await Question.insertMany(questionsWithFormId);

    // Réponse à la requête avec succès
    //res.status(200).json({ message: "Questions added successfully" });
    data=parseGeminiResponse(response)
    res.status(200).json({ message: data});
  } catch (error) {
    // Gestion des erreurs
    console.error('Error generating questions:', error);
    res.status(500).json({ error: error.message });
  }
};

function parseGeminiResponse(response) {
  
  // Journaliser la réponse reçue pour le debug
  const [questionsSection, answersSection] = response.split("## Answers:\n\n");

  // Vérifier et journaliser les sections pour le débogage
  if (!questionsSection || !answersSection) {
    console.error("Failed to split response into questions and answers sections.");
    return [];
  }
  console.log("Questions Section:", questionsSection);
  //
  console.log("Answers Section:", answersSection);



  // Split the input into individual questions
const qs = questionsSection.split(/\n\n+/);
// Remove the first two elements from the array
qs.shift(); // Removes the first element (## JavaScript Intermediate Arrays Quiz)
console.log("qs",qs)

// Prepare an array to store parsed questions
let parsedQuestions = [];

// Loop through each question and parse it into the desired structure
qs.forEach((question, index) => {

  console.log("question",question)

    
    const questionObj = {
        question: "", // Placeholder for question text
        choices: [],
        answer: null,
        explanation: null
    };

    // Extract question text and choices
    const matches = question.match(/^\*\*(\d+)\.\s*(.+?)\*\*\n\s*a\) (.+?)\n\s*b\) (.+?)\n\s*c\) (.+?)$/s);
    console.log("matches",matches)

    if (matches && matches.length === 6) {
        questionObj.question = matches[2].trim();


        // Choices extraction
        questionObj.choices = [matches[3].trim(), matches[4].trim(), matches[5].trim()];
        parsedQuestions.push(questionObj);


    }

    })


  

   // Extract and associate answers with questions
   const answerLines = answersSection.split("\n").filter((line) => line.trim() !== '');

   // Associate answers with questions by index
   answerLines.forEach((answerText, index) => {
     const answerMatch = answerText.match(/^\d+\.\s*\*\*([a-c])\)\s*(.*)\*\*/);
     if (answerMatch && index < parsedQuestions.length) {
       const [, answerLetter, answerDetail] = answerMatch;
       parsedQuestions[index].answer = `${answerLetter}) ${answerDetail}`;
 
       // Log each answer for debugging
       console.log("Answer for Question", index + 1, ":", parsedQuestions[index].answer);
     } else {
       console.error(`Answer format is incorrect or question not found at index ${index}.`);
     }
   });

  return parsedQuestions;
}

module.exports = { generateQuestions , saveQuestions};




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
/*  code fonctionnell sans savgarde

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
*/


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
