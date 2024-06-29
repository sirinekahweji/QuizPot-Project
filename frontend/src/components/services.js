import fileIcon from '../assets/fileicon.png';
import youtubIcon from '../assets/youtubicon.png';
import imageIcon from '../assets/imageicon1.png';
import audioIcon from '../assets/audioicon.png';
import noImage from '../assets/noimage.png';

import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import './Services.css'; 
import { LangContext } from '../context/LangContext'; 
import { Button } from 'react-bootstrap';
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

      {location.pathname !== '/' && (
        <div className='profileIconContainer'>
          <img 
            src={noImage} 
            className='profileIcon' 
            alt="profilePhoto" 
            style={{ cursor: 'pointer' }}
          />
          <div className="custom-modal">
            <Button className="dropdown-item" 
            >
              <Link to="/profile" style={{ textDecoration: "none" , color: "black"}}>
                Voir profile
              </Link>
            </Button>
            <Button className="dropdown-item">
              <Link to="/" style={{ textDecoration: "none" ,  color: "black" }}>
                Log out
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;
