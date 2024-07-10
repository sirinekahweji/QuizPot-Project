import React, { useState, useContext } from 'react';
import './Questions.css';
import { LangContext } from '../context/LangContext';
import OpenQType from './OpenQType';
import QCMType from './QCMType';
import axios from 'axios';
import jsPDF from 'jspdf';
import { useAuthContext } from '../Hooks/useAuthContext';
import { QuestionsContext } from '../context/QuestionsContext';

const Questions = () => {
    const [selectedType, setSelectedType] = useState('MCQ'); // État pour suivre la sélection
    const { currentLangData } = useContext(LangContext);
    const { questions } = useContext(QuestionsContext);
    const { user } = useAuthContext();
    const [score, setScore] = useState(0);
    const [error, setError] = useState(null); 


    const generatePDF = (qs) => {
        const doc = new jsPDF();
    
        let yPos = 10;
        const margin = 10;
        const lineHeight = 7;
    
        qs.forEach((q, index) => {
            // Question
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.text(`Question ${index + 1}: ${q.question}`, margin, yPos);
            yPos += lineHeight;
    
            // Choices
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            q.choices.forEach((choice, choiceIndex) => {
                doc.text(`${String.fromCharCode(97 + choiceIndex)}) ${choice}`, margin + 10, yPos);
                yPos += lineHeight;
            });
    
            // Answer
            doc.setFont('helvetica', 'italic');
            doc.text(`Answer: ${q.answer}`, margin, yPos);
            yPos += lineHeight;
    
    
            // Space between questions
            yPos += lineHeight;
        });
    
        // Save the PDF
        doc.save('generated_questions.pdf');
    };


    const handleScoreUpdate = (newScore) => {
        setScore(newScore); // Mettre à jour le score dans le composant parent
    };

    const savequestions = async (e) => {
        e.preventDefault();
        console.log(questions)
        try {
            const response = await axios.post('http://localhost:5000/api/question/save-questions',{ questions },{
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}` // Include the token in the Authorization header
              }
            
            });
            console.log('Questions saved successfully:', response.data);
            return response.data; // Retournez les données si nécessaire
          } catch (error) {
            console.error('Error  save questions', error);
            setError('Failed to save questions. Please try again later.');
          }
    }

    const handleSelection = (type) => {
        setSelectedType(type);
    }

    const progressBar = (widthPerc, gradient = false) => {
        const radius = 65;
        const dashArray = (Math.PI * radius * widthPerc) / 100;
        return (
            <svg width="200" height="120">
                <circle
                    cx="100"
                    cy="100"
                    r={radius}
                    fill="none"
                    strokeWidth="25"
                    strokeLinecap="round"
                    strokeDashoffset={-1 * Math.PI * radius}
                    strokeDasharray={`${dashArray} 10000`} // Utilisation correcte des backticks pour les templates literals
                    stroke={gradient ? "url(#score-gradient)" : "#e5e5e5"}
                ></circle>
                {gradient && (
                    <defs>
                        <linearGradient id="score-gradient">
                            <stop offset="0%" stopColor="red" />
                            <stop offset="25%" stopColor="orange" />
                            <stop offset="100%" stopColor="green" />
                        </linearGradient>
                    </defs>
                )}
            </svg>
        );
    };
    

    return ( 
        <div className="questions">
            <h3>{currentLangData.questions.title}</h3>
            <div className='questions-container'>
                <div className='content'>
                    <p className='titleContent'>{currentLangData.questions.content}</p>
                    <p onClick={() => handleSelection('MCQ')} className={selectedType === 'MCQ' ? 'selected' : ''}>
                        <i className={currentLangData.questions.mcq.icon}></i> {currentLangData.questions.mcq.text}
                    </p>
                    <p onClick={() => handleSelection('Open')} className={selectedType === 'Open' ? 'selected' : ''}>
                        <i className={currentLangData.questions.open.icon}></i> {currentLangData.questions.open.text}
                    </p>
                    {(
                        <div className="score-wrap">
                            <div className="score">
                                <div className="score-bar">
                                    <div className="placeholder">{progressBar(100)}</div>
                                    <div className="score-circle">{progressBar((score / questions.length) * 100, true)}</div>
                                </div>
                                <div className="score-value">
                                    <div className="score-name">Score</div>
                                    <div className="score-number">{Math.round((score / questions.length) * 100)}%</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                {selectedType === 'MCQ' && <QCMType handleScoreUpdate={handleScoreUpdate} />}
                {selectedType === 'Open' && <OpenQType />}
            </div>
            <div className='btns'> 
                <button className='btn' onClick={() => generatePDF(questions)}><i className="bi bi-download"></i>   {currentLangData.questions.buttons.export} </button>
                <button className='btn' onClick={savequestions}>{currentLangData.questions.buttons.save} <i className="bi bi-chevron-right"></i></button>
            </div>
        </div>
    );
}
 
export default Questions;
