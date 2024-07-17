const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('AIzaSyByCX2MbBweVqrm8Fjw63ZmzLHJVQZ6IPo');

async function run(test) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  
  const result = await model.generateContent(test);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text;
}







//run();
module.exports = { run };
