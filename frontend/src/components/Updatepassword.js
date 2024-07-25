import React, { useState, useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Updatepassword.css';
import { LangContext } from '../context/LangContext';

const Updatepassword = ({ showModal, closeModal ,email}) => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordConfVisible, setPasswordConfVisible] = useState(false);
    const [newPasswordVisible, setNewPasswordVisible] = useState(false);
    const { currentLangData } = useContext(LangContext);

    const handleChangePassword = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/user/change-password', {
                oldPassword,
                newPassword,
                email
            });

            if (response.status === 200) {
                Swal.fire({
                    title: currentLangData.success,
                    text: currentLangData.passwordUpdated,
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                closeModal();
            } else {
                Swal.fire({
                    title: currentLangData.error,
                    text: currentLangData.passwordUpdateFailed,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            console.error('Error updating password:', error);
            Swal.fire({
                title: currentLangData.error,
                text: currentLangData.passwordUpdateFailed,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className={`modal fade ${showModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{currentLangData.updatePasswordTitle}</h5>
                        <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="updateFormField">
                                <label htmlFor="oldPassword" className="confirmpassword">{currentLangData.oldPassword}</label>
                                <div className="password-input-container">
                                    <input
                                        type={passwordConfVisible ? "text" : "password"}
                                        id="oldPassword"
                                        placeholder=""
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        value={oldPassword}
                                        required
                                    />
                                    <span className="toggle-password" onClick={() => setPasswordConfVisible(!passwordConfVisible)}>
                                        <i className={passwordConfVisible ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}></i>
                                    </span>
                                </div>
                            </div>
                            <div className="updateFormField">
                                <label htmlFor="newPassword" className="confirmpassword">{currentLangData.newPassword}</label>
                                <div className="password-input-container">
                                    <input
                                        type={newPasswordVisible ? "text" : "password"}
                                        id="newPassword"
                                        placeholder=""
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        value={newPassword}
                                        required
                                    />
                                    <span className="toggle-password" onClick={() => setNewPasswordVisible(!newPasswordVisible)}>
                                        <i className={newPasswordVisible ? "bi bi-eye-fill" : "bi bi-eye-slash-fill"}></i>
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="updatebtn" onClick={handleChangePassword}>{currentLangData.updatePasswordButton}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Updatepassword;
