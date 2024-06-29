import React from 'react';
import PropTypes from 'prop-types';
import './Steps.css';

const Steps = ({ currentStep, onStepClick }) => {
    return ( 
        <div className="steps"> 
            <p 
                className={currentStep === 1 ? 'selected-step' : ''} 
                onClick={() => onStepClick(1)}
            >
                Source
            </p>
            <p 
                className={currentStep === 2 ? 'selected-step' : ''} 
                onClick={() => onStepClick(2)}
            >
                Questions type
            </p>
            <p 
                className={currentStep === 3 ? 'selected-step' : ''} 
                onClick={() => onStepClick(3)}
            >
                Questions
            </p>
        </div>
     );
}

Steps.propTypes = {
    currentStep: PropTypes.number.isRequired,
    onStepClick: PropTypes.func.isRequired,
};

export default Steps;
