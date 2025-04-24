import { useState, useEffect } from 'react';

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Fetch the list of registered clients from the backend
    fetch('http://localhost:5000/api/clients')  // Replace with your Flask endpoint
      .then((res) => res.json())
      .then((data) => setClients(data))
      .catch((err) => console.error('Error fetching clients:', err));
  }, []);

  return (
    <div className="min-h-screen bg-black p-8">
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
