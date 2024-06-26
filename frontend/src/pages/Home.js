import './Home.css'; 
import Steps from '../components/steps';
import Profile from '../components/ProfileBar';
import Sources from '../components/Sources';

const Home = () => {
    return (  
        <div className="homePage">
          <div>
            <Steps></Steps>
            <Profile></Profile>
            <Sources></Sources>
          </div>
          <div>

          </div>
            
        </div>
    );
}
 
export default Home;