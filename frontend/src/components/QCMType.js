import React, { useContext, useState } from 'react';
import FormCheckInput from 'react-bootstrap/esm/FormCheckInput';
import './QCMType.css';
import { LangContext } from '../context/LangContext';
import { QuestionsContext } from '../context/QuestionsContext';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi'; // Import icons

const QCMType = ({ handleScoreUpdate }) => {
    const { currentLangData } = useContext(LangContext);
    const { questions } = useContext(QuestionsContext);
    const [selectedChoices, setSelectedChoices] = useState({});

    const handleChoiceSelect = (questionIndex, choiceIndex, isCorrect) => {
        if (selectedChoices[questionIndex]) {
            return;
        }

        setSelectedChoices(prevState => ({
            ...prevState,
            [questionIndex]: {
                choiceIndex,
                isCorrect
            }
        }));

        if (isCorrect) {
            handleScoreUpdate(prevScore => prevScore + 1); // Mettre à jour le score dans le composant parent
        }
    };

    return (
        <div className='listQuestionsQCM'>
            <p className='titleList'><i className="bi bi-list-check"></i> {currentLangData.mcqType.text}</p>

            {questions && questions.map((question, questionIndex) => (
                <div className='quizexemple' key={questionIndex}>
                    <div className='quizdiv'>
                        <p className='quiz'>{question.question}</p>
                    </div>
                    <div className='responcesdiv'>
                        {question.choices.map((choice, choiceIndex) => {
                            const correctAnswer = question.answer.split(') ')[1]; 
                            const isCorrect = correctAnswer === choice;
                            const isSelected = selectedChoices[questionIndex] && selectedChoices[questionIndex].choiceIndex === choiceIndex;
                            const icon = isSelected ? (selectedChoices[questionIndex].isCorrect ? <BiCheckCircle className="icon-correct" /> : <BiXCircle className="icon-incorrect" />) : null;

                            return (
                                <div className="choicediv" key={choiceIndex} onClick={() => handleChoiceSelect(questionIndex, choiceIndex, isCorrect)}>
                                    <div className="choice-wrapper">
                                        <FormCheckInput className="checkbox" checked={isSelected} readOnly />
                                    </div>
                                    <p className='choice-content'>{choice}</p>
                                    {icon}
                                </div>
                            );
                        })}
                    </div>
                    <hr />
                </div>
            ))}
           
            <button className="more"><i className="bi bi-arrow-clockwise"></i> {currentLangData.openQType.generateMore}</button>
        </div>
    );
};

export default QCMType;
