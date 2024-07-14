import React, { useContext, useState, useEffect } from 'react';
import './ImageSource.css';
import { LangContext } from '../context/LangContext';
import Tesseract from 'tesseract.js';

const ImageSource = () => {
    const { currentLangData } = useContext(LangContext);
    const [recognizedText, setRecognizedText] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('');

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        setRecognizedText('');
    };

    useEffect(() => {
        const recognizeText = async () => {
            if (selectedImage) {
                try {
                    const result = await Tesseract.recognize(
                        selectedImage,
                        'eng',
                        {
                            logger: m => {
                                console.log(m);
                                setStatus(m.status);
                                setProgress(m.progress);
                            },
                        }
                    );
                    setRecognizedText(result.data.text);
                    setStatus('completed');
                    setProgress(1);
                    console.log(result.data.text);
                } catch (error) {
                    console.log(error);
                    setStatus('error');
                }
            }
        };
        recognizeText();
    }, [selectedImage]);

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
                    onChange={handleFileUpload}
                />
                <p>{currentLangData.imageSource.supportedFormats}</p>
            </div>
            {selectedImage && <img src={URL.createObjectURL(selectedImage)} alt="Selected" />}
            {status && (
                <div className="status">
                    <p>Status: {status}</p>
                    <progress value={progress} max="1"></progress>
                </div>
            )}
            {recognizedText && (
                <div className="recognized-text">
                    <h6>Recognized Text:</h6>
                    <textarea value={recognizedText} readOnly rows={10} style={{ width: '100%' }} />
                </div>
            )}
        </div>
    );
};

export default ImageSource;
