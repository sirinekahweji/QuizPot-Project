import formIcon from '../assets/form.png';
import questionsIcon from '../assets/questions.png';
import myquizzesIcon from '../assets/myquizzes.png';
import React, { useContext } from 'react';
import './Services.css'; 
import { LangContext } from '../context/LangContext'; 

import 'bootstrap/dist/css/bootstrap.min.css';

const Services = () => {
  const { currentLangData } = useContext(LangContext); 
  return ( 
    <div className='services'> 
      <div className='service'>
      <img src={formIcon} className='FormIcon' alt='formIcon' />

        <p>{currentLangData.services.form}</p>
      </div>
      <div className='service'>
      <img src={questionsIcon} className='serviceIcon' alt='questionsIcon' />

        <p>{currentLangData.services.questions}</p>
      </div>
      <div className='service'>
      <img src={myquizzesIcon} className='serviceIcon' alt='myquizzesIcon' />
        <p>{currentLangData.services.myquizzes}</p>
      </div>
    </div>
  );
}

export default Services;
