import React, { useState, useContext } from 'react';
import './Questions.css';
import { LangContext } from '../context/LangContext';
import OpenQType from './OpenQType';
import QCMType from './QCMType';
import axios from 'axios';
import jsPDF from 'jspdf';
import { useAuthContext } from '../Hooks/useAuthContext';
import { QuestionsContext } from '../context/QuestionsContext';
import { FormDataContext } from '../context/FormDataContext';

const Questions = () => {
    const [selectedType, setSelectedType] = useState('MCQ'); 
    const { currentLangData } = useContext(LangContext);
    const { questions } = useContext(QuestionsContext);
    const { formData } = useContext(FormDataContext);
    const { user } = useAuthContext();
    const [score, setScore] = useState(0);
    const [error, setError] = useState(null); 
    const [formResponseId, setFormResponseId] = useState(null); 

    const saveformresponses= async () => {
        try {

           const newformdata={
            ...formData,
            score: Math.round((score / questions.length) * 100)
           }
        
            console.log(newformdata);
            const response = await axios.post('http://localhost:5000/api/responseForm/save',newformdata,{
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}` 
              }
            
            });
            console.log('formData saved successfully:', response.data);

            setFormResponseId(response.data._id);
            console.log("formResponseId:",response.data._id)
            return response.data; 
          } catch (error) {
            console.error('Error  save formData', error);
            setError('Failed to save formData. Please try again later.');
          }
    }

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
    
    
            yPos += lineHeight;
        });
    
        doc.save('generated_questions.pdf');
    };


    const handleScoreUpdate = (newScore) => {
        setScore(newScore); 
    };

    const savequestions = async () => {
        try {

           if(formResponseId!=null){
            const response = await axios.post('http://localhost:5000/api/question/save-questions',{ questions,formResponseId },{
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}` 
              }
            
            });
            console.log('Questions saved successfully:', response.data);
            return response.data;
        }
          } catch (error) {
            console.error('Error  save questions', error);
            setError('Failed to save questions. Please try again later.');
          }
    }

    const handleSave = async (e) => {
        e.preventDefault();
        await saveformresponses();
        await savequestions();
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
                    strokeDasharray={`${dashArray} 10000`} 
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
                <button className='btn' onClick={handleSave}>{currentLangData.questions.buttons.save} <i className="bi bi-chevron-right"></i></button>
            </div>
        </div>
    );
}
 
export default Questions;
