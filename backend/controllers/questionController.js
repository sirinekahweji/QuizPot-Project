const Question = require('../models/question');
const { run } = require('../../gemini');


const saveQuestions = async (req, res) => {
  const { questions ,formResponseId} = req.body;

console.log(questions)
console.log(formResponseId)
  try {
      const questionsToSave = questions.map(question => ({
        formResponseId: formResponseId, 
          questionText: question.question,
          questionType: 'QCM',
          options: question.choices,
          correctAnswer: question.answer.split(') ')[1], 
          explanation: question.explanation || null 
      }));

      const savedQuestions = await Question.insertMany(questionsToSave);
      console.log("savedQuestions",savedQuestions)

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

  try {
      let data = [];
      let attemptCount = 0;
      
      const generateAndParseQuestions = async () => {
          const testPrompt = `create ${numQuestions} ${questionType} questions on the topic "${topic}" at ${level} level with ${difficulty} difficulty. Focus areas: ${focusAreas}.with each question having 3 choices and only one correct choice. The format should be like these :
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
..`;
          
          const response = await run(testPrompt);
          return parseGeminiResponse(response);
      };

      data = await generateAndParseQuestions();
      
      while (data.length === 0 && attemptCount < 3) {
          data = await generateAndParseQuestions();
          attemptCount++;
      }

      if (data.length === 0) {
          return res.status(404).json({ error: 'Failed to generate questions after multiple attempts' });
      }

      res.status(200).json({ message: data });

  } catch (error) {
      console.error('Error generating questions:', error);
      res.status(500).json({ error: error.message });
  }
};

function parseGeminiResponse(response) {
  
  const [questionsSection, answersSection] = response.split("## Answers:\n\n");

  if (!questionsSection || !answersSection) {
    console.error("Failed to split response into questions and answers sections.");
    return [];
  }
  console.log("Questions Section:", questionsSection);
  
  console.log("Answers Section:", answersSection);



const qs = questionsSection.split(/\n\n+/);
// Remove the first two elements from the array
qs.shift();
console.log("qs",qs)

let parsedQuestions = [];

qs.forEach((question, index) => {

  console.log("question",question)

    
    const questionObj = {
        question: "", 
        choices: [],
        answer: null,
    };

    const matches = question.match(/^\*\*(\d+)\.\s*(.+?)\*\*\n\s*a\) (.+?)\n\s*b\) (.+?)\n\s*c\) (.+?)$/s);
    console.log("matches",matches)

    if (matches && matches.length === 6) {
        questionObj.question = matches[2].trim();


        questionObj.choices = [matches[3].trim(), matches[4].trim(), matches[5].trim()];
        parsedQuestions.push(questionObj);


    }

    })


  

   const answerLines = answersSection.split("\n").filter((line) => line.trim() !== '');

   answerLines.forEach((answerText, index) => {
     const answerMatch = answerText.match(/^\d+\.\s*\*\*([a-c])\)\s*(.*)\*\*/);
     if (answerMatch && index < parsedQuestions.length) {
       const [, answerLetter, answerDetail] = answerMatch;
       parsedQuestions[index].answer = `${answerLetter}) ${answerDetail}`;
 
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
