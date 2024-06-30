import React, { useState } from 'react';
import './Home.css';
import Steps from '../components/steps';
import Services from '../components/services';
import Sources from '../components/Sources';
import QuestionsType from '../components/QuestionsType';
import Questions from '../components/Questions';

const Home = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleStepClick = (step) => {
        setCurrentStep(step);
    };

    const handleContinue = () => {
        setCurrentStep(2); // Passe à l'étape QuestionsType
    };

    const handleGenerateQuiz = () => {
        setCurrentStep(3); // Passe à l'étape Questions
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Sources onContinue={handleContinue} />;
            case 2:
                return <QuestionsType onGenerateQuiz={handleGenerateQuiz} />;
            case 3:
                return <Questions />;
            default:
                return null;
        }
    };

    return (  
        <div className="homePage">
            <Services />
            <Steps currentStep={currentStep} onStepClick={handleStepClick} />
            {renderStep()}
        </div>
    );
}

export default Home;
