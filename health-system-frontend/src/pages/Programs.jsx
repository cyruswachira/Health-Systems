import { Link } from 'react-router-dom';
import ProgramCard from '../components/ProgramCard';

const Programs = () => {
  const programs = [
    { name: 'TB', description: 'Tuberculosis treatment and prevention' },
    { name: 'HIV', description: 'HIV testing and support' },
    { name: 'Malaria', description: 'Malaria awareness and treatment' },
    { name: 'Family Planning', description: 'Support and education services' },
  ];

  return (
    <div className="min-h-screen w-full bg-black text-white p-8 font-poppins">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-wide text-blue-400 drop-shadow">
          Programs
        </h1>
        <Link
          to="/programs/create"
          className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-6 py-2 rounded-xl shadow-lg transition-all duration-300"
        >
          + Add Program
        </Link>
      </div>

      {/* Cards in two columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programs.map((program, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl shadow-lg hover:shadow-blue-400/40 transition-shadow duration-300"
          >
            <h2 className="text-2xl font-bold text-yellow-400 mb-2">{program.name}</h2>
            <p className="text-gray-300">{program.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Programs;
