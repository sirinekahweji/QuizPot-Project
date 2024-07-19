import './Myquizzes.css';
import React, { useContext, useState, useEffect } from 'react';
import { LangContext } from '../context/LangContext';
import { useAuthContext } from '../Hooks/useAuthContext';
import Search from '../components/SearchComponent';
import Swal from 'sweetalert2';
import QuizDetailsModal from '../components/QuizDetails';
import axios from 'axios';

const Myquizzes = () => {

    const { currentLangData } = useContext(LangContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [formResponses, setFormResponses] = useState([]);
  const { user } = useAuthContext();

  const handleOpenModal = (formResponse) => {
    setSelectedQuiz(formResponse);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedQuiz(null);
  };

  useEffect(() => {
    const fetchFormResponses = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/responseForm/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          }
        });
        setFormResponses(response.data);
      } catch (error) {
        console.error('Error fetching form responses:', error);
      }
    };
    fetchFormResponses();
  }, [user]);

  const deleteFormResponse= async (Id) => {
    try {
      await axios.delete(`http://localhost:5000/api/responseForm/${Id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      });
      setFormResponses(prevResponses => prevResponses.filter(response => response._id !== Id));
      Swal.fire({
        icon: 'success',
        title: 'Deleted',
        text: 'Your Questions has been deleted successfully.',
        timer: 1500, 
        showConfirmButton: false
    });
    } catch (error) {
      console.error('Error deleting quiz:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete Questions. Please try again.',
        timer: 2000, 
        showConfirmButton: false
    });
    }
  };

    return (  
        <div className="myquizzesComponent">
             <p className='titleQuizz'>{currentLangData.profile.myQuizzesTitle}</p>
      <Search />
      <div className='myquizzes'>
        {formResponses && formResponses.map((formResponse, index) => (
          <div className='myquiz' key={index}>
            <p className='quizTitle' onClick={() => handleOpenModal(formResponse)}>
              <i className="bi bi-chat-square-fill"></i> {formResponse.topic}
            </p>
            <div className='right-div'>
              <p className='nbquestions'>Score : {formResponse.score}</p>
              <p className='deleteIcon'><i className="bi bi-trash-fill" onClick={() => deleteFormResponse(formResponse._id)} ></i></p>
            </div>
          </div>
        ))}
      </div>
      <QuizDetailsModal show={showModal} handleClose={handleCloseModal} selectedQuiz={selectedQuiz} />
    </div>

    );
}
 
export default Myquizzes;