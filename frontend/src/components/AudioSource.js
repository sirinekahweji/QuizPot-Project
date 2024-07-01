import React, { useContext } from 'react';
import './AudioSource.css';
import { LangContext } from '../context/LangContext';

const AudioSource = () => {
    const { currentLangData } = useContext(LangContext);

    return (
        <div className="audiosource">
            <h5>{currentLangData.audioSource.title}</h5>
            <div className="audioSource-container">
                <h6>{currentLangData.audioSource.uploadPrompt}</h6>
                <label htmlFor="fileInput" className='addFile'>
                    <i className="bi bi-file-earmark-plus-fill"></i>
                </label>
                <input
                    id="fileInput"
                    type="file"
                    style={{ display: 'none' }} 
                />            
                <p>{currentLangData.audioSource.supportedFormats}</p>
                <p>{currentLangData.audioSource.maxSize}</p>
            </div>
        </div>
    );
}
 
export default AudioSource;
