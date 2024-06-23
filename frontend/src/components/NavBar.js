import React, { useState } from 'react';
import logo from '../assets/logo.png';
import './NavBar.css';

const NavBar = () => {
    const [language, setLanguage] = useState('EN');
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        setShowDropdown(false);
    };

    const handleDropdownDisplay = () => {
        setShowDropdown(true);
    };

    const handleDropdownHide = () => {
        setShowDropdown(false);
    };

    return (
        <nav className="navbar">
            <img src={logo} alt="QuizBot Logo" className="logo" />
            <div className="ml-auto language"
                onMouseEnter={handleDropdownDisplay}
                onMouseLeave={handleDropdownHide}
            >
                <span className={`language-text ${showDropdown ? 'hovered' : ''}`} onClick={() => setShowDropdown(!showDropdown)}>
                    {language} <i className="dropdown-toggle"></i>
                </span>
                {showDropdown && (
                    <div className="dropdown-menu">
                        <button className={`dropdown-item ${language === 'FR' ? 'selected' : ''}`} onClick={() => handleLanguageChange('FR')}><b>FR</b></button>
                        <button className={`dropdown-item ${language === 'EN' ? 'selected' : ''}`} onClick={() => handleLanguageChange('EN')}><b>EN</b></button>
                    </div>
                )}
              
            </div>
        </nav>
    );
}

export default NavBar;
