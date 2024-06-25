import './PageGarde.css'; 
import SignIn from '../components/SignIn';
import Services from '../components/services';
import image from '../assets/imagePageGarde.png';
import React, { useContext } from 'react';
import { LangContext } from '../context/LangContext';



const PageGarde = () => {
    const { currentLangData } = useContext(LangContext); 

    return (  
        <div className="home">
            <Services></Services>
            
          <div className='pageGarde'>
            
          <div className="left-container">
                <h1 className='title'>{currentLangData.title}</h1>
                <h3 className='description'>{currentLangData.descriptionP1} <br />{currentLangData.descriptionP2} </h3>
                <img src={image} className='pagegardeimg' alt="Page Garde" />
            </div>

            <div className="signin-container">
                <SignIn />
            </div>
          </div>
          
           
        </div>
    );
}
 
export default PageGarde;
