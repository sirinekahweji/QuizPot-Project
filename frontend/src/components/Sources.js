import React, { useState } from 'react';
import fileIcon from '../assets/fileicon.png';
import youtubIcon from '../assets/youtubicon.png';
import imageIcon from '../assets/imageicon.png';
import audioIcon from '../assets/audioicon.png';
import './Sources.css';
import VideoSource from './VideoSource';
import FileSource from './FileSource';
import AudioSource from './AudioSource';
import ImageSource from './ImageSource';

const Sources = ({ onContinue }) => { // Recevez la fonction onContinue comme une prop
    const [selectedSource, setSelectedSource] = useState('video');

    const handleClick = (source) => {
        setSelectedSource(source);
    };

    const handleContinue = () => {
        onContinue(); // Appel à la fonction onContinue pour changer d'état dans Home.js
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
            <h3>From which source would you like to generate questions?</h3>
            <div className="source-container">
                <div
                    className={`source ${selectedSource === 'file' ? 'selected-file' : ''}`}
                    onClick={() => handleClick('file')}
                >
                    <img src={fileIcon} className='sourceIcon' alt='fileIcon' />
                    <p>File</p>
                </div>
                <div
                    className={`source ${selectedSource === 'video' ? 'selected-video' : ''}`}
                    onClick={() => handleClick('video')}
                >
                    <img src={youtubIcon} className='sourceIcon' alt='youtubIcon' />
                    <p>Video</p>
                </div>
                <div
                    className={`source ${selectedSource === 'audio' ? 'selected-audio' : ''}`}
                    onClick={() => handleClick('audio')}
                >
                    <img src={audioIcon} className='sourceIcon' alt='audioIcon' />
                    <p>Audio</p>
                </div>
                <div
                    className={`source ${selectedSource === 'image' ? 'selected-image' : ''}`}
                    onClick={() => handleClick('image')}
                >
                    <img src={imageIcon} className='sourceIcon' alt='imageIcon' />
                    <p>Image</p>
                </div>
            </div>
            {renderSelectedSource()}
            <button className='continuer' onClick={handleContinue}>Continuer</button> {/* Appel à la fonction onContinue */}
        </div>
    );
}

export default Sources;
