import React from 'react';
import { Modal, Button } from 'react-bootstrap';

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
        <p>Number of questions: 10</p>
        <p>{selectedQuiz.level}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary">
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuizDetailsModal;
