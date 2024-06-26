import React, { useContext } from 'react';
import noImage from '../assets/noimage.png';
import './ProfileBar.css';
import { LangContext } from '../context/LangContext';

const ProfileBar = () => {
    const { currentLangData } = useContext(LangContext);

    return (
        <div className="profilebar">
            <img src={noImage} className='noimage' alt="profilePhoto" />
            <h3 className="username">User Name</h3>
            <p className="useremail">username@gmail.com</p>
            <p className='logout'><i className="bi bi-box-arrow-right"></i>  {currentLangData.logout}</p>
        </div>
    );
}

export default ProfileBar;
