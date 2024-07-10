const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI('AIzaSyByCX2MbBweVqrm8Fjw63ZmzLHJVQZ6IPo');

async function run(test) {
   try{
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  //const prompt = "Generate 5 questions on the topic 'Mathematic' at high school level with medium difficulty. Focus areas: Algebra, Geometry. Include both QCM and Open questions."

  const result = await model.generateContent(test);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  return text
  
  if (!text) {
    throw new Error('Empty response received from Gemini.');
  }
  // Split the generatedContent into structured parts
 /* const [title, subject, grade, time, objectives, materials, procedure, assessment] = generatedContent.split("\n\n");

  // Return a JSON object with structured data
  return {
    title: title.trim(),
    subject: subject.trim(),
    grade: grade.trim(),
    time: time.trim(),
    objectives: objectives.trim(),
    materials: materials.trim(),
    procedure: procedure.trim(),
    assessment: assessment.trim(),
  };*/

  
}

   
   catch(error){
    console.error('Error generating lesson plan:', error);
    throw error; // Propagate the error to handle it in the route handler
   }
  }






//run();
module.exports = { run };
