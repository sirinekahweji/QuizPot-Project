import './Home.css'; 
import SignIn from '../components/SignIn';
import image from '../assets/imagePageGarde.png';

const Home = () => {
    return (  
        <div className="home">
            <hr className='navbar-divider' />
            <h1 className='title'>Discover the power of AI</h1>
          <div className='partie1'>
          <div className="left-container">
                <h3 className='discription'>Transform learning into a fun adventure <br />with our Quizbot</h3>
                <img src={image} className='pagegardeimg' alt="Page Garde" />
            </div>

            <div className="signin-container">
                <SignIn />
            </div>
          </div>
           
        </div>
    );
}
 
export default Home;
