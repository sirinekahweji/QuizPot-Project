import React, { useContext, useState } from 'react';
import './FormModal.css';
import { Modal } from 'react-bootstrap';
import { LangContext } from '../context/LangContext';
import axios from 'axios';
import { useAuthContext } from '../Hooks/useAuthContext';
import { QuestionsContext } from '../context/QuestionsContext';
import { FormDataContext } from '../context/FormDataContext'; 

const FormModal = ({ show, handleClose }) => {
  const { currentLangData } = useContext(LangContext);
  const { user } = useAuthContext();
  const { setQuestions } = useContext(QuestionsContext);
  const { formData, setFormData } = useContext(FormDataContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const submitData = {
      ...formData,
      numQuestions: parseInt(formData.numQuestions),
    };

    try {
      const response = await axios.post('http://localhost:5000/api/question/generate', submitData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
      });

      console.log('Response:', response.data); 
      setQuestions(response.data.message);
    } catch (error) {
    
      console.error('Error generating questions:', error);
      setError('Failed to generate questions. Please try again later.');
      alert('Failed to generate questions. Please try again later.');
      /*setFormData({
        topic: '',
        level: '',
        difficulty: '',
        numQuestions: '',
        focusAreas: '',
      });*/
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} className='formModal'>
      <Modal.Header closeButton>
        <Modal.Title className='formtitle'>
          <i className="bi bi-clipboard-fill"></i> {currentLangData.formModal.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} className="quizbot-form">
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
          <div className="form-group">
            <label>{currentLangData.formModal.focusAreasLabel}</label>
            <textarea
              name="focusAreas"
              placeholder={currentLangData.formModal.focusAreasPlaceholder}
              value={formData.focusAreas}
              onChange={handleChange}
            />
          </div>
          <div className="button-container">
            <button type="submit" variant="secondary" className='submitform' >
              {currentLangData.formModal.continueButton}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default FormModal;
