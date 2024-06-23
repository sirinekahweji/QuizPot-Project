import fileIcon from '../assets/fileicon.png';
import youtubIcon from '../assets/youtubicon.png';
import imageIcon from '../assets/imageicon1.png';
import audioIcon from '../assets/audioicon.png';
import './Services.css'; 

const Services = () => {
    return ( 
        <div className='services'> 
             <div className='service'>
                <p>Question From File</p>
                <img src={fileIcon} className='serviceIcon' />
             </div>
             <div className='service' >
                <p>Question From Audio</p>
                <img src={audioIcon} className='serviceIcon' />
             </div>
             <div className='service'>
               <p>Question From Video</p>
               <img src={youtubIcon} className='serviceIcon'/>
             </div>
             
             <div className='service'>
                <p>Question From Image</p>
                <img src={imageIcon} className='serviceIcon' />
             </div>

          </div>
     );
}
 
export default Services;