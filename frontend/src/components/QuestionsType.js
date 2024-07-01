import React, { useContext } from 'react';
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
import './QuestionType.css';
import { LangContext } from '../context/LangContext';

const QuestionsType = ({ onGenerateQuiz }) => {
    const { currentLangData } = useContext(LangContext);

    const handleGenerateQuiz = () => {
        onGenerateQuiz(); // Appeler la fonction pour passer à l'étape Questions
    };

    return (
        <div className="questionType">
            <h3>{currentLangData.questionsType.title}</h3>
            <div className="questionsType-container">
                <div className="type1">
                    <FormCheckInput className="formCheck"></FormCheckInput>
                    <div className="type1-container">
                        <h5><i className="bi bi-list-check"></i> {currentLangData.questionsType.multipleChoice.title}</h5>
                        <p>{currentLangData.questionsType.multipleChoice.description}</p>
                        <div className="Answers">
                            <div className="correctAnswers">
                                <p>{currentLangData.questionsType.multipleChoice.correctAnswers}</p>
                                <input className="input" type="number"></input>
                            </div>
                            <div className="falseAnswers">
                                <p>{currentLangData.questionsType.multipleChoice.falseAnswers}</p>
                                <input className="input" type="number"></input>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="type2">
                    <FormCheckInput className="formCheck"></FormCheckInput>
                    <div className="type2-container">
                        <h5><i className="bi bi-chat-square-fill"></i> {currentLangData.questionsType.openQuestions.title}</h5>
                        <p>{currentLangData.questionsType.openQuestions.description}</p>
                    </div>
                </div>
            </div>
            <button className="generate" onClick={handleGenerateQuiz}>{currentLangData.questionsType.generateQuizButton}</button>
        </div>
    );
}

export default QuestionsType;
