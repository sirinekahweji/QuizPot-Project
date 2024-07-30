import React ,{ useState,useContext ,useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { useAuthContext } from '../Hooks/useAuthContext';
import jsPDF from 'jspdf';
import './QuizDetails.css';
import { LangContext } from '../context/LangContext';



const QuizDetailsModal = ({ show, handleClose, selectedQuiz }) => {
  const { user } = useAuthContext();
  const [questions, setquestions] = useState(null);
  const { currentLangData } = useContext(LangContext);



  useEffect(() => {
    if (show && selectedQuiz ) {
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
        console.log("selectedQuiz",selectedQuiz);

        console.log("id form",selectedQuiz._id);
        const response = await axios.get(`http://localhost:5000/api/question/${selectedQuiz._id}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });
        
        const data = response.data;
        console.log("data return details",data);

        setquestions(data.questions);
        console.log("data",data);
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };




const generatePDF = (qs, formresponse) => {
  const doc = new jsPDF();
  let yPos = 10;
  const margin = 10;
  const lineHeight = 7;
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageWidth = doc.internal.pageSize.getWidth();
  const maxLineWidth = pageWidth - 2 * margin;

  const addPageIfNeeded = () => {
    if (yPos + lineHeight > pageHeight) {
      doc.addPage();
      yPos = 10; // Reset y position for the new page
    }
  };

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(255, 0, 0);
  doc.text(`${currentLangData.formModal.topicLabel}  ${formresponse.topic}`, margin, yPos);
  yPos += 10;
  addPageIfNeeded();

  doc.setFontSize(9);
  doc.setTextColor(0, 0, 0);
  doc.text(`${currentLangData.formModal.levelLabel}  ${formresponse.level}`, margin + 10, yPos);
  doc.text(`${currentLangData.formModal.difficultyLabel}  ${formresponse.difficulty}`, margin + 70, yPos);
  doc.text(`${currentLangData.formModal.focusAreasLabel}  ${formresponse.focusAreas}`, margin + 120, yPos);
  yPos += 10;
  addPageIfNeeded();

  qs.forEach((q, index) => {
    // Question
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    let questionText = doc.splitTextToSize(`Question ${index + 1}: ${q.questionText}`, maxLineWidth);
    questionText.forEach(line => {
      addPageIfNeeded();
      doc.text(line, margin, yPos);
      yPos += lineHeight;
    });

    // Choices
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    q.options.forEach((choice, choiceIndex) => {
      let choiceText = doc.splitTextToSize(`${String.fromCharCode(97 + choiceIndex)}) ${choice}`, maxLineWidth);
      choiceText.forEach(line => {
        addPageIfNeeded();
        doc.text(line, margin + 10, yPos);
        yPos += lineHeight;
      });
    });

    // Answer
    doc.setFont('helvetica', 'italic');
    let answerText = doc.splitTextToSize(`Answer: ${q.correctAnswer}`, maxLineWidth);
    answerText.forEach(line => {
      addPageIfNeeded();
      doc.text(line, margin, yPos);
      yPos += lineHeight;
    });

    yPos += lineHeight;
    addPageIfNeeded();
  });

  doc.save('questions.pdf');
};




  return (
    <Modal show={show} onHide={handleClose} ClassName="custom-modal" >
      <Modal.Header closeButton>
        <Modal.Title ><p className='topic' >{selectedQuiz.topic}</p></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className='details'><b>{currentLangData.formModal.levelLabel} </b>{selectedQuiz.level}</p>
        <p className='details' ><b>{currentLangData.formModal.difficultyLabel} </b>{selectedQuiz.difficulty}</p>
        {selectedQuiz.focusAreas && <p className='details' ><b>{currentLangData.formModal.focusAreasLabel}  </b>{selectedQuiz.focusAreas}</p>}
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
      <button className='export-btn' onClick={() => generatePDF(questions, selectedQuiz)}><i className="bi bi-download" ></i> Export</button>
      </Modal.Footer>
    
    </Modal>
  );
};

export default QuizDetailsModal;
