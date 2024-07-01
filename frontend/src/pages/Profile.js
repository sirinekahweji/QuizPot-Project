import React, { useContext } from 'react';
import { LangContext } from '../context/LangContext';
import ProfileBar from '../components/ProfileBar';
import Search from '../components/SearchComponent';
import Services from '../components/services';
import './Profile.css';

const Profile = () => {
    const { currentLangData } = useContext(LangContext);

    return (
        <div className="ProfilePage">
            <Services />
            <h2 className='titleQuizz'>{currentLangData.profile.myQuizzesTitle}</h2>
            <Search />
            <ProfileBar />

            <div className='myquizzes'>
                <div className='myquiz'>
                    <p className='quizTitle'> <i className="bi bi-chat-square-fill"></i> Solid Principles</p>
                    <div className='right-div'>
                        <p className='nbquestions'>10 questions</p>
                        <p className='favIcon'><i className="bi bi-chat-square-heart-fill"></i></p>
                        <p className='deleteIcon'><i className="bi bi-trash-fill"></i></p>
                        <button className='btnexport'><i className="bi bi-download"></i> {currentLangData.profile.exportButton}</button>
                    </div>
                </div>
                <div className='myquiz'>
                    <p className='quizTitle'> <i className="bi bi-chat-square-fill"></i> Solid Principles</p>
                    <div className='right-div'>
                        <p className='nbquestions'>10 questions</p>
                        <p className='favIcon'><i className="bi bi-chat-square-heart-fill"></i></p>
                        <p className='deleteIcon'><i className="bi bi-trash-fill"></i></p>
                        <button className='btnexport'><i className="bi bi-download"></i> {currentLangData.profile.exportButton}</button>
                    </div>
                </div>
                <div className='myquiz'>
                    <p className='quizTitle'> <i className="bi bi-chat-square-fill"></i> Solid Principles</p>
                    <div className='right-div'>
                        <p className='nbquestions'>10 questions</p>
                        <p className='favIcon'><i className="bi bi-chat-square-heart-fill"></i></p>
                        <p className='deleteIcon'><i className="bi bi-trash-fill"></i></p>
                        <button className='btnexport'><i className="bi bi-download"></i> {currentLangData.profile.exportButton}</button>
                    </div>
                </div>
                <div className='myquiz'>
                    <p className='quizTitle'> <i className="bi bi-chat-square-fill"></i> Solid Principles</p>
                    <div className='right-div'>
                        <p className='nbquestions'>10 questions</p>
                        <p className='favIcon'><i className="bi bi-chat-square-heart-fill"></i></p>
                        <p className='deleteIcon'><i className="bi bi-trash-fill"></i></p>
                        <button className='btnexport'><i className="bi bi-download"></i> {currentLangData.profile.exportButton}</button>
                    </div>
                </div>
                <div className='myquiz'>
                    <p className='quizTitle'> <i className="bi bi-chat-square-fill"></i> Solid Principles</p>
                    <div className='right-div'>
                        <p className='nbquestions'>10 questions</p>
                        <p className='favIcon'><i className="bi bi-chat-square-heart-fill"></i></p>
                        <p className='deleteIcon'><i className="bi bi-trash-fill"></i></p>
                        <button className='btnexport'><i className="bi bi-download"></i> {currentLangData.profile.exportButton}</button>
                    </div>
                </div>
                <div className='myquiz'>
                    <p className='quizTitle'> <i className="bi bi-chat-square-fill"></i> Solid Principles</p>
                    <div className='right-div'>
                        <p className='nbquestions'>10 questions</p>
                        <p className='favIcon'><i className="bi bi-chat-square-heart-fill"></i></p>
                        <p className='deleteIcon'><i className="bi bi-trash-fill"></i></p>
                        <button className='btnexport'><i className="bi bi-download"></i> {currentLangData.profile.exportButton}</button>
                    </div>
                </div>
                <div className='myquiz'>
                    <p className='quizTitle'> <i className="bi bi-chat-square-fill"></i> Solid Principles</p>
                    <div className='right-div'>
                        <p className='nbquestions'>10 questions</p>
                        <p className='favIcon'><i className="bi bi-chat-square-heart-fill"></i></p>
                        <p className='deleteIcon'><i className="bi bi-trash-fill"></i></p>
                        <button className='btnexport'><i className="bi bi-download"></i> {currentLangData.profile.exportButton}</button>
                    </div>
                </div>
                <div className='myquiz'>
                    <p className='quizTitle'> <i className="bi bi-chat-square-fill"></i> Solid Principles</p>
                    <div className='right-div'>
                        <p className='nbquestions'>10 questions</p>
                        <p className='favIcon'><i className="bi bi-chat-square-heart-fill"></i></p>
                        <p className='deleteIcon'><i className="bi bi-trash-fill"></i></p>
                        <button className='btnexport'><i className="bi bi-download"></i> {currentLangData.profile.exportButton}</button>
                    </div>
                </div>
            </div>
            <button className='add-quiz'><i className="bi bi-plus-lg"></i> {currentLangData.profile.createQuizFolder}</button>

        </div>
    );
}

export default Profile;
