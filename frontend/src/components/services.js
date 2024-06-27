import fileIcon from '../assets/fileicon.png';
import youtubIcon from '../assets/youtubicon.png';
import imageIcon from '../assets/imageicon1.png';
import audioIcon from '../assets/audioicon.png';
import noImage from '../assets/noimage.png';

import React, { useContext } from 'react';
import './Services.css'; 
import { LangContext } from '../context/LangContext'; 

const Services = () => {
   const { currentLangData } = useContext(LangContext); 

    return ( 
        <div className='services'> 
             <div className='service'>
             <p>{currentLangData.services.questionFile}</p>
             <img src={fileIcon} className='serviceIcon' alt='fileIcon'/>
             </div>
             <div className='service' >
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
             <img src={noImage} className='profileIcon' alt="profilePhoto"/>
        </div>
    );
}

export default Services;
