import React, { useContext, useState, useEffect } from 'react';
import './ImageSource.css';
import { LangContext } from '../context/LangContext';
import axios from 'axios';
import Swal from 'sweetalert2';
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
          Swal.fire({
            icon: 'success',
            title: 'Generated',
            text: 'Your Questions has been generated successfully.',
            timer: 1500,
            showConfirmButton: false
        });
        } catch (error) {
          console.error('Error generating questions:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to generate Questions. Please try again.',
            timer: 2000,
            showConfirmButton: false
        });
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
                    accept=".jpg,.jpeg,.png,.webp,.heic,.heif"
                    style={{ display: 'none' }}
                    onChange={generate}
                />
                <p>{currentLangData.imageSource.supportedFormats}</p>
            </div>
         
        </div>
    );
};

export default ImageSource;
