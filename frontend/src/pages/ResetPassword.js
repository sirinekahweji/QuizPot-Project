import './ResetPassword.css';
import React, { useContext, useState } from 'react';
import { LangContext } from '../context/LangContext';
import videoBg from '../assets/videos/bg1.mp4';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import UpdatePasswordModal from '../components/Updatepassword';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const { currentLangData } = useContext(LangContext);
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEmail('')
    };

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
                    openModal();  
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
                <h2 className="TitleReset">{currentLangData.resendPassword.title}</h2>
                <form onSubmit={handleForgotPassword}>
                    <div className="ResendFormField">
                        <label htmlFor="mail" className="Resendemail">{currentLangData.resendPassword.emailLabel}</label><br />
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
                        {currentLangData.resendPassword.button}
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
            <UpdatePasswordModal showModal={showModal} closeModal={closeModal} email={email }/>

        </div>
    );
};

export default ResetPassword;
