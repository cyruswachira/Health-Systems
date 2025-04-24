import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { FaMale, FaFemale, FaTrash, FaEdit } from 'react-icons/fa';

const ClientProfile = () => {
  const { id } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [client, setClient] = useState({
    id,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+254712345678',
    gender: 'Male',
    programs: ['TB', 'HIV']
  });

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      console.log('Client deleted:', client.id);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setClient((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    console.log('Updated client:', client);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center px-6 py-8 relative">
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Edit Client</h2>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={client.name}
                onChange={handleEditChange}
                className="w-full p-2 rounded bg-gray-800 text-white"
                placeholder="Name"
              />
              <input
                type="email"
                name="email"
                value={client.email}
                onChange={handleEditChange}
                className="w-full p-2 rounded bg-gray-800 text-white"
                placeholder="Email"
              />
              <input
                type="text"
                name="phone"
                value={client.phone}
                onChange={handleEditChange}
                className="w-full p-2 rounded bg-gray-800 text-white"
                placeholder="Phone"
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

        <h1 className="text-2xl font-bold text-blue-400 text-center mb-6">Client Profile</h1>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xl font-semibold text-white">Name:</p>
            <p className="text-lg text-gray-400">{client.name}</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-white">Gender:</p>
            <p className="text-lg text-gray-400">{client.gender}</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-white">Email:</p>
            <p className="text-lg text-gray-400">{client.email}</p>
          </div>
          <div>
            <p className="text-xl font-semibold text-white">Phone:</p>
            <p className="text-lg text-gray-400">{client.phone}</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-xl font-semibold text-white">Enrolled Programs:</p>
          <ul className="list-disc list-inside text-lg text-gray-400">
            {client.programs.map((program, i) => <li key={i}>{program}</li>)}
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
