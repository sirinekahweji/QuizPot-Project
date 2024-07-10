const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.KEY);

async function run(test) {
   try{
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});


  const result = await model.generateContent(test);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text
  
  if (!text) {
    throw new Error('Empty response received from Gemini.');
  }
  

  
}

   
   catch(error){
    console.error('Error generating lesson plan:', error);
    throw error; // Propagate the error to handle it in the route handler
   }
  }






//run();
module.exports = { run };
