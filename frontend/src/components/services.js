import fileIcon from '../assets/fileicon.png';
import youtubIcon from '../assets/youtubicon.png';
import imageIcon from '../assets/imageicon1.png';
import audioIcon from '../assets/audioicon.png';
import noImage from '../assets/noimage.png';

import React, { useContext, useState } from 'react';
import './Services.css'; 
import { LangContext } from '../context/LangContext'; 
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Services = () => {
  const { currentLangData } = useContext(LangContext); 
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return ( 
    <div className='services'> 
      <div className='service'>
        <p>{currentLangData.services.questionFile}</p>
        <img src={fileIcon} className='serviceIcon' alt='fileIcon'/>
      </div>
      <div className='service'>
        <p>{currentLangData.services.questionAudio}</p>
        <img src={audioIcon} className='serviceIcon' alt='audioIcon' />
      </div>
      <div className='service'>
        <p>{currentLangData.services.questionVideo}</p>
        <img src={youtubIcon} className='serviceIcon' alt='youtubIcon'/>
      </div>
      <div className='service'>
        <p>{currentLangData.services.questionImage}</p>
        <img src={imageIcon} className='serviceIcon' alt='imageIcon' />
      </div>
      <img 
        src={noImage} 
        className='profileIcon' 
        alt="profilePhoto" 
        onClick={handleShowModal}
        style={{ cursor: 'pointer' }}
      />

      <Modal 
        show={showModal} 
        onHide={handleCloseModal} 
        backdrop={false} 
        animation={false}
        className="custom-modal"
      >
        <Modal.Body>
          <ul className="dropdown-menu show">
            <li><Button className="dropdown-item" onClick={handleCloseModal}>Voir profile</Button></li>
            <hr className="dropdown-divider" />
            <li><Button className="dropdown-item" onClick={handleCloseModal}>Log out</Button></li>
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Services;
