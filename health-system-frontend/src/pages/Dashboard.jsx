import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const clients = [
    { name: 'Jane Doe', email: 'jane@example.com', program: 'HIV' },
    { name: 'John Smith', email: 'john@example.com', program: 'TB' },
    { name: 'Mary Johnson', email: 'mary@example.com', program: 'HIV' },
    { name: 'Paul Walker', email: 'paul@example.com', program: 'TB' },
    { name: 'Emma Stone', email: 'emma@example.com', program: 'HIV' },
    { name: 'Lucas Brown', email: 'lucas@example.com', program: 'TB' }
  ];

  const programs = [
    { name: 'TB', description: 'Tuberculosis treatment and prevention' },
    { name: 'HIV', description: 'HIV testing and support' }
  ];

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.program.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-black text-white px-6 py-10 font-poppins">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-400 mb-6">Dashboard</h1>
        <p className="text-lg text-gray-300 mb-8">
       <span className="text-yellow-400 font-semibold">Health Information System</span><br />
        </p>

        
        <div className="flex items-center gap-4 bg-gray-900 p-4 rounded-xl shadow mb-10">
          <FaSearch className="text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search clients by name or program..."
            className="bg-transparent outline-none text-white w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        
        <div className="flex justify-center gap-8 mb-10">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center flex-1">
            <h2 className="text-3xl font-bold text-blue-500">{programs.length}</h2>
            <p className="text-gray-300">Programs Enrolled</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center flex-1">
            <h2 className="text-3xl font-bold text-green-400">{clients.length}</h2>
            <p className="text-gray-300">Total Clients</p>
          </div>
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client, index) => (
            <div key={index} className="bg-gray-900 p-5 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-2">{client.name}</h3>
              <p className="text-gray-400">Email: {client.email}</p>
              <p className="text-gray-400">Program: <span className="text-yellow-400 font-semibold">{client.program}</span></p>
            </div>
          ))}
          {filteredClients.length === 0 && (
            <p className="text-gray-400 text-center col-span-full">No clients match your search.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
