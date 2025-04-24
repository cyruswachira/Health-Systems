import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import ProgramCard from '../components/ProgramCard'; 

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const navigate = useNavigate();

  
  const fetchPrograms = async () => {
    try {
      const response = await fetch('/api/programs'); 
      const data = await response.json();
      setPrograms(data);  
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  };

  // Fetch programs when the component mounts
  useEffect(() => {
    fetchPrograms();
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white p-8 font-poppins">
      
      <div className="flex justify-end mb-6">
        <button
          onClick={() => navigate('/programs/create')} 
          className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-6 py-2 rounded-xl shadow-lg transition-all duration-300"
        >
          + Add Program
        </button>
      </div>

      <h1 className="text-3xl font-extrabold tracking-wide text-blue-400 drop-shadow mb-8">
        Programs
      </h1>

      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {programs.length > 0 ? (
          programs.map((program, index) => (
            <ProgramCard
              key={index}
              name={program.name}
              description={program.description}
            />
          ))
        ) : (
          <p className="text-white">No programs available.</p>
        )}
      </div>
    </div>
  );
};

export default Programs;
