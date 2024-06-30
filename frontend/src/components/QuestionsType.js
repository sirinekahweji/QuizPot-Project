import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import './QuestionType.css'; 
import React from 'react';

const QuestionsType = ({ onGenerateQuiz }) => {

    const handleGenerateQuiz = () => {
        onGenerateQuiz(); // Appeler la fonction pour passer à l'étape Questions
    };

    return ( 
        <div className="questionType">
            <h3>What type of content would you like to create?</h3>
            <div className="questionsType-container">
                <div className="type1">
                    <FormCheckInput className="formCheck"></FormCheckInput>
                    <div className="type1-container">
                        <h5><i class="bi bi-list-check"></i>  Multiple choice questions</h5>
                        <p>Generate MCQ statements, their correct answers and  associated distractors</p>
                        <div className="Answers">
                        <div className="corrcetAnswers">
                            <p>Number of correct answers*</p>
                            <input className="input" type="number"></input>
                        </div>
                        <div className="Answersfalse">
                            <p>Number of false answers*</p>
                            <input className="input" type="number"></input>
                        </div>

                        </div>
                      
                    </div>

                </div>
                <div className="type2">
                    <FormCheckInput className="formCheck"></FormCheckInput>
                    <div className="type2-container">
                       <h5><i class="bi bi-chat-square-fill"></i>  Open questions</h5>
                       <p>Generate open-ended question statements and associated correct answers</p>
                    </div>


                </div>

            </div>
            <button className="generer" onClick={handleGenerateQuiz}>Générer Quiz</button>


        </div>
     );
}
 
export default QuestionsType;