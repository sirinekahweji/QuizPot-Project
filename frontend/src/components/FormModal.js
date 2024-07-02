import React, { useState, useContext } from 'react';
import './FormModal.css';
import { Modal } from 'react-bootstrap';
import { LangContext } from '../context/LangContext';

const FormModal = ({ show, handleClose, onSubmit }) => {
  const { currentLangData } = useContext(LangContext);

  const [topic, setTopic] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [numQuestions, setNumQuestions] = useState('');
  const [focusAreas, setFocusAreas] = useState('');
  const [level, setLevel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      topic,
      difficulty,
      level,
      numQuestions: parseInt(numQuestions),
      focusAreas
    };
    onSubmit(formData);
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
