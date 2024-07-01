import React, { useContext } from 'react';
import logo from '../assets/logo.png';
import './NavBar.css';
import { LangContext } from '../context/LangContext';
import { Link  , useLocation} from 'react-router-dom';


const NavBar = () => {
    const { language, changeLanguage, currentLangData } = useContext(LangContext);
    const location = useLocation();


    const handleLanguageChange = (lang) => {
        changeLanguage(lang);
    };

    return (
        <nav className="navbar">
            <img src={logo} alt="QuizBot Logo" className="logo" />
            {(location.pathname !== '/' && location.pathname !== '/signup' && location.pathname!=='/quizbot') && (
            <Link to='/quizbot'style={{ textDecoration: "none" , color: "#f34079" , fontWeight:"bold" , marginLeft:"70%",marginTop:"10px"}}><i class="bi bi-house-heart-fill"></i>  Home</Link>
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
}

export default NavBar;
