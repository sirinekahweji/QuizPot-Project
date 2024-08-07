const Question = require('../models/question');
const { run } = require('../../gemini');
const { runImage } = require('../../geminiImage');
const multer = require('multer');
const mammoth = require('mammoth');
const pdf = require('pdf-parse');
const fs = require('fs').promises;
const path = require('path');
const upload = multer({ dest: 'uploads/' });

const extractTextFromFile = async (filePath) => {

  try {
    const data = await fs.readFile(filePath, 'utf8');
    //console.log('Text Content: ', data);
    return data;
  } catch (error) {
    console.error('Error reading text file: ', error);
  }
};

const extractTextFromPDF = async (filePath) => {
  try {
    const dataBuffer = await fs.readFile(filePath);
    const data = await pdf(dataBuffer);

    //console.log('Text Content: ', data.text);
    return data.text;
  } catch (error) {
    console.error('Error extracting text from PDF: ', error);
  }
};


const extractTextFromDOCX = async (filePath) => {
  try {
    const result = await mammoth.extractRawText({ path: filePath });
    //console.log('Text Content: ', result.value);
    return result.value;
  } catch (error) {
    console.error('Error extracting text from DOCX: ', error);
  }
};


const saveQuestions = async (req, res) => {
  const { questions, idform } = req.body;

  console.log(questions)
  //console.log(idform)
  try {
    const questionsToSave = questions.map(question => ({
      formResponseId: idform,
      questionText: question.question,
      options: question.choices,
      correctAnswer: question.answer,
      explanation: question.explanation || null
    }));

    const savedQuestions = await Question.insertMany(questionsToSave);
    console.log("savedQuestions", savedQuestions)

    res.status(200).json({
      message: "Questions saved successfully",
      questions: savedQuestions
    });
  } catch (error) {
    console.error("Error saving questions:", error);
    res.status(500).json({ error: error.message });
  }
};

/*const generateQuestions = async (req, res) => {
  const { topic, difficulty, level, numQuestions, focusAreas } = req.body;
  const file = req.file;
  console.log("file", file)
  //console.log(topic, difficulty, level, numQuestions, focusAreas)
  if (file == null) {

    try {

      const testPrompt = `create ${numQuestions} QCM questions on the topic "${topic}" at ${level} level with ${difficulty} difficulty. Focus areas: ${focusAreas}.with each question having 3 choices and only one correct choice.The format should be like these and in the Answers il ya le lettre  et le text de correct answer et sans des etoiles avant et apres la correct answer :
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


      let questions = [];

      while (questions.length === 0) {
        const response = await run(testPrompt);
        questions = parseGeminiResponse(response);

        if (questions.length > 0) {
          break;
        }
        console.log("Questions were not generated. Retrying...");
      }

      for (const question of questions) {
        if (!question.question || question.choices.length !== 3 || !question.answer) {
          res.status(500).json({ message: "Error generating questions" });
        }
        for (const choice of question.choices) {
          if (!choice) {
            res.status(500).json({ message: "Error generating questions" });
          }
        }
      }

      res.status(200).json({ message: questions });

    } catch (error) {
      console.error('Error generating questions:', error);
      res.status(500).json({ error: error.message });
    }
  }
  else {
    const fileName = file.originalname;
    const fileExtension = fileName.split('.').pop().toLowerCase();
    let text = '';
    switch (fileExtension) {
      case 'pdf':
        text = await extractTextFromPDF(file.path);
        console.log("text", text);
        await fs.unlink(file.path)
        return await generateQuestionsfromText(req, res, text);
      case 'doc':
      case 'docx':
        text = await extractTextFromDOCX(file.path);
        console.log("text", text);
        await fs.unlink(file.path)
        return await generateQuestionsfromText(req, res, text);
      case 'txt':
        text = await extractTextFromFile(file.path)
        console.log("text", text);
        await fs.unlink(file.path)
        return await generateQuestionsfromText(req, res, text);
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'webp':
      case 'heic':
      case 'heif':
        return await generateFromImage(req, res);
      default:
        break;
    }



  }
};*/

const generateQuestions = async (req, res) => {
  const { topic, difficulty, level, numQuestions, focusAreas } = req.body;
  const file = req.file;
  console.log("file", file);

  if (!file) {
    try {
      const testPrompt = `create ${numQuestions} QCM questions on the topic "${topic}" at ${level} level with ${difficulty} difficulty. Focus areas: ${focusAreas}.with each question having 3 choices and only one correct choice.The format should be like these and in the Answers il ya le lettre  et le text de correct answer et sans des etoiles avant et apres la correct answer :
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

      let questions = [];

      while (questions.length === 0) {
        const response = await run(testPrompt);
        questions = parseGeminiResponse(response);

        if (questions.length > 0) {
          break;
        }
        console.log("Questions were not generated. Retrying...");
      }

      for (const question of questions) {
        if (!question.question || question.choices.length !== 3 || !question.answer) {
          return res.status(500).json({ message: "Error generating questions" });
        }
        for (const choice of question.choices) {
          if (!choice) {
            return res.status(500).json({ message: "Error generating questions" });
          }
        }
      }

      return res.status(200).json({ message: questions });
    } catch (error) {
      console.error('Error generating questions:', error);
      if (!res.headersSent) {
        return res.status(500).json({ error: error.message });
      }
    }
  } else {
    try {
      const fileName = file.originalname;
      const fileExtension = fileName.split('.').pop().toLowerCase();
      let text = '';

      switch (fileExtension) {
        case 'pdf':
          text = await extractTextFromPDF(file.path);
          console.log("text", text);
          await fs.unlink(file.path);
          return await generateQuestionsfromText(req, res, text);
        case 'doc':
        case 'docx':
          text = await extractTextFromDOCX(file.path);
          console.log("text", text);
          await fs.unlink(file.path);
          return await generateQuestionsfromText(req, res, text);
        case 'txt':
          text = await extractTextFromFile(file.path);
          console.log("text", text);
          await fs.unlink(file.path);
          return await generateQuestionsfromText(req, res, text);
        case 'jpg':
        case 'jpeg':
        case 'png':
        case 'webp':
        case 'heic':
        case 'heif':
          return await generateFromImage(req, res);
        default:
          return res.status(400).json({ message: "Unsupported file format" });
      }
    } catch (error) {
      console.error('Error processing file:', error);
      if (!res.headersSent) {
        return res.status(500).json({ error: error.message });
      }
    }
  }
};


const generateFromImage = async (req, res) => {
  const { topic, difficulty, level, numQuestions, focusAreas } = req.body;
  const file = req.file;

  const image = file;
  if (!image) {
    console.log("No file uploaded");
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const imagePath = file.path;
    const mimeType = file.mimetype;
    const promptText = `create  ${numQuestions} QCM questions from the content of the image on the topic "${topic}" at ${level} level with ${difficulty} difficulty. Focus areas: ${focusAreas}.with each question having 3 choices and only one correct choice. The format should be like these and in the Answers il ya le lettre et le text de correct answer et sans des etoiles avant et apres la correct answer:
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

    let questions = [];

    // Regenerate questions until the length is greater than 0
    while (questions.length === 0) {
      console.log("image.path", imagePath);
      console.log("image.mimeType", mimeType);
      const response = await runImage(imagePath, mimeType, promptText);
      console.log("response", response);

      questions = parseGeminiResponse(response);

      if (questions.length > 0) {
        await fs.unlink(file.path)
        break;
      }
      console.log("Questions were not generated. Retrying...");
    }


    for (const question of questions) {
      if (!question.question || question.choices.length !== 3 || !question.answer) {
        res.status(500).json({ message: "Error generating questions" });
      }
      for (const choice of question.choices) {
        if (!choice) {
          res.status(500).json({ message: "Error generating questions" });
        }
      }
    }
    res.status(200).json({ message: questions });
  } catch (error) {
    console.error('Error generating questions from images:', error);
    res.status(500).json({ error: error.message });
  }
};





const generateQuestionsfromText = async (req, res, text) => {
  const { topic, difficulty, level, numQuestions, focusAreas } = req.body;
  console.log(topic, difficulty, level, numQuestions, focusAreas);

  try {


    const testPrompt = `create  ${numQuestions} QCM  questions on the topic "${topic}" at ${level} level with ${difficulty} difficulty. Focus areas: ${focusAreas} on se baser a cette content ${text}.with each question having 3 choices and only one correct choice. The format should be like these and in the Answers il ya le lettre  et le text de correct answer et sans des etoiles avant et apres la correct answer :
  
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

    let questions = [];

    while (questions.length === 0) {
      const response = await run(testPrompt);
      questions = parseGeminiResponse(response);

      if (questions.length > 0) {
        break;
      }
      console.log("Questions were not generated. Retrying...");
    }

    for (const question of questions) {
      if (!question.question || question.choices.length !== 3 || !question.answer) {
        res.status(500).json({ message: "Error generating questions" });
      }
      for (const choice of question.choices) {
        if (!choice) {
          res.status(500).json({ message: "Error generating questions" });
        }
      }
    }
    res.status(200).json({ message: questions });

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

  //console.log("Questions Section:", questionsSection);
  //console.log("Answers Section:", answersSection);

  const qs = questionsSection.split(/\n\n+/);
  // Remove the first element from the array
  qs.shift();
  //console.log("qs", qs);

  let parsedQuestions = [];

  qs.forEach((question, index) => {
    //console.log("question", question);

    const questionObj = {
      question: "",
      choices: [],
      answer: null,
    };

    const matches = question.match(/^\d+\.\s*(.+?)\n\s*a\)\s*(.+?)\n\s*b\)\s*(.+?)\n\s*c\)\s*(.+?)$/s);
    //console.log("matches", matches);

    if (matches && matches.length === 5) {
      questionObj.question = matches[1].trim();
      questionObj.choices = [matches[2].trim(), matches[3].trim(), matches[4].trim()];
      parsedQuestions.push(questionObj);
    }
  });

  const answerLines = answersSection.split("\n").filter((line) => line.trim() !== '');
  //console.log("answerLines",answerLines);
  answerLines.forEach((answerText, index) => {
    const text = answerText.replace(/\*/g, '')
    const answerMatch = text.match(/^\d+\.\s*([a-c])\)\s*(.*)\s*$/);
    //console.log("answerText",answerText);
    //console.log("answerMatch",answerMatch);

    if (answerMatch && index < parsedQuestions.length) {
      // console.log("answerMatch2",answerMatch);

      const [, answerLetter, answerDetail] = answerMatch;
      //console.log("answerLetter",answerLetter);
      //console.log("answerDetail",answerDetail);

      parsedQuestions[index].answer = `${answerLetter}) ${answerDetail.trim()}`;

      console.log("Answer for Question", index + 1, ":", parsedQuestions[index].answer);
    } else {
      // console.error(`Answer format is incorrect or question not found at index ${index}.`);
    }
  });
  console.log("parsedQuestions", parsedQuestions);
  return parsedQuestions;
}



const getQuestionsByFormResponseId = async (req, res) => {
  const { formResponseId } = req.params;

  try {
    console.log(formResponseId)
    const questions = await Question.find({ formResponseId: formResponseId });
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


module.exports = { generateFromImage, generateQuestions, saveQuestions, getQuestionsByFormResponseId, generateQuestionsfromText };

