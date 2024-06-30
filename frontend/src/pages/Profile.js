import ProfileBar from '../components/ProfileBar';
import Search from '../components/SearchComponent';
import image from '../assets/signup.png';
import './Profile.css';
import React from 'react';


const Profile = () => {
    return ( 
        <div className="ProfilePage">
             <h2 className='titleQuizz'>My Quizzes</h2>
            <Search></Search>
            <ProfileBar></ProfileBar>
           {/*
        
           
           <div className='myquizz'>
            </div>
           <img src={image} alt="Signup" className="signup-img" />*/}

        </div>
     );
}
 
export default Profile;