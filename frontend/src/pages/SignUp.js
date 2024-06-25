import { Link } from "react-router-dom";
import React, { useContext } from 'react';
import { LangContext } from '../context/LangContext';

import './SignUp.css'; 
import image from '../assets/signup.png';

const SignUp = () => {
    const { currentLangData } = useContext(LangContext); 

    return (
     <div className="signup">
        <h1 className='titlesignup'>{currentLangData.signUpPage.title}</h1>
        <div className="contentsignup">
            <form>
            <div className="FormSignUp">
                    <label htmlFor="fullname" className="confirmpassword">{currentLangData.signUpPage.fullNameLabel}</label>
                    <input type="text" id="fullname" placeholder="" required />
                </div>
                <div className="FormSignUp">
                    <label htmlFor="email" className="emailuser"> {currentLangData.signUpPage.emailLabel}</label>
                    <input type="email" id="email"  placeholder="" required />
                </div>
                <div className="FormSignUp">
                    <label htmlFor="passworduser" className="passworduser"> {currentLangData.signUpPage.passwordLabel}</label>
                    <input type="password" id="passworduser" placeholder="" required />
                </div>
                <div className="FormSignUp">
                    <label htmlFor="passwordconfirm" className="confirmpassword">{currentLangData.signUpPage.confirmPasswordLabel}</label>
                    <input type="password" id="passwordconfirm" placeholder="" required />
                </div>
                <button className='btn-signup'>{currentLangData.signUpPage.signUpButton} </button>
            </form>
            <img src={image} alt="Signup" className="signup-img" />
        </div>
        <div className='footer'>
            <Link to="/"
               style={{ 
                backgroundColor: "white",
                color: "rgb(228, 64, 139)",
                fontWeight: "bold",
                marginTop: "25px",
                cursor: "pointer",
                fontFamily: "Cooper",
                paddingLeft: "3%",
                textDecoration: "none"
            }}>{currentLangData.signUpPage.signInLink}</Link>

        </div>
    </div>
    );
}

export default SignUp;
