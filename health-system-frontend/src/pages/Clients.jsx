import { Link } from 'react-router-dom';
import ClientCard from '../components/ClientCard';

const Clients = () => {
  const clients = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Clients</h1>
        <Link to="/clients/register" className="bg-green-500 text-white px-4 py-2 rounded">Register Client</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {clients.map((client) => <ClientCard key={client.id} client={client} />)}
      </div>
    </div>
  );
};

export default Clients;
