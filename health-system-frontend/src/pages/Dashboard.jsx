import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [programMap, setProgramMap] = useState({});

  
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('https://health-info-systems.onrender.com/api/clients');
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    const fetchPrograms = async () => {
      try {
        const response = await fetch('https://health-info-systems.onrender.com/api/programs');
        const data = await response.json();
        setPrograms(data);

      
        const map = {};
        data.forEach((program) => {
          map[program.id] = program.name;
        });
        setProgramMap(map);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    fetchClients();
    fetchPrograms();
  }, []);

  const getProgramNames = (programIds) => {
    if (!Array.isArray(programIds)) return [];
    return programIds.map((id) => programMap[id]).filter(Boolean);
  };

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getProgramNames(client.selectedPrograms).join(', ').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPrograms = programs.filter((program) =>
    program.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-black text-white px-6 py-10 font-poppins">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-400 mb-6">Dashboard</h1>
        <p className="text-lg text-gray-300 mb-8">
          <span className="text-yellow-400 font-semibold">Health Information System</span>
        </p>

      
        <div className="flex items-center gap-4 bg-gray-900 p-4 rounded-xl shadow mb-10">
          <FaSearch className="text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search clients or programs..."
            className="bg-transparent outline-none text-white w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        
        <div className="flex justify-center gap-8 mb-10">
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center flex-1">
            <h2 className="text-3xl font-bold text-blue-500">{programs.length}</h2>
            <p className="text-gray-300">Programs Available</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center flex-1">
            <h2 className="text-3xl font-bold text-green-400">{clients.length}</h2>
            <p className="text-gray-300">Total Clients</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <div key={client.id} className="bg-gray-900 p-5 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-2">{client.name}</h3>
              <p className="text-gray-400">Email: {client.email}</p>
              <p className="text-gray-400">Phone: {client.phone}</p>
              <p className="text-gray-400">Gender: {client.gender}</p>
              <p className="text-gray-400">
                Programs:{' '}
                {getProgramNames(client.selectedPrograms).length > 0 ? (
                  <span className="text-yellow-400 font-semibold">
                    {getProgramNames(client.selectedPrograms).join(', ')}
                  </span>
                ) : (
                  <span className="text-gray-500 italic">None</span>
                )}
              </p>
            </div>
          ))}
          {filteredClients.length === 0 && (
            <p className="text-gray-400 text-center col-span-full">No clients match your search.</p>
          )}
        </div>

      
        <div className="mt-10">
          <h2 className="text-3xl font-semibold text-blue-400 mb-4">Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <div key={program.id} className="bg-gray-900 p-5 rounded-xl shadow-lg">
                <h3 className="text-xl font-semibold text-white mb-2">{program.name}</h3>
                <p className="text-gray-400">{program.description}</p>
              </div>
            ))}
            {filteredPrograms.length === 0 && (
              <p className="text-gray-400 text-center col-span-full">No programs match your search.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
