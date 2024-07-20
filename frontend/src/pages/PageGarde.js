import './PageGarde.css';
import SignIn from '../components/SignIn';
import videoBg from '../assets/videos/bg1.mp4';
import React, { useContext } from 'react';
import { LangContext } from '../context/LangContext';

const PageGarde = () => {
    const { currentLangData } = useContext(LangContext); 
    const descriptions = [
        'Transform Learning Into An Easy Adventure With Our QuizBot',
        'Track Your Progress And Improve With Each Attempt',
        'Auto-evaluate With Quiz Scores',
        'Select A Topic And Take A Test',
        'Create Quizzes Instantly'
    ];

       
    return (  
        <div className="home">            
            <div className='pageGarde'>
                <video autoPlay loop muted className="background">
                    <source src={videoBg} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>                   
                <div className="left-container">
                    <h1 className='title'> {currentLangData.title}</h1>
                    <h3 className='description'>
                        <div className="wordCarousel">
                            <div>
                                <ul className={`flip${descriptions.length}`}>
                                    {descriptions.map((desc, index) => (
                                        <li key={index}>{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </h3>
                </div>
                <div className="signin-container">
                   <SignIn />
                 </div>
            </div>
        </div>
    );
}

export default PageGarde;
