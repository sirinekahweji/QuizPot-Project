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
        console.log(data)
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


module.exports = { generateQuestions , saveQuestions ,getQuestionsByFormResponseId};

