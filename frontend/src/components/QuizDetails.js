import React ,{ useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { useAuthContext } from '../Hooks/useAuthContext';
import jsPDF from 'jspdf';
import './QuizDetails.css';




const QuizDetailsModal = ({ show, handleClose, selectedQuiz }) => {
  const { user } = useAuthContext();
  const [questions, setquestions] = useState(null);


  useEffect(() => {
    if (show && selectedQuiz && questions===null) {
      fetchQuestions();
    }
  }, [show, selectedQuiz]); 


  useEffect(() => {
    if (questions) {
      console.log("Updated questions:", questions);
    }
  }, [questions]);

  if (!selectedQuiz) {
    return null;
  }

 

  const fetchQuestions = async () => {
    try {
      if (selectedQuiz) {
        console.log(selectedQuiz);
        console.log(selectedQuiz._id);
        const response = await axios.get(`http://localhost:5000/api/question/${selectedQuiz._id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });
        
        const data = response.data;
        setquestions(data.questions);
        console.log("data",data);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };



  const generatePDF = (qs,formresponse) => {
    const doc = new jsPDF();
    let yPos = 10;
    const margin = 10;
    const lineHeight = 7;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text(`Topic : ${formresponse.topic}`, margin, yPos);
    yPos += 10;


    qs.map((q, index) => {
        // Question
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text(`Question ${index + 1}: ${q.questionText}`, margin, yPos);
        yPos += lineHeight;

        // Choices
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        q.options.map((choice, choiceIndex) => {
            doc.text(`${String.fromCharCode(97 + choiceIndex)}) ${choice}`, margin + 10, yPos);
            yPos += lineHeight;
        });

        // Answer
        doc.setFont('helvetica', 'italic');
        doc.text(`Answer: ${q.correctAnswer}`, margin, yPos);
        yPos += lineHeight;


        yPos += lineHeight;
    });

    doc.save('questions.pdf');
};


  return (
    <Modal show={show} onHide={handleClose} >
      <Modal.Header closeButton>
        <Modal.Title>{selectedQuiz.topic}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p><b>Education Level: </b>{selectedQuiz.level}</p>
        <p><b>Difficulty Level: </b>{selectedQuiz.difficulty}</p>
        {selectedQuiz.focusAreas && <p><b>Specific Focus Areas:</b>{selectedQuiz.focusAreas}</p>}
        <div className='questionsList'>
          <p><b>Questions</b></p>
          {questions && questions.map((question, index) => (
            <div key={question._id} style={{ marginBottom: '20px' }}>
              <p><b>Question {index + 1}:</b> {question.questionText}</p>
             <ul>
                {question.options && question.options.map((option, optionIndex) => (
                  <li key={optionIndex}>{option}</li>
                ))}
              </ul>
              <p><b>Correct Answer:</b> {question.correctAnswer}</p>

        
            </div>
          ))}

        </div>
      </Modal.Body>
      <Modal.Footer>
      <button className='btnexport' onClick={() => generatePDF(questions, selectedQuiz)}><i className="bi bi-download" ></i> Export</button>
      </Modal.Footer>
    
    </Modal>
  );
};

export default QuizDetailsModal;
