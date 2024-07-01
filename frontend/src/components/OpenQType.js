import React, { useContext } from 'react';
import './OpenQType.css';
import { LangContext } from '../context/LangContext';

const OpenQType = () => {
    const { currentLangData } = useContext(LangContext);

    // Vérifier si currentLangData ou ses propriétés sont définies avant de les utiliser
    if (!currentLangData || !currentLangData.openQType) {
        return <div>Loading...</div>; // Ou un message d'erreur approprié
    }

    return ( 
        <div className='listQuestions' > 
            <p className='titleList'><i className="bi bi-chat-square-fill"></i> {currentLangData.openQType.title}</p>
            <div className='quizexemple'>
                <div className='quizdiv'>
                    <p className='quiz'>What are the Solid Principles?</p>
                    <p className='deleteIcon'>  <i className="bi bi-trash-fill" ></i> </p>
                </div>      
                <p className='responce'>The Solid Principles are a set of principles that help developers write better code in object-oriented languages.</p>
            </div>
            <hr></hr>
            <div className='quizexemple'>
                <div className='quizdiv'>
                    <p className='quiz'>What are the Solid Principles?</p>
                    <p className='deleteIcon'>  <i className="bi bi-trash-fill" ></i> </p>
                </div>      
                <p className='responce'>The Solid Principles are a set of principles that help developers write better code in object-oriented languages.</p>
            </div>
            <hr></hr>
            <div className='quizexemple'>
                <div className='quizdiv'>
                    <p className='quiz'>What are the Solid Principles?</p>
                    <p className='deleteIcon'>  <i className="bi bi-trash-fill" ></i> </p>
                </div>     
                <p className='responce'>The Solid Principles are a set of principles that help developers write better code in object-oriented languages.</p>
            </div>
            <hr></hr>
            <div className='quizexemple'>
                <div className='quizdiv'>
                    <p className='quiz'>What are the Solid Principles?</p>
                    <p className='deleteIcon'>  <i className="bi bi-trash-fill" ></i> </p>
                </div>     
                <p className='responce'>The Solid Principles are a set of principles that help developers write better code in object-oriented languages.</p>
            </div>
            <hr></hr>
            <div className='quizexemple'>
                <div className='quizdiv'>
                    <p className='quiz'>What are the Solid Principles?</p>
                    <p className='deleteIcon'>  <i className="bi bi-trash-fill" ></i> </p>
                </div>     
                <p className='responce'>The Solid Principles are a set of principles that help developers write better code in object-oriented languages.</p>
            </div>
            <button className="add"> <i className="bi bi-plus-lg"></i>    {currentLangData.openQType.addQuestion}</button>
            <button className="more"> <i className="bi bi-arrow-clockwise"></i>   {currentLangData.openQType.generateMore}</button>
        </div>
    );
}
 
export default OpenQType;
