import {React, useState} from 'react';
import './FormModal.css';
import { Modal, Button } from 'react-bootstrap';

const FormModal = ({ show, handleClose,onSubmit }) => {

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
        <i className="bi bi-clipboard-fill"></i> Quiz Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form onSubmit={handleSubmit} className="quizbot-form">
      <div className="form-group">
        <label>Topic:</label>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Education Level:</label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          required
        >
          <option value="">Select level</option>
          <option value="University">University</option>
          <option value="Elementary School">Elementary School</option>
          <option value="Middle School">Middle School</option>
          <option value="High School">High School</option>
        </select>
      </div>
      <div className="form-group">
        <label>Difficulty Level:</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          required
        >
          <option value="">Select difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Average">Average</option>
          <option value="Above Average">Above Average</option>
          <option value="Difficult">Difficult</option>
        </select>
      </div>
     
     
      <div className="form-group">
        <label>Number of Questions:</label>
        <input
          type="number"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Specific Focus Areas:</label>
        <textarea placeholder='Any particular subtopics or concepts you want to be covered in the questions...'
          value={focusAreas}
          onChange={(e) => setFocusAreas(e.target.value)}
        />
      </div>
      <button type="submit" onClick={handleClose} variant="secondary"  className='submitform'>Continue</button>
    </form>
      </Modal.Body>
    </Modal>
  );
};

export default FormModal;
