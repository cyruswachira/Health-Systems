import { Link } from 'react-router-dom';
import { FaMale, FaFemale } from 'react-icons/fa';

const ClientCard = ({ client }) => (
  <div className="bg-gray-800 border border-gray-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300">

    <div className="flex items-center space-x-6 mb-6">
      {client.gender === 'Male' ? (
        <FaMale className="text-blue-400 text-6xl" />
      ) : (
        <FaFemale className="text-pink-400 text-6xl" />
      )}
      <div>
        <h2 className="text-2xl font-bold text-white mb-1">{client.name}</h2>
        <p className="text-base text-gray-400">{client.email}</p>
      </div>
    </div>

    <div className="mt-4 mb-6">
      <p className="text-lg text-gray-300">
        <span className="font-medium text-white">Phone:</span> {client.phone}
      </p>
      <p className="text-lg text-gray-300 mt-1">
        <span className="font-medium text-white">Gender:</span> {client.gender}
      </p>
    </div>


    <div className="flex justify-center">
      <Link
        to={`/clients/${client.id}`}
        className="inline-block px-6 py-3 text-lg bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-full shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
      >
        View Profile
      </Link>
    </div>
  </div>
);

export default ClientCard;
