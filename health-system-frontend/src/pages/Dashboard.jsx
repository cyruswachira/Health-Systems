import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState([]);
  const [programs, setPrograms] = useState([]);

  // Fetch clients and programs from the API when the component mounts
  useEffect(() => {
    // Fetch clients from API
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/clients'); // Replace with your API URL
        const data = await response.json();
        setClients(data);
      } catch (error) {
        console.error('Error fetching clients:', error);
      }
    };

    // Fetch programs from API
    const fetchPrograms = async () => {
      try {
        const response = await fetch('/api/programs'); // Replace with your API URL
        const data = await response.json();
        setPrograms(data);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    fetchClients();
    fetchPrograms();
  }, []);

  // Filtered clients based on search term
  const filteredClients = clients.filter(
    client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.program.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtered programs based on search term
  const filteredPrograms = programs.filter(program =>
    program.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-black text-white px-6 py-10 font-poppins">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-extrabold text-blue-400 mb-6">Dashboard</h1>
        <p className="text-lg text-gray-300 mb-8">
          <span className="text-yellow-400 font-semibold">Health Information System</span>
          <br />
        </p>

        {/* Search Input */}
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

        {/* Dashboard Stats */}
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

        {/* Display Clients */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <div key={client.id} className="bg-gray-900 p-5 rounded-xl shadow-lg">
              <h3 className="text-xl font-semibold text-white mb-2">{client.name}</h3>
              <p className="text-gray-400">Email: {client.email}</p>
              <p className="text-gray-400">
                Program: <span className="text-yellow-400 font-semibold">{client.program}</span>
              </p>
            </div>
          ))}
          {filteredClients.length === 0 && (
            <p className="text-gray-400 text-center col-span-full">No clients match your search.</p>
          )}
        </div>

        {/* Display Programs */}
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
