import fileIcon from '../assets/fileicon.png';
import youtubIcon from '../assets/youtubicon.png';
import imageIcon from '../assets/imageicon1.png';
import audioIcon from '../assets/audioicon.png';
import noImage from '../assets/noimage.png';

import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './Services.css'; 
import { LangContext } from '../context/LangContext'; 
import { Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

const Services = () => {
  const { currentLangData } = useContext(LangContext); 
  const location = useLocation();

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
      {(location.pathname !== '/' && location.pathname !== '/profile') && (
        <div className='profileIconContainer'>
          <img 
            src={noImage} 
            className='profileIcon' 
            alt="profilePhoto" 
            style={{ cursor: 'pointer' }}
          />
          <div className="custom-modal">
            <p className="modal-item" 
            >
              <Link to="/profile" style={{ textDecoration: "none" , color: "rgb(2, 7,72)"}}>
              <i class="bi bi-person"></i> {currentLangData.services.profile} 
              </Link>
            </p>
            <p className="modal-item">
              <Link to="/" style={{ textDecoration: "none" ,  color: "rgb(2, 7,72)" }}>
              <i class="bi bi-box-arrow-right"></i> {currentLangData.services.logout}
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;
