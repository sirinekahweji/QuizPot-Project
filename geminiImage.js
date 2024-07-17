const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require('path');


// Access your API key as an environment variable (see "Set up your API key" above)
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

async function runImage(path,mimeType,promptText) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


 console.log("path",path);
 console.log("mimeType",mimeType);
  const image=fileToGenerativePart(path,mimeType);


  const result = await model.generateContent([promptText, image]);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}

//run();
module.exports = { runImage };
