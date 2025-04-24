import { useParams } from 'react-router-dom';

const ClientProfile = () => {
  const { id } = useParams();

  const client = {
    id,
    name: 'John Doe',
    email: 'john@example.com',
    programs: ['TB', 'HIV']
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow">
      <h1 className="text-2xl font-bold mb-4">Client Profile</h1>
      <p><strong>Name:</strong> {client.name}</p>
      <p><strong>Email:</strong> {client.email}</p>
      <h2 className="mt-4 font-semibold">Enrolled Programs:</h2>
      <ul className="list-disc list-inside">
        {client.programs.map((program, i) => <li key={i}>{program}</li>)}
      </ul>
    </div>
  );
};

export default ClientProfile;
