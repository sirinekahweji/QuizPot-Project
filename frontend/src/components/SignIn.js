import './SignIn.css'; 
import React, { useContext } from 'react';
import { LangContext } from '../context/LangContext';
import { Link } from "react-router-dom";


const SignIn = () => {
    const { currentLangData } = useContext(LangContext); 

    return ( 
        <div className="SignIn">
            <h2 className="TitleSignIn">{currentLangData.signIn.titleSignIn}</h2>
            <form className="loginForm">
                <div className="FormField">
                    <label htmlFor="username" className="email">{currentLangData.signIn.emailLabel}</label>
                    <input type="email" id="username" name="username" placeholder="" required />
                </div>
                <div className="FormField">
                    <label htmlFor="password" className="MotPasse">{currentLangData.signIn.passwordLabel}</label>
                    <div className="PasswordContainer">
                        <input type="password" id="password" name="password" placeholder="" required />
                        <button type="button" className="PasswordToggleBtn">
                            {/*<i class="bi bi-eye-fill"></i>*/}
                            <i class="bi bi-eye-slash-fill"></i> 
                            </button>
                    </div>
                    <div className="error-message"></div>
                </div>
                <div className="MotDePasseOublie">
                    <a href="">{currentLangData.signIn.forgotPassword}</a>
                </div>
                <div className="Remember">
                    <input type="checkbox" id="remember" name="remember" />
                    <label htmlFor="remember" className="remember">{currentLangData.signIn.rememberMe}</label>
                </div>
                <button type="submit" className="SeConnecter">{currentLangData.signIn.signInButton}</button>
            </form>
            <p className="Inscrivez">
            {currentLangData.signIn.noAccount}<br /> 
                <Link to="/signup"
               style={{ 
                color:"rgb(0, 161, 225)",
                textDecoration:"none"


            }}>{currentLangData.signIn.signUpHere}</Link>
            </p>
        </div>
    );
}
 
export default SignIn;
