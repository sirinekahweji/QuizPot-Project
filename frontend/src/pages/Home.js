import './Home.css'; 
import SignIn from '../components/SignIn';
import Services from '../components/services';
import image from '../assets/imagePageGarde.png';



const Home = () => {
    return (  
        <div className="home">
            <Services></Services>
            
          <div className='pageGarde'>
            
          <div className="left-container">
                <h1 className='title'>Discover the power of AI</h1>
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
