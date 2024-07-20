import React, { useContext, useState } from 'react';
import './Home.css';
import Form from '../components/Form';
import Quizzes from '../components/Myquizzes';
import Questions from '../components/QCMType';
import Sources from '../components/services';
import { useAuthContext } from '../Hooks/useAuthContext';
import { QuestionsContext } from '../context/QuestionsContext';
import { FormDataContext } from '../context/FormDataContext';
import { LangContext } from '../context/LangContext';
import { useLogout } from "../Hooks/useLogout";

const Home = () => {
    const { user } = useAuthContext();
    const [score, setScore] = useState(0);
    const { questions } = useContext(QuestionsContext);
    const { formData } = useContext(FormDataContext);
    const { currentLangData } = useContext(LangContext);
    const logout = useLogout();
    const [selectedContent, setSelectedContent] = useState('form');

    const handleClick = () => {
        logout();
    };

    const handleScoreUpdate = (newScore) => {
        setScore(newScore);
    };

    const handleContentSelect = (content) => {
        setSelectedContent(content);
    };

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
        <div className="homePage">
            <Sources></Sources>
            <h2 className='welcome'>Welcome, {user.name}</h2>
            <p className='welcomeText'>Fill the form and get your quizzes</p>

            <div className='content'>
            <p className='titleContent'>Content</p>
            <p
                className={`formcontent ${selectedContent === 'form' ? 'selected' : ''}`}
                onClick={() => handleContentSelect('form')}
            >
                <i className={currentLangData.questions.mcq.icon}></i> Form
            </p>
            <p
                className={`questionsContent ${selectedContent === 'questions' ? 'selected' : ''}`}
                onClick={() => handleContentSelect('questions')}
            >
                <i className={currentLangData.questions.open.icon}></i> Questions
            </p>
            <p 
             className={`myquizzesContent ${selectedContent === 'myquizzes' ? 'selected' : ''}`}
             onClick={() => handleContentSelect('myquizzes')}
            >
                <i className="bi bi-chat-heart-fill"></i> My Quizzes
            </p>
                <div className="score-wrap">
                    <div className="score">
                        <div className="score-bar">
                            <div className="placeholder">{progressBar(100)}</div>
                            <div className="score-circle">
                                {questions ? progressBar((score / questions.length) * 100, true) : progressBar(0, true)}
                            </div>
                        </div>
                        <div className="score-value">
                            <div className="score-name">Score</div>
                            <div className="score-number">
                                {questions ? Math.round((score / questions.length) * 100) : 0}%
                            </div>
                        </div>
                    </div>
                </div>
                <p onClick={handleClick} className='logout-btn'><i className="bi bi-box-arrow-right"></i> {currentLangData.logout}</p>
            </div>

            {selectedContent === 'form' && <Form />}
            {selectedContent === 'questions' && <Questions handleScoreUpdate={handleScoreUpdate} />}
            {selectedContent === 'myquizzes' && <Quizzes  />}
        </div>
    );
}

export default Home;
