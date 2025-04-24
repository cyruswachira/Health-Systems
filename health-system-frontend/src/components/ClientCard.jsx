import { Link } from 'react-router-dom';
import { FaMale, FaFemale } from 'react-icons/fa';

const ClientCard = ({ client }) => (
  <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 w-full max-w-xs text-white">
    
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-gray-700 rounded-full">
        {client.gender === 'Male' ? (
          <FaMale className="text-blue-400 text-4xl" />
        ) : (
          <FaFemale className="text-pink-400 text-4xl" />
        )}
      </div>
      <div>
        <h2 className="text-xl font-bold">{client.name}</h2>
        <p className="text-sm text-gray-300">{client.email}</p>
      </div>
    </div>

    <div className="space-y-2 text-sm mb-6">
      <p><span className="font-medium text-yellow-300">Phone:</span> {client.phone}</p>
      <p><span className="font-medium text-yellow-300">Gender:</span> {client.gender}</p>
      <p>
        <span className="font-medium text-yellow-300">Programs:</span> <br />
        <span className="block text-gray-200">{client.selectedPrograms.join(', ')}</span>
      </p>
    </div>

    <div className="text-center">
      <Link
        to={`/clients/${client.id}`}
        className="inline-block px-5 py-2 text-sm bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300"
      >
        View Profile
      </Link>
    </div>
  </div>
);

export default ClientCard;
