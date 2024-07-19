import React, { useContext , useState } from 'react';
import './Home.css';
import Form from '../components/Form';

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

    const handleClick = () => {
        logout();
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
                            <stop offset="0%" stopColor="orange" />
                            <stop offset="25%" stopColor="green" />
                            <stop offset="100%" stopColor="purple" />
                        </linearGradient>
                    </defs>
                )}
            </svg>
        );
    };


    return (  
        <div className="homePage">
            <h2 className='welcome'>Welcome, {user.name}</h2>
            <p className='welcomeText'>Fill  the form and get your quizzes</p>

            <div className='content'>
                    <p className='titleContent'>Content</p>
                    <p className='formcontent'>
                        <i className={currentLangData.questions.mcq.icon}></i> Form
                    </p>
                    <p className='questionsContent'>
                        <i className={currentLangData.questions.open.icon}></i> Questions
                    </p>
                    <p className=''>
                    <i class="bi bi-chat-heart-fill"></i>   My Quizzes 
                    </p>

                    {(
                        <div className="score-wrap">
                            <div className="score">
                                <div className="score-bar">
                                    <div className="placeholder">{progressBar(100)}</div>
                                    <div className="score-circle">{progressBar(score, true)}</div>
                                </div>
                                <div className="score-value">
                                    <div className="score-name">Score</div>
                                    <div className="score-number">{score}%</div>
                                </div>
                            </div>
                        </div>
                    )}
                <p onClick={handleClick} className='logout-btn'><i className="bi bi-box-arrow-right"></i> {currentLangData.logout}</p>
                </div>

                <Form/>

            </div>
    );
}

export default Home;
