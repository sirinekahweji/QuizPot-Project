import noImage from '../assets/noimage.png';
import './ProfileBar.css'; 


const ProfileBar = () => {
    return ( <div className="profilebar">
        <img src={noImage}  className='noimage' alt="profilePhoto"/>
        <h3 className="username">User Name</h3>
        <p className="useremail">username@gmail.com</p>
        <p className='logout'><i class="bi bi-box-arrow-right"></i>Log Out</p>

    </div> );
}
 
export default ProfileBar;