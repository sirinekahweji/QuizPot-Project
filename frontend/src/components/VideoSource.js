import React, { useContext } from 'react';
import './VideoSource.css';
import { LangContext } from '../context/LangContext';

const VideoSource = () => {
    const { currentLangData } = useContext(LangContext);

    return (
        <div className="videoSource">
            <h5>{currentLangData.videoSource.title}</h5>
            <input placeholder={currentLangData.videoSource.placeholder} className="videoSource-container" />
        </div>
    );
}

export default VideoSource;
