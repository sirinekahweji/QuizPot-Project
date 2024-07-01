import ProfileBar from '../components/ProfileBar';
import Search from '../components/SearchComponent';
import Services from '../components/services';
import './Profile.css';
import React from 'react';


const Profile = () => {
    return (
        <div className="ProfilePage">
            <Services></Services>
            <h2 className='titleQuizz'>My Quizzes</h2>
            <Search></Search>
            <ProfileBar></ProfileBar>
            <div className='myquizzes'>
    <div className='myquiz'>
        <p className='quizTitle'> <i className="bi bi-chat-square-fill"></i> solid principles</p>
        <div className='right-div'>
            <p className='nbquestions'>10 questions</p>
            <p className='favIcon'><i className="bi bi-chat-square-heart-fill"></i></p>
            <p className='deleteIcon'><i className="bi bi-trash-fill"></i></p>
            <button className='btnexport'><i className="bi bi-download"></i> Export</button>
        </div>
    </div>


                <div className='myquiz'>
                    <p className='quizTitle'> <i className="bi bi-chat-square-fill"></i>  solid princips</p>
                    <div className='right-div'>
                        <p className='nbquestions'>0 questions</p>
                        <p className='favIcon'><i class="bi bi-chat-square-heart-fill"></i></p>
                        <p className='deleteIcon'>  <i class="bi bi-trash-fill" ></i> </p>
                        <button className='btnexport'><i class="bi bi-download"></i>  Export</button>
                    </div>
                </div>
                <div className='myquiz'>
                    <p className='quizTitle'> <i className="bi bi-chat-square-fill"></i>  solid princips</p>
                    <div className='right-div'>
                        <p className='nbquestions'> 5 questions</p>
                        <p className='favIcon'><i class="bi bi-chat-square-heart-fill"></i></p>
                        <p className='deleteIcon'>  <i class="bi bi-trash-fill" ></i> </p>
                        <button className='btnexport'><i class="bi bi-download"></i>  Export</button>
                    </div>
                </div>
                <div className='myquiz'>
                    <p className='quizTitle'> <i className="bi bi-chat-square-fill"></i>  solid princips</p>
                    <div className='right-div'>
                        <p className='nbquestions'>10 questions</p>
                        <p className='favIcon'><i class="bi bi-chat-square-heart-fill"></i></p>
                        <p className='deleteIcon'>  <i class="bi bi-trash-fill" ></i> </p>
                        <button className='btnexport'><i class="bi bi-download"></i>  Export</button>
                    </div>
                </div>
                <div className='myquiz'>
                    <p className='quizTitle'> <i className="bi bi-chat-square-fill"></i>  solid princips</p>
                    <div className='right-div'>
                        <p className='nbquestions'>10 questions</p>
                        <p className='favIcon'><i class="bi bi-chat-square-heart-fill"></i></p>
                        <p className='deleteIcon'>  <i class="bi bi-trash-fill" ></i> </p>
                        <button className='btnexport'><i class="bi bi-download"></i>  Export</button>
                    </div>
                </div>
                <div className='myquiz'>
                    <p className='quizTitle'> <i className="bi bi-chat-square-fill"></i>  solid princips</p>
                    <div className='right-div'>
                        <p className='nbquestions'>10 questions</p>
                        <p className='favIcon'><i class="bi bi-chat-square-heart-fill"></i></p>
                        <p className='deleteIcon'>  <i class="bi bi-trash-fill" ></i> </p>
                        <button className='btnexport'><i class="bi bi-download"></i>  Export</button>
                    </div>
                </div>
                <div className='myquiz'>
                    <p className='quizTitle'> <i className="bi bi-chat-square-fill"></i>  solid princips</p>
                    <div className='right-div'>
                        <p className='nbquestions'>10 questions</p>
                        <p className='favIcon'><i class="bi bi-chat-square-heart-fill"></i></p>
                        <p className='deleteIcon'>  <i class="bi bi-trash-fill" ></i> </p>
                        <button className='btnexport'><i class="bi bi-download"></i>  Export</button>
                    </div>
                </div>
                <div className='myquiz'>
                    <p className='quizTitle'> <i className="bi bi-chat-square-fill"></i>  solid princips</p>
                    <div className='right-div'>
                        <p className='nbquestions'>10 questions</p>
                        <p className='favIcon'><i class="bi bi-chat-square-heart-fill"></i></p>
                        <p className='deleteIcon'>  <i class="bi bi-trash-fill" ></i> </p>
                        <button className='btnexport'><i class="bi bi-download"></i>  Export</button>
                    </div>
                </div>
            </div>
            <button className='add-quiz'><i class="bi bi-plus-lg"></i>Create Quiz Folder</button>

        </div>
    );
}

export default Profile;