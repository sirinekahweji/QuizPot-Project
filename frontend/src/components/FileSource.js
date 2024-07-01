import React, { useContext } from 'react';
import './FileSource.css';
import { LangContext } from '../context/LangContext';

const FileSource = () => {
    const { currentLangData } = useContext(LangContext);

    return (
        <div className="filesource">
            <h5>{currentLangData.fileSource.title}</h5>
            <div className="fileSource-container">
                <h6>{currentLangData.fileSource.uploadPrompt}</h6>
                <label htmlFor="fileInput" className='addFile'>
                    <i className="bi bi-file-earmark-plus-fill"></i>
                </label>
                <input
                    id="fileInput"
                    type="file"
                    style={{ display: 'none' }} 
                />
                <p>{currentLangData.fileSource.supportedFormats}</p>
                <p>{currentLangData.fileSource.maxSize}</p>
            </div>
        </div>
    );
}

export default FileSource;
