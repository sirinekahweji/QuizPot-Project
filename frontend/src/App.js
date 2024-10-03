import{BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import PageGarde from './pages/PageGarde';
import Home from './pages/Home';
import NotFound from './pages/NotFound'; 
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import NavBar from './components/NavBar';
import './index.css'; 
import './'
import { LangProvider } from './context/LangContext';
import { FormDataProvider } from './context/FormDataContext';
import { QuestionsProvider } from './context/QuestionsContext';
import SignUp from './pages/SignUp';
import { useAuthContext } from "./Hooks/useAuthContext";





function App() {
  const {user} = useAuthContext()

  return (
    <LangProvider>
      <QuestionsProvider>
        <FormDataProvider>
    <div className="App">
      <BrowserRouter>
      <NavBar></NavBar>
         <Routes>
            <Route path="/" element={!user ? <PageGarde/>:<Navigate to='/quizbot'/>  } />
            <Route path="/signup" element={!user ? <SignUp/> : <Navigate to='/quizbot'/> } />
            <Route path="/quizbot" element={user ? <Home/> :<Navigate to='/'/> } />
            <Route path="/dashboard" element={user && user.role === 'admin' ? <Dashboard /> : <Navigate to='/quizbot' />} />
            <Route path="/ResetPassword" element={!user ? <ResetPassword/> :<Navigate to='/quizbot'/> } />
            <Route path="*" element={<NotFound />} /> 


         </Routes>
      </BrowserRouter>
      
    </div>
    </FormDataProvider>
    </QuestionsProvider>
    </LangProvider>
  );
}

export default App;
