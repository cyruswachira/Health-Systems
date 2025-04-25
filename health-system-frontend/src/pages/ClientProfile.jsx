import { useState, useEffect } from 'react';
import { FaMale, FaFemale, FaTrash, FaEdit } from 'react-icons/fa';
import { Link, useParams, useNavigate } from 'react-router-dom';

const ClientProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [client, setClient] = useState({
    id,
    name: '',
    email: '',
    phone: '',
    gender: '',
    selectedPrograms: [],
  });
  const [programs, setPrograms] = useState([]);
  const [programMap, setProgramMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await fetch(`https://health-info-systems.onrender.com/api/clients/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch client details');
        }
        const data = await response.json();
        setClient(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching client details:', error);
        setLoading(false);
      }
    };

    const fetchPrograms = async () => {
      try {
        const response = await fetch('https://health-info-systems.onrender.com/api/programs');
        if (!response.ok) {
          throw new Error('Failed to fetch programs');
        }
        const data = await response.json();
        setPrograms(data);

        const map = {};
        data.forEach((program) => {
          map[program.id.toString()] = program.name;
        });
        setProgramMap(map);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    fetchClientData();
    fetchPrograms();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to remove this client from the system?')) {
      try {
        const response = await fetch(`https://health-info-systems.onrender.com/api/clients/${client.id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Error deleting client');
        }
        console.log('Client successfully removed');
        navigate('/clients');
      } catch (error) {
        console.error('Error removing client:', error);
      }
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setClient((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`https://health-info-systems.onrender.com/api/clients/${client.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(client),
      });
      if (!response.ok) {
        throw new Error('Error updating client data');
      }
      const updatedClient = await response.json();
      console.log('Client data updated:', updatedClient);
      setClient(updatedClient);
      setIsEditing(false);
      navigate('/clients');
    } catch (error) {
      console.error('Error updating client data:', error);
    }
  };

  const getProgramNames = (programIds) => {
    if (!programIds || !Array.isArray(programIds)) return [];
    return programIds
      .map((id) => programMap[id.toString()])
      .filter(Boolean);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex justify-center items-center">
        <p className="text-xl text-gray-300">Fetching client profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center px-6 py-8 relative">
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Update Client Information</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={client.name}
                onChange={handleEditChange}
                className="w-full p-2 rounded bg-gray-800 text-white"
                placeholder="Full Name"
              />
              <input
                type="email"
                name="email"
                value={client.email}
                onChange={handleEditChange}
                className="w-full p-2 rounded bg-gray-800 text-white"
                placeholder="Email Address"
              />
              <input
                type="text"
                name="phone"
                value={client.phone}
                onChange={handleEditChange}
                className="w-full p-2 rounded bg-gray-800 text-white"
                placeholder="Phone Number"
              />
              <select
                name="gender"
                value={client.gender}
                onChange={handleEditChange}
                className="w-full p-2 rounded bg-gray-800 text-white"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-500"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="bg-gray-800 p-6 rounded-xl shadow-xl max-w-lg w-full relative">
        <div className="absolute top-4 right-4 flex space-x-3">
          <button onClick={() => setIsEditing(true)} title="Edit">
            <FaEdit className="text-blue-400 text-xl hover:text-blue-300" />
          </button>
          <button onClick={handleDelete} title="Delete">
            <FaTrash className="text-red-500 text-xl hover:text-red-400" />
          </button>
        </div>

        <div className="flex justify-center mb-6 mt-2">
          {client.gender === 'Male' ? (
            <FaMale className="text-blue-400 text-6xl" />
          ) : (
            <FaFemale className="text-pink-400 text-6xl" />
          )}
        </div>

        <h1 className="text-3xl font-semibold text-blue-400 text-center mb-6">Client Profile</h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xl font-semibold text-white">Full Name:</p>
            <p className="text-lg text-gray-400">{client.name}</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-white">Gender:</p>
            <p className="text-lg text-gray-400">{client.gender}</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-white">Email Address:</p>
            <p className="text-lg text-gray-400">{client.email}</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-white">Phone Number:</p>
            <p className="text-lg text-gray-400">{client.phone}</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-xl font-semibold text-white">Programs Enrolled:</p>
          <ul className="list-disc list-inside text-lg text-gray-400">
            {getProgramNames(client.selectedPrograms).length > 0 ? (
              getProgramNames(client.selectedPrograms).map((program, i) => <li key={i}>{program}</li>)
            ) : (
              <li>No programs enrolled</li>
            )}
          </ul>
        </div>

        <div className="flex justify-center mt-6">
          <Link
            to="/clients"
            className="inline-block px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-center"
          >
            Close
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
