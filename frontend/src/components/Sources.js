import React, { useState } from 'react';
import fileIcon from '../assets/fileicon.png';
import youtubIcon from '../assets/youtubicon.png';
import imageIcon from '../assets/imageicon.png';
import audioIcon from '../assets/audioicon.png';
import './Sources.css'; 

const Sources = () => {
    const [selectedSource, setSelectedSource] = useState('video');

    const handleClick = (source) => {
        setSelectedSource(source);
    };

    return (  
     <div className="sources">
        <h3>From which source would you like to generate questions?</h3>
        <div className="source-container"> 
             <div 
                 className={`source ${selectedSource === 'file' ? 'selected-file' : ''}`} 
                 onClick={() => handleClick('file')}
             >
                 <img src={fileIcon} className='sourceIcon' alt='fileIcon'/>
                 <p>File</p>
             </div>
             <div 
                 className={`source ${selectedSource === 'video' ? 'selected-video' : ''}`} 
                 onClick={() => handleClick('video')}
             >
                 <img src={youtubIcon} className='sourceIcon' alt='youtubIcon'/>
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
    </div>);
}

export default Sources;
