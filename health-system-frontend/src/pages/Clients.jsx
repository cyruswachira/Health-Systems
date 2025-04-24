import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Clients = () => {
  const [clients, setClients] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetch('http://localhost:5000/api/clients')  
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch((err) => console.error('Error fetching clients:', err));
  }, []);

  return (
    <div className="min-h-screen bg-black p-8 relative">
      
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={() => navigate('/clients/register')}  
          className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-6 py-2 rounded-xl shadow-lg transition-all duration-300"
        >
          + Register Client
        </button>
      </div>

      <h2 className="text-3xl font-bold text-white text-center mb-6">Registered Clients</h2>

      <div className="flex flex-wrap justify-center gap-6">
        {clients.length === 0 ? (
          <p className="text-white">No clients registered yet.</p>
        ) : (
          clients.map((client) => (
            <div key={client.id} className="bg-gray-800 text-white p-6 rounded-xl shadow-md w-60">
              <h3 className="text-xl font-semibold">{client.name}</h3>
              <p>Email: {client.email}</p>
              <p>Phone: {client.phone}</p>
              <p>Gender: {client.gender}</p>
              <p>Programs: {client.selectedPrograms.join(', ')}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Clients;
