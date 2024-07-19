import './ResetPassword.css';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { LangContext } from '../context/LangContext';
import videoBg from '../assets/videos/bg1.mp4';



const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const { currentLangData } = useContext(LangContext);


    return ( 
        <div className="ResetPassword">
            <h2 className="TitleSignIn"> Resend Password</h2>
            <video autoPlay loop muted className="video-background">
                    <source src={videoBg} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>  
            <form className="loginForm" onSubmit=''>
                <div className="ResendFormField">
                    <label htmlFor="mail" className="Resendemail">{currentLangData.signIn.emailLabel}</label><br></br>
                    <input 
                        type="email" 
                        id="mail" 
                        name="usermail" 
                        placeholder="" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
             
                </div>
                <button type="submit" className="SeConnecter" >
                    Resend 
                </button>

            </form>

        </div>
     );
}
 
export default ResetPassword;