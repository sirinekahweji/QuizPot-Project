import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const QuizDetails = ({ show, handleClose, quizTitle }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{quizTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Details about {quizTitle}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default QuizDetails;
