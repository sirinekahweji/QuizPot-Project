import React, { useState } from 'react';
import './Questions.css';
import OpenQType from './OpenQType';
import QCMType from './QCMType';

const Questions = () => {
    const [selectedType, setSelectedType] = useState('MCQ'); // État pour suivre la sélection

    const handleSelection = (type) => {
        setSelectedType(type);
    }

    return ( 
        <div className="questions">
            <h3>Questions</h3>
            <div className='questions-container'>
                <div className='content'>
                    <p className='titleContent'>Content</p>
                    <p onClick={() => handleSelection('MCQ')} className={selectedType === 'MCQ' ? 'selected' : ''}>
                        <i className="bi bi-list-check"></i> MCQ
                    </p>
                    <p onClick={() => handleSelection('Open')} className={selectedType === 'Open' ? 'selected' : ''}>
                        <i className="bi bi-chat-square-fill"></i> Open Questions
                    </p>
                </div>
                {/* List Questions */}
                {selectedType === 'MCQ' && <QCMType />}
                {selectedType === 'Open' && <OpenQType />}
            </div>
            <div className='btns'> 
                <button className='btn'>Export</button>
                <button className='btn'>Save</button>
            </div>
        </div>
    );
}
 
export default Questions;
