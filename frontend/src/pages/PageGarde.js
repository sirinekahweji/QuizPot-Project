import './PageGarde.css';
import SignIn from '../components/SignIn';
import videoBg from '../assets/videos/bg1.mp4';
import React, { useContext } from 'react';
import { LangContext } from '../context/LangContext';

const PageGarde = () => {
    const { currentLangData } = useContext(LangContext); 
  

       
    return (  
        <div className="home">            
            <div className='pageGarde'>
                <video autoPlay loop muted className="background">
                    <source src={videoBg} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>                   
                <div className="left-container">
                    <h1 className='title'> {currentLangData.title}</h1>
                    <h3 className='description'>
                        <div className="wordCarousel">
                            <div>
                                <ul className={`flip${currentLangData.descriptions.length}`}>
                                    {currentLangData.descriptions.map((desc, index) => (
                                        <li key={index}>{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </h3>
                </div>
                <div className="signin-container">
                   <SignIn />
                 </div>
            </div>
        </div>
    );
}

export default PageGarde;
