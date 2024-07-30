import React, { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/technixbot.png';
import './NavBar.css';
import { LangContext } from '../context/LangContext';

const NavBar = () => {
    const { language, changeLanguage, currentLangData } = useContext(LangContext);
    const location = useLocation();
    const navigate = useNavigate();

    const handleLanguageChange = (lang) => {
        changeLanguage(lang);
    };

    const handleHomeClick = () => {
        navigate('/quizbot');
    };

    return (
        <nav className="navbar">
            <img src={logo} alt="QuizBot Logo" className="logo" />
            
            {location.pathname === '/dashboard' && (
                <p className="home-button" onClick={handleHomeClick}>
                    <i class="bi bi-house-fill"></i>  Home
                </p>
            )}
            
            <div className="ml-auto language">
                <span className="language-text">
                    {currentLangData.navbar[language.toLowerCase()]} <i className="bi bi-chevron-down"></i>
                </span>
                <div className="dropdown-menu">
                    <button className={`dropdown-item ${language === 'FR' ? 'selected' : ''}`} onClick={() => handleLanguageChange('FR')}>
                        {currentLangData.navbar.fr}
                    </button>
                    <button className={`dropdown-item ${language === 'EN' ? 'selected' : ''}`} onClick={() => handleLanguageChange('EN')}>
                        {currentLangData.navbar.en}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
