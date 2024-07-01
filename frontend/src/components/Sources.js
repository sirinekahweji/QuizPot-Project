import React, { useState, useContext } from 'react';
import fileIcon from '../assets/fileicon.png';
import youtubIcon from '../assets/youtubicon.png';
import imageIcon from '../assets/imageicon.png';
import audioIcon from '../assets/audioicon.png';
import './Sources.css';
import VideoSource from './VideoSource';
import FileSource from './FileSource';
import AudioSource from './AudioSource';
import ImageSource from './ImageSource';
import { LangContext } from '../context/LangContext';

const Sources = ({ onContinue }) => {
    const [selectedSource, setSelectedSource] = useState('video');
    const { currentLangData } = useContext(LangContext);

    const handleClick = (source) => {
        setSelectedSource(source);
    };

    const handleContinue = () => {
        onContinue();
    };

    const renderSelectedSource = () => {
        switch (selectedSource) {
            case 'file':
                return <FileSource />;
            case 'video':
                return <VideoSource />;
            case 'audio':
                return <AudioSource />;
            case 'image':
                return <ImageSource />;
            default:
                return null;
        }
    };

    return (
        <div className="sources">
            <h3>{currentLangData.sources.title}</h3>
            <div className="source-container">
                <div
                    className={`source ${selectedSource === 'file' ? 'selected-file' : ''}`}
                    onClick={() => handleClick('file')}
                >
                    <img src={fileIcon} className='sourceIcon' alt='fileIcon' />
                    <p>{currentLangData.sources.file}</p>
                </div>
                <div
                    className={`source ${selectedSource === 'video' ? 'selected-video' : ''}`}
                    onClick={() => handleClick('video')}
                >
                    <img src={youtubIcon} className='sourceIcon' alt='youtubIcon' />
                    <p>{currentLangData.sources.video}</p>
                </div>
                <div
                    className={`source ${selectedSource === 'audio' ? 'selected-audio' : ''}`}
                    onClick={() => handleClick('audio')}
                >
                    <img src={audioIcon} className='sourceIcon' alt='audioIcon' />
                    <p>{currentLangData.sources.audio}</p>
                </div>
                <div
                    className={`source ${selectedSource === 'image' ? 'selected-image' : ''}`}
                    onClick={() => handleClick('image')}
                >
                    <img src={imageIcon} className='sourceIcon' alt='imageIcon' />
                    <p>{currentLangData.sources.image}</p>
                </div>
            </div>
            {renderSelectedSource()}
            <button className='continuer' onClick={handleContinue}>
                {currentLangData.sources.continue}
            </button>
        </div>
    );
}

export default Sources;
