import React, { useState, useContext } from 'react';
import './Questions.css';
import { LangContext } from '../context/LangContext';
import OpenQType from './OpenQType';
import QCMType from './QCMType';

const Questions = () => {
    const [selectedType, setSelectedType] = useState('MCQ'); // État pour suivre la sélection
    const { currentLangData } = useContext(LangContext);

    const handleSelection = (type) => {
        setSelectedType(type);
    }

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
                </div>
                {/* List Questions */}
                {selectedType === 'MCQ' && <QCMType />}
                {selectedType === 'Open' && <OpenQType />}
            </div>
            <div className='btns'> 
                <button className='btn'>{currentLangData.questions.buttons.export}</button>
                <button className='btn'>{currentLangData.questions.buttons.save}</button>
            </div>
        </div>
    );
}
 
export default Questions;
