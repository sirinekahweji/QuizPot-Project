import './Home.css'; 
import Steps from '../components/steps';
import Profile from '../components/ProfileBar';
import Sources from '../components/Sources';
import Services from '../components/services';


const Home = () => {
    return (  
        <div className="homePage">
          <div>
            <Services></Services>
            <Steps></Steps>
            <Sources></Sources>
          </div>
          <div>

          </div>
            
        </div>
    );
}
 
export default Home;