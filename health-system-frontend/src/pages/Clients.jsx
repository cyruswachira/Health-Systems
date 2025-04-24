import { Link } from 'react-router-dom';
import { FaMale, FaFemale } from 'react-icons/fa'; // Import gender icons
import ClientCard from '../components/ClientCard';

const Clients = () => {
  const clients = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+254712345678',
      age: 30,
      gender: 'Male', // Gender info
      image: 'https://via.placeholder.com/150', // Placeholder image URL
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+254798765432',
      age: 28,
      gender: 'Female', // Gender info
      image: 'https://via.placeholder.com/150', // Placeholder image URL
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white px-6 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-400">Clients</h1>
        <Link
          to="/clients/register"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl shadow transition"
        >
          Register Client
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {clients.map((client) => (
          <ClientCard key={client.id} client={client} />
        ))}
      </div>
    </div>
  );
};

export default Clients;
