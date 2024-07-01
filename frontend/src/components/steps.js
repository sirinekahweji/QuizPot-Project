import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './Steps.css';
import { LangContext } from '../context/LangContext';

const Steps = ({ currentStep, onStepClick }) => {
    const { currentLangData } = useContext(LangContext);

    return ( 
        <div className="steps"> 
            <p 
                className={currentStep === 1 ? 'selected-step' : ''} 
                onClick={() => onStepClick(1)}
            >
                {currentLangData.steps.source}
            </p>
            <p 
                className={currentStep === 2 ? 'selected-step' : ''} 
                onClick={() => onStepClick(2)}
            >
                {currentLangData.steps.questionsType}
            </p>
            <p 
                className={currentStep === 3 ? 'selected-step' : ''} 
                onClick={() => onStepClick(3)}
            >
                {currentLangData.steps.questions}
            </p>
        </div>
     );
}

Steps.propTypes = {
    currentStep: PropTypes.number.isRequired,
    onStepClick: PropTypes.func.isRequired,
};

export default Steps;
