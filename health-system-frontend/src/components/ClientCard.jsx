import { Link } from 'react-router-dom';

const ClientCard = ({ client }) => (
  <div className="border p-4 rounded bg-white shadow">
    <h2 className="text-lg font-bold">{client.name}</h2>
    <p>Email: {client.email}</p>
    <Link to={`/clients/${client.id}`} className="text-blue-500 underline mt-2 inline-block">View Profile</Link>
  </div>
);

export default ClientCard;