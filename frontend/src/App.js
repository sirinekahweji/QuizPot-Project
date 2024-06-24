import{BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import NavBar from './components/NavBar';
import './index.css'; 
import './'
import { LangProvider } from './context/LangContext';



function App() {
  return (
    <LangProvider>
    <div className="App">
      <BrowserRouter>
      <NavBar></NavBar>
         <Routes>
            <Route path="/" element={<Home/>} />
         </Routes>
      </BrowserRouter>
      
    </div>
    </LangProvider>
  );
}

export default App;
