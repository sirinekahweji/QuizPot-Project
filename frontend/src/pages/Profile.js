import React, { useContext, useState } from 'react';
import { LangContext } from '../context/LangContext';
import ProfileBar from '../components/ProfileBar';
import Search from '../components/SearchComponent';
import Services from '../components/services';
import QuizDetailsModal from '../components/QuizDetails';
import './Profile.css';

const Profile = () => {
  const { currentLangData } = useContext(LangContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedQuizTitle, setSelectedQuizTitle] = useState('');

  const handleOpenModal = (quizTitle) => {
    setSelectedQuizTitle(quizTitle);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="ProfilePage">
      <Services />
      <h2 className='titleQuizz'>{currentLangData.profile.myQuizzesTitle}</h2>
      <Search />
      <ProfileBar />

      <div className='myquizzes'>
        {['Solid Principles', 'Another Quiz', 'Yet Another Quiz'].map((quizTitle, index) => (
          <div className='myquiz' key={index}>
            <p className='quizTitle' onClick={() => handleOpenModal(quizTitle)}>
              <i className="bi bi-chat-square-fill"></i> {quizTitle}
            </p>
            <div className='right-div'>
              <p className='nbquestions'>10 questions</p>
              <p className='favIcon'><i className="bi bi-chat-square-heart-fill"></i></p>
              <p className='deleteIcon'><i className="bi bi-trash-fill"></i></p>
              <button className='btnexport'><i className="bi bi-download"></i> {currentLangData.profile.exportButton}</button>
            </div>
          </div>
        ))}
      </div>
      <button className='add-quiz'><i className="bi bi-plus-lg"></i> {currentLangData.profile.createQuizFolder}</button>

      <QuizDetailsModal show={showModal} handleClose={handleCloseModal} quizTitle={selectedQuizTitle} />
    </div>
  );
};

export default Profile;
