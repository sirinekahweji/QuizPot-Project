import React, { useContext } from 'react';
import noImage from '../assets/noimage.png';
import './ProfileBar.css';
import { LangContext } from '../context/LangContext';
import { useAuthContext } from '../Hooks/useAuthContext';
import { useLogout } from "../Hooks/useLogout";


const ProfileBar = () => {
    const { currentLangData } = useContext(LangContext);
    const { user } = useAuthContext();
    const logout = useLogout(); 

    const handleClick = () => {
        logout();
    };

    return (
        <div className="profilebar">
            <img src={noImage} className='noimage' alt="profilePhoto" />
            <h3 className="username">{user ? user.name : "user Name"}</h3>
            <p className="useremail">{user ? user.email : "useremailt@example.com"}</p>
            <p onClick={handleClick}className='logout'><i className="bi bi-box-arrow-right"></i> {currentLangData.logout}</p>
        </div>
    );
}

export default ProfileBar;
