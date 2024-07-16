const Question = require('../models/question');
const { run } = require('../../gemini');
const { runImage } = require('../../geminiImage');
const fs = require('fs');
const path = require('path');


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
          const testPrompt = `create ${numQuestions} ${questionType} questions on the topic "${topic}" at ${level} level with ${difficulty} difficulty. Focus areas: ${focusAreas}.with each question having 3 choices and only one correct choice.The format should be like these and in the Answers il ya le lettre  et le text de correct answer et sans des etoiles avant et apres la correct answer :
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
      
      while (data.length === 0 && attemptCount < 4) {
          data = await generateAndParseQuestions();
          attemptCount++;
      }

      if (data.length === 0) {
          return res.status(404).json({ error: 'Failed to generate questions after multiple attempts' });
      }
      console.log(data)
      res.status(200).json({ message: data });

      // Validate the generated questions
  
  } catch (error) {
      console.error('Error generating questions:', error);
      res.status(500).json({ error: error.message });
  }
};

const generateFromImage = async (req, res) => {
  const image = req.file;
  if (!image) {
    console.log("No file uploaded");
    return res.status(400).json({ error: 'No file uploaded' });
  }
  

  try {
    const promptText =` create 6 questions from the content of the image .with each question having 3 choices and only one correct choice. The format should be like these and in the Answers il ya le lettre  et le text de correct answer et sans des etoiles avant et apres la correct answer:
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
console.log("avant generate run")
console.log("image",image)
console.log("image.path",image.path)

    const response = await runImage(image.path, promptText);
    const questions = parseGeminiResponse(response);
    console.log("apres generate run")


    res.status(200).json({ message: questions });
  } catch (error) {
    console.error('Error generating questions from images:', error);
    res.status(500).json({ error: error.message });
  }
};

const generateMoreQuestions = async (req, res) => {
  const { topic, difficulty, level, numQuestions, focusAreas, questionType } = req.body;

  try {
      let data = [];
      let attemptCount = 0;
      
      const generateAndParseQuestions = async () => {
          const testPrompt = `create another ${numQuestions} ${questionType} questions on the topic "${topic}" at ${level} level with ${difficulty} difficulty. Focus areas: ${focusAreas}.with each question having 3 choices and only one correct choice. The format should be like these and in the Answers il ya le lettre  et le text de correct answer et sans des etoiles avant et apres la correct answer :
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
      console.log(data)
      res.status(200).json({ message: data });

   

  } catch (error) {
      console.error('Error generating questions:', error);
      res.status(500).json({ error: error.message });
  }
};


const generateQuestionsfromText = async (req, res) => {
  const { text } = req.body;

  console.log(text);
  try {
    let data = [];
    let attemptCount = 0;

    const generateAndParseQuestions = async () => {
      const testPrompt = `create 6 questions from this content "${text}" .with each question having 3 choices and only one correct choice. The format should be like these and in the Answers il ya le lettre  et le text de correct answer et sans des etoiles avant et apres la correct answer:
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

    while (data.length === 0 && attemptCount < 4) {
      data = await generateAndParseQuestions();
      attemptCount++;
    }

    if (data.length === 0) {
      return res.status(404).json({ error: 'Failed to generate questions after multiple attempts' });
    }
    console.log(data);

  

    res.status(200).json({ message: data });

  } catch (error) {
    console.error('Error generating questions:', error);
    res.status(500).json({ error: error.message });
  }
};

function parseGeminiResponse(response) {
  const [questionsSection, answersSection] = response.split("## Answers:");

  if (!questionsSection) {
    console.error("Failed to split response into questions sections.");
    return [];
  }
  if (!answersSection) {
    console.error("Failed to split response into answers sections.");
    return [];
  }

  console.log("Questions Section:", questionsSection);
  console.log("Answers Section:", answersSection);

  const qs = questionsSection.split(/\n\n+/);
  // Remove the first element from the array
  qs.shift();
  console.log("qs", qs);

  let parsedQuestions = [];

  qs.forEach((question, index) => {
    console.log("question", question);

    const questionObj = {
      question: "",
      choices: [],
      answer: null,
    };

    const matches = question.match(/^\d+\.\s*(.+?)\n\s*a\)\s*(.+?)\n\s*b\)\s*(.+?)\n\s*c\)\s*(.+?)$/s);
    console.log("matches", matches);

    if (matches && matches.length === 5) {
      questionObj.question = matches[1].trim();
      questionObj.choices = [matches[2].trim(), matches[3].trim(), matches[4].trim()];
      parsedQuestions.push(questionObj);
    }
  });

  const answerLines = answersSection.split("\n").filter((line) => line.trim() !== '');
  console.log("answerLines",answerLines);
  answerLines.forEach((answerText, index) => {
    const text=answerText.replace(/\*/g, '')
    const answerMatch = text.match(/^\d+\.\s*([a-c])\)\s*(.*)\s*$/);
    console.log("answerText",answerText);
    console.log("answerMatch",answerMatch);

    if (answerMatch && index < parsedQuestions.length) {
      console.log("answerMatch2",answerMatch);

      const [, answerLetter, answerDetail] = answerMatch;
      console.log("answerLetter",answerLetter);
      console.log("answerDetail",answerDetail);

      parsedQuestions[index].answer = `${answerLetter}) ${answerDetail.trim()}`;
  
      console.log("Answer for Question", index + 1, ":", parsedQuestions[index].answer);
    } else {
      console.error(`Answer format is incorrect or question not found at index ${index}.`);
    }
  });

  return parsedQuestions;
}


function validateQuestions(questions) {
  for (const question of questions) {
    if (!question.question || question.choices.length !== 3 || !question.answer) {
      return false;
    }
    for (const choice of question.choices) {
      if (!choice) {
        return false;
      }
    }
  }
  return questions;
}


const getQuestionsByFormResponseId = async (req, res) => {
  const { formResponseId } = req.params;

  try {
    console.log(formResponseId)
    const questions = await Question.find({ formResponseId: formResponseId});
    console.log(questions)
    if (!questions || questions.length === 0) {
      return res.status(404).json({ message: 'No questions found for the given form response ID' });
    }

    res.status(200).json({ questions });
  } catch (error) {
    console.error('Error retrieving questions:', error);
    res.status(500).json({ error: error.message });
  }
};


module.exports = {generateFromImage, generateQuestions , saveQuestions ,getQuestionsByFormResponseId,generateQuestionsfromText,generateMoreQuestions};

