import { Link } from 'react-router-dom';
import ProgramCard from '../components/ProgramCard';

const Programs = () => {
  const programs = [
    { name: 'TB', description: 'Tuberculosis treatment and prevention' },
    { name: 'HIV', description: 'HIV testing and support' }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Programs</h1>
        <Link to="/programs/create" className="bg-green-500 text-white px-4 py-2 rounded">Add Program</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {programs.map((p, i) => <ProgramCard key={i} {...p} />)}
      </div>
    </div>
  );
};

export default Programs;