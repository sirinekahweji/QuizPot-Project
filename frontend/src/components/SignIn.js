import React, { useState, useContext } from 'react';
import { LangContext } from '../context/LangContext';
import { Link } from "react-router-dom";
import './SignIn.css';
import axios from 'axios';
import { useSignin } from '../Hooks/useSignIn';

const SignIn = () => {
    const { currentLangData } = useContext(LangContext); 
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resetMessage, setResetMessage] = useState('');
    const { signin, error, isLoading } = useSignin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signin(email, password);
    }

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/user/forgot-password', { email });
            setResetMessage(response.data.message);
        } catch (error) {
            if (error.response && error.response.data) {
                setResetMessage(error.response.data.message);
            } else {
                setResetMessage('Something went wrong. Please try again later.');
            }
        }
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return ( 
        <div className="SignIn">
            <h2 className="TitleSignIn">{currentLangData.signIn.titleSignIn}</h2>
            <form className="loginForm" onSubmit={handleSubmit}>
                <div className="FormField">
                    <label htmlFor="usermail" className="email">{currentLangData.signIn.emailLabel}</label>
                    <input 
                        type="email" 
                        id="usermail" 
                        name="usermail" 
                        placeholder="" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                </div>
                <div className="FormField">
                    <label htmlFor="password" className="MotPasse">{currentLangData.signIn.passwordLabel}</label>
                    <div className="PasswordContainer">
                        <input 
                            type={passwordVisible ? "text" : "password"} 
                            id="password" 
                            name="password" 
                            placeholder="" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                        <button 
                            type="button" 
                            className="PasswordToggleBtn" 
                            onClick={togglePasswordVisibility}
                        >
                            <i className={passwordVisible ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}></i>
                        </button>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                </div>
                <div className="MotDePasseOublie">
                    <p  onClick={handleForgotPassword}>
                        {currentLangData.signIn.forgotPassword}
                    </p>
                    {resetMessage && <div className="reset-message">{resetMessage}</div>}
                </div>
                <div className="Remember">
                    <input type="checkbox" id="remember" name="remember" />
                    <label htmlFor="remember" className="remember">{currentLangData.signIn.rememberMe}</label>
                </div>
                <button type="submit" className="SeConnecter" disabled={isLoading}>
                    {currentLangData.signIn.signInButton}
                </button>
            </form>
            <p className="Inscrivez">
                {currentLangData.signIn.noAccount}<br /> 
                <Link to="/signup"
                    style={{ 
                        color: "rgb(0, 161, 225)",
                        textDecoration: "none"
                    }}
                >
                    {currentLangData.signIn.signUpHere}
                </Link>
            </p>
        </div>
    );
}

export default SignIn;
