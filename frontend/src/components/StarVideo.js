import React from 'react';
import './StarVideo.css'; 
import video from '../assets/videos/stars.mp4';


const StarVideo = () => {
    return (
        <div className="video-container">
            <video autoPlay loop muted className="star-video">
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
};

export default StarVideo;
