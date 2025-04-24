import { useParams, Link } from 'react-router-dom';
import { FaMale, FaFemale } from 'react-icons/fa'; // Import gender icons

const ClientProfile = () => {
  const { id } = useParams();

  // Example client data (you would typically fetch this from an API)
  const client = {
    id,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+254712345678',
    gender: 'Male', // Add gender information
    programs: ['TB', 'HIV']
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center px-6 py-8">
      <div className="bg-gray-800 p-6 rounded-xl shadow-xl max-w-lg w-full">
        {/* Gender Icon instead of Profile Image */}
        <div className="flex justify-center mb-6">
          {client.gender === 'Male' ? (
            <FaMale className="text-blue-400 text-6xl" />
          ) : (
            <FaFemale className="text-pink-400 text-6xl" />
          )}
        </div>

        <h1 className="text-2xl font-bold text-blue-400 text-center mb-6">Client Profile</h1>

        {/* Horizontal Layout for Client Details */}
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

        {/* Enrolled Programs */}
        <div className="mb-6">
          <p className="text-xl font-semibold text-white">Enrolled Programs:</p>
          <ul className="list-disc list-inside text-lg text-gray-400">
            {client.programs.map((program, i) => <li key={i}>{program}</li>)}
          </ul>
        </div>

        {/* Close Button - Links back to the Clients page */}
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
