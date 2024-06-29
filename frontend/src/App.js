import{BrowserRouter,Routes,Route} from 'react-router-dom'
import PageGarde from './pages/PageGarde';
import Home from './pages/Home';
import Profile from './pages/Profile';
import NavBar from './components/NavBar';
import './index.css'; 
import './'
import { LangProvider } from './context/LangContext';
import SignUp from './pages/SignUp';



function App() {
  return (
    <LangProvider>
    <div className="App">
      <BrowserRouter>
      <NavBar></NavBar>
         <Routes>
            <Route path="/" element={<PageGarde/>} />
            <Route path="/signup" element={<SignUp/>} />
            <Route path="/quizbot" element={<Home/>} />
            <Route path="/profile" element={<Profile/>} />
         </Routes>
      </BrowserRouter>
      
    </div>
    </LangProvider>
  );
}

export default App;
