import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { LangContext } from '../context/LangContext';
import './SignUp.css';
import image from '../assets/signup.png';
import { useSignup } from '../Hooks/useSignUp';

const SignUp = () => {
    const { currentLangData } = useContext(LangContext);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConf, setPasswordConf] = useState('');
    const { signup, error, isLoading } = useSignup();
    const [passwordVisible, setPasswordVisible] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== passwordConf) {
            alert("Passwords do not match");
            return;
        }
        await signup(name, email, password);
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="signup">
            <h1 className='titlesignup'>{currentLangData.signUpPage.title}</h1>
            <div className="contentsignup">
                <form onSubmit={handleSubmit}>
                    <div className="FormSignUp">
                        <label htmlFor="fullname" className="confirmpassword">{currentLangData.signUpPage.fullNameLabel}</label>
                        <input type="text" id="fullname" placeholder="" onChange={(e) => setName(e.target.value)} value={name} required />
                    </div>
                    <div className="FormSignUp">
                        <label htmlFor="email" className="emailuser">{currentLangData.signUpPage.emailLabel}</label>
                        <input type="email" id="email" placeholder="" onChange={(e) => setEmail(e.target.value)} value={email} required />
                    </div>
                    <div className="FormSignUp">
                        <label htmlFor="passworduser" className="passworduser">{currentLangData.signUpPage.passwordLabel}</label>
                        <div className="PasswordContainer">
                            <input 
                                type={passwordVisible ? "text" : "password"} 
                                id="passworduser" 
                                placeholder="" 
                                onChange={(e) => setPassword(e.target.value)} 
                                value={password} 
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
                    </div>
                    <div className="FormSignUp">
                        <label htmlFor="passwordconfirm" className="confirmpassword">{currentLangData.signUpPage.confirmPasswordLabel}</label>
                        <input type="password" id="passwordconfirm" placeholder="" onChange={(e) => setPasswordConf(e.target.value)} value={passwordConf} required />
                    </div>
                    <button disabled={isLoading} className='btn-signup'>{currentLangData.signUpPage.signUpButton}</button>
                    {error && <div className="error">{error}</div>}
                </form>
                <img src={image} alt="Signup" className="signup-img" />
            </div>
            <div className='footer'>
                <Link to="/" style={{
                    backgroundColor: "white",
                    color: "#f34079",
                    fontWeight: "bold",
                    marginTop: "40px",
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
