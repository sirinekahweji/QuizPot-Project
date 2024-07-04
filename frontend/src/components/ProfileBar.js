import React, { useContext } from 'react';
import noImage from '../assets/noimage.png';
import './ProfileBar.css';
import { LangContext } from '../context/LangContext';
import { useAuthContext } from "../Hooks/useAuthContext";


const ProfileBar = () => {
    const { currentLangData } = useContext(LangContext);
    const {user}= useAuthContext()


    return (
        <div className="profilebar">
            <img src={noImage} className='noimage' alt="profilePhoto" />
            <h3 className="username">{user.name}</h3>
            <p className="useremail">{user.email}</p>
            <p className='logout'><i className="bi bi-box-arrow-right"></i>  {currentLangData.logout}</p>
        </div>
    );
}

export default ProfileBar;
