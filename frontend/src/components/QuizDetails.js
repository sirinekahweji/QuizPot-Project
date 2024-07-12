import React from 'react';
import { Modal } from 'react-bootstrap';

const QuizDetailsModal = ({ show, handleClose, selectedQuiz }) => {

  if (!selectedQuiz) {
    return null;
  }
  console.log(selectedQuiz)

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedQuiz.topic}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><b>Education Level: </b>{selectedQuiz.level}</p>
        <p><b>Difficulty Level: </b>{selectedQuiz.difficulty}</p>
        <p><b>Number of Questions: </b></p>
        <p><b>Specific Focus Areas: </b></p>
        <div className='questionsList'>

        </div>
      </Modal.Body>
    
    </Modal>
  );
};

export default QuizDetailsModal;
