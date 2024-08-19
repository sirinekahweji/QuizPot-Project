import './NotFound.css';
import React, { useContext, useState } from 'react';
import { LangContext } from '../context/LangContext';
import videoBg from '../assets/videos/bg1.mp4';

const NotFound = () => {


    return (
        <div className="NotFound">
            <video autoPlay loop muted className="video-background">
                <source src={videoBg} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className='notfoundText'>
                <h1>404 - Page Not Found</h1>
                <p>The page you are looking for does not exist.</p>
            </div>
        </div>
    );
};

export default NotFound;
