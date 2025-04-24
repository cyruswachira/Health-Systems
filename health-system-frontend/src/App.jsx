import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Programs from './pages/Programs';
import Clients from './pages/Clients';
import CreateProgram from './pages/CreateProgram';
import RegisterClient from './pages/RegisterClient';
import ClientProfile from './pages/ClientProfile';
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
        </Routes>
      </div>
    </>
  );
}

export default App;
