import React, { useContext } from 'react';
import './ImageSource.css';
import { LangContext } from '../context/LangContext';

const ImageSource = () => {
    const { currentLangData } = useContext(LangContext);

    return (
        <div className="imagesource">
            <h5>{currentLangData.imageSource.title}</h5>
            <div className="imageSource-container">
                <h6>{currentLangData.imageSource.uploadPrompt}</h6>
                <label htmlFor="fileInput" className='addFile'>
                    <i className="bi bi-file-earmark-plus-fill"></i>
                </label>
                <input
                    id="fileInput"
                    type="file"
                    style={{ display: 'none' }} 
                />
                <p>{currentLangData.imageSource.supportedFormats}</p>
            </div>
        </div>
    );
}

export default ImageSource;
