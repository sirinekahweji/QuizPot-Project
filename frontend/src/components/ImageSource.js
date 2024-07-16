import React, { useContext, useState, useEffect } from 'react';
import './ImageSource.css';
import { LangContext } from '../context/LangContext';
import axios from 'axios';
import { useAuthContext } from '../Hooks/useAuthContext';
import { QuestionsContext } from '../context/QuestionsContext';

const ImageSource = () => {
    const { currentLangData } = useContext(LangContext);
    const { user } = useAuthContext();
    const { setQuestions } = useContext(QuestionsContext);
    const [selectedImage, setSelectedImage] = useState(null);
    const [status, setStatus] = useState('');

    async function generate(event) {
        try {
            const file = event.target.files[0];
            const formData = new FormData();
            formData.append('image', file);
            console.log("dans generate")
            const response = await axios.post('http://localhost:5000/api/question/generateFromImage', formData , {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${user.token}`,
            },
          });
      
          console.log('Response:', response.data);
          setQuestions(response.data.message);
        } catch (error) {
          console.error('Error generating questions:', error);
        }
      }
    

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
                    onChange={generate}
                />
                <p>{currentLangData.imageSource.supportedFormats}</p>
            </div>
         
        </div>
    );
};

export default ImageSource;
