import React, { useState } from 'react';
import './Home.css';
import Steps from '../components/steps';
import Services from '../components/services';
import Sources from '../components/Sources';
import QuestionsType from '../components/QuestionsType';

const Home = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const handleStepClick = (step) => {
        setCurrentStep(step);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Sources onContinue={handleContinue} />;
            case 2:
                return <QuestionsType />;
            case 3:
                return <div>Placeholder for Questions component</div>; // Mettez ici le composant pour les Questions
            default:
                return null;
        }
    };

    const handleContinue = () => {
        setCurrentStep(2); // Passe à l'étape QuestionsType
    };

    return (  
        <div className="homePage">
          <Services></Services>
            <Steps currentStep={currentStep} onStepClick={handleStepClick} />
            {renderStep()}
        </div>
    );
}

export default Home;
