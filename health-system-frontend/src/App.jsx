import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Programs from './pages/Programs';
import Clients from './pages/Clients';
import CreateProgram from './pages/CreateProgram';
import RegisterClient from './pages/RegisterClient';
import ClientProfile from './pages/ClientProfile';
import LoginPage from './pages/LoginPage'; 
import SignupPage from './pages/SignupPage'; 
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/create" element={<CreateProgram />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/register" element={<RegisterClient />} />
          <Route path="/clients/:id" element={<ClientProfile />} />
          <Route path="/login" element={<LoginPage />} />  
          <Route path="/signup" element={<SignupPage />} />  
        </Routes>
      </div>
    </>
  );
}

export default App;
