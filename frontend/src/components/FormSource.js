import React, { useState, useContext } from 'react';
import './FormSource.css';
import { LangContext } from '../context/LangContext';
import FormModal from './FormModal';

const FormSource = () => {
  const { currentLangData } = useContext(LangContext);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="filesource">
      <h5>{currentLangData.formSource.title}</h5>
      <div className="fileSource-container">
        <h6>{currentLangData.formSource.uploadPrompt}</h6>
        <p className='openModal' onClick={handleOpenModal}>
        <i className="bi bi-clipboard-fill"></i>
        </p>
      </div>
      <FormModal show={showModal} handleClose={handleCloseModal} />
    </div>
  );
};

export default FormSource;
