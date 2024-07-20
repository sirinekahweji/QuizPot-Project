import './ResetPassword.css';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LangContext } from '../context/LangContext';
import videoBg from '../assets/videos/bg1.mp4';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const { currentLangData } = useContext(LangContext);
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/user/forgot-password', { email });
            if (response.status === 200) {
                Swal.fire({
                    title: 'Succès',
                    text: 'Un nouveau mot de passe a été envoyé à votre email.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then(() => {
                    navigate('/');
                });
            } else {
                Swal.fire({
                    title: 'Erreur',
                    text: 'Une erreur s\'est produite. Veuillez réessayer.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (err) {
            Swal.fire({
                title: 'Erreur',
                text: 'Une erreur s\'est produite. Veuillez réessayer.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="ResetPassword">
            <video autoPlay loop muted className="video-background">
                <source src={videoBg} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="ResetForm">
                <h2 className="TitleReset">Resend Password</h2>
                <form onSubmit={handleForgotPassword}>
                    <div className="ResendFormField">
                        <label htmlFor="mail" className="Resendemail">{currentLangData.signIn.emailLabel}</label><br />
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
                    <button type="submit" className="SeConnecter">
                        Resend
                    </button>
                </form>
            </div>
            <div className='footerReset'>
                <Link to="/" style={{
                    backgroundColor: "white",
                    color: "rgb(236, 155, 5)",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontFamily: "Cooper",
                    textDecoration: "none"
                }}>{currentLangData.signUpPage.signInLink}</Link>
            </div>
        </div>
    );
};

export default ResetPassword;
