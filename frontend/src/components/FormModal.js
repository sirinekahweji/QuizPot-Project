import React, { useState, useContext } from 'react';
import './FormModal.css';
import { Modal } from 'react-bootstrap';
import { LangContext } from '../context/LangContext';
import axios from 'axios';
import { useAuthContext } from '../Hooks/useAuthContext';



const FormModal = ({ show, handleClose }) => {
  const { currentLangData } = useContext(LangContext);
  const { user } = useAuthContext();


  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [numQuestions, setNumQuestions] = useState('');
  const [focusAreas, setFocusAreas] = useState('');
  const [level, setLevel] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [questions, setQuestions] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      topic,
      difficulty,
      level,
      numQuestions: parseInt(numQuestions),
      focusAreas
    };
    try {
      const response = await axios.post('http://localhost:5000/api/question/generate',formData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}` // Include the token in the Authorization header
        }
      });
      console.log('Response:', response); // Log the response to inspect what is being returned
      console.log('Response:', response.data); // Log the response to inspect what is being returned
      setQuestions(response.data);
    } catch (error) {
      console.error('Error generating lesson plan:', error);
      setError('Failed to generate lesson plan. Please try again later.');
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
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>{currentLangData.formModal.levelLabel}</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
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
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
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
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>{currentLangData.formModal.focusAreasLabel}</label>
            <textarea
              placeholder={currentLangData.formModal.focusAreasPlaceholder}
              value={focusAreas}
              onChange={(e) => setFocusAreas(e.target.value)}
            />
          </div>
          <div className="button-container">
            <button type="submit" onClick={handleClose} variant="secondary" className='submitform'>
              {currentLangData.formModal.continueButton}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default FormModal;
