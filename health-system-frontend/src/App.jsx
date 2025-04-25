import { Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Programs from './pages/Programs';
import Clients from './pages/Clients';
import CreateProgram from './pages/CreateProgram';
import RegisterClient from './pages/RegisterClient';
import ClientProfile from './pages/ClientProfile';
import LoginPage from './pages/LoginPage'; 
import SignupPage from './pages/SignupPage'; 
import Navbar from './components/Navbar';
import AuthNavbar from './components/AuthNavbar'; 

function App() {
  const location = useLocation();
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/';

  return (
    <>
      {isAuthRoute ? <AuthNavbar /> : <Navbar />}
      <div className={isAuthRoute ? '' : 'p-4'}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/create" element={<CreateProgram />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/register" element={<RegisterClient />} />
          <Route path="/clients/:id" element={<ClientProfile />} />
          <Route path="/login" element={<LoginPage />} />  
          <Route path="/" element={<SignupPage />} />  
        </Routes>
      </div>
    </>
  );
}

export default App;
