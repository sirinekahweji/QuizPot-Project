import React from 'react';
import fileIcon from '../assets/fileicon.png';
import youtubIcon from '../assets/youtubicon.png';
import imageIcon from '../assets/imageicon1.png';
import audioIcon from '../assets/audioicon.png';
import './Sources.css'; 

const Sources = () => {
    return (  
     <div className="sources">
        <h3>From which source would you like to generate questions?</h3>
        <div className="source-container"> 
             <div className='source'>
                 <img src={fileIcon} className='sourceIcon' alt='fileIcon'/>
                 <p>File</p>
             </div>
             <div className='source'>
                 <img src={audioIcon} className='sourceIcon' alt='audioIcon' />
                 <p>Audio</p>
             </div>
             <div className='source'>
                 <img src={youtubIcon} className='sourceIcon' alt='youtubIcon'/>
                 <p>Youtub</p>
             </div>
             <div className='source'>
                 <img src={imageIcon} className='sourceIcon' alt='imageIcon' />
                 <p>Image</p>
             </div>
          </div>
    </div>);
}

export default Sources;
