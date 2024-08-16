import './Form.css';
import React, { useContext, useState } from 'react';
import { LangContext } from '../context/LangContext';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import formIcon from '../assets/form.png';


import { useAuthContext } from '../Hooks/useAuthContext';
import { QuestionsContext } from '../context/QuestionsContext';
import { FormDataContext } from '../context/FormDataContext'; 
const MySwal = withReactContent(Swal);


const Form = ({ handleScoreUpdate ,onContentSelect}) => {
    const { currentLangData } = useContext(LangContext);
    const { user } = useAuthContext();
    const { setQuestions } = useContext(QuestionsContext);
    const { formData, setFormData } = useContext(FormDataContext);
    const [file, setFile] = useState(null);  
    const [ loading,setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        if (e.target.name === 'file') {
            const selectedFile = e.target.files[0];
            setFile(selectedFile);
            setFormData({
                ...formData,
                file: selectedFile,
            });
            console.log("setFormData", formData);
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            });
            console.log("setFormData", formData);
        }

    };
    const resetForm = () => {
        setFormData({
            topic: '',
            level: '',
            difficulty: '',
            numQuestions: '',
            focusAreas: '',
            file: null,
        });
        setFile(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        handleScoreUpdate(0); 


        const numQuestions = parseInt(formData.numQuestions);

        if (isNaN(numQuestions) || numQuestions <= 0) {
            setError('The number of questions must be a positive number.');
            return;
        }



        const formDataToSend = new FormData();
     //console.log("file",file);
        if (file !== null) {
            formDataToSend.append('file', file);
        }
        //console.log("file",file);


        formDataToSend.append('topic', formData.topic);
        formDataToSend.append('level', formData.level);
        formDataToSend.append('difficulty', formData.difficulty);
        formDataToSend.append('numQuestions', parseInt(formData.numQuestions));
        formDataToSend.append('focusAreas', formData.focusAreas);

        //console.log("formDataToSend",formDataToSend)

        MySwal.fire({
            title: 'Generating...',
            text: 'Please wait while we generate questions',
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            }
          });
    
        try {
            const response = await axios.post('http://localhost:5000/api/question/generate', formDataToSend, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': `Bearer ${user.token}`,
                },
            });

            //console.log('Response:', response.data);
            setQuestions(response.data.message);
            setLoading(false);


            Swal.fire({
                icon: 'success',
                title: 'Generated',
                text: 'Your Questions has been generated successfully.',
                timer: 1500,
                showConfirmButton: false
            });
            onContentSelect('questions'); 
        } catch (error) {
            console.error('Error generating questions:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to generate Questions. Please try again.',
                timer: 2000,
                showConfirmButton: false
            });
        } finally {
            setLoading(false);
        }
    };

    return ( 
        <div className="formComponent">
            <form onSubmit={handleSubmit} className="quizbot-form">
            <div className='formtitle'>
            <img src={formIcon} className='IconForm' alt='formIcon' />
            {currentLangData.services.form}</div>
                <div className="form-group">
                    <label>{currentLangData.formModal.topicLabel}</label>
                    <input
                        type="text"
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>{currentLangData.formModal.levelLabel}</label>
                    <select
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        required
                    >
                        <option value="">{currentLangData.formModal.selectLevel}</option>
                        <option value="University">{currentLangData.formModal.university}</option>
                        <option value="Elementary School">{currentLangData.formModal.elementary}</option>
                        <option value="Middle School">{currentLangData.formModal.middle}</option>
                        <option value="High School">{currentLangData.formModal.high}</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>{currentLangData.formModal.difficultyLabel}</label>
                    <select
                        name="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        required
                    >
                        <option value="">{currentLangData.formModal.selectDifficulty}</option>
                        <option value="Easy">{currentLangData.formModal.easy}</option>
                        <option value="Average">{currentLangData.formModal.average}</option>
                        <option value="Above Average">{currentLangData.formModal.aboveAverage}</option>
                        <option value="Difficult">{currentLangData.formModal.difficult}</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>{currentLangData.formModal.numQuestionsLabel}</label>
                    <input
                        type="number"
                        name="numQuestions"
                        value={formData.numQuestions}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <div className="error-message"><i className="bi bi-exclamation-circle-fill"></i>  {error}</div>}

                <div className="form-group">
                    <label>{currentLangData.formModal.focusAreasLabel}</label>
                    <textarea
                        name="focusAreas"
                        placeholder={currentLangData.formModal.focusAreasPlaceholder}
                        value={formData.focusAreas}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>{currentLangData.formModal.file}</label>
                    <input
                        type="file"
                        name="file"
                        accept=".pdf, .doc, .docx , .txt , .jpg,.jpeg,.png,.webp,.heic,.heif"
                        onChange={handleChange} 
                    />
                </div>

                <div className="button-container">
                    <button type="submit" variant="secondary" className='submitform'>
                        {currentLangData.formModal.continueButton}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Form;
