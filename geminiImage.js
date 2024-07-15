const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");

const genAI = new GoogleGenerativeAI('AIzaSyByCX2MbBweVqrm8Fjw63ZmzLHJVQZ6IPo');

// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}

async function run(imageParts,promptText) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = promptText;
  const imageParts = [
    fileToGenerativePart("image1.jpg", "image/png"),
    fileToGenerativePart("image2.jpg", "image/jpeg"),
  ];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

//run();
module.exports = { run };
