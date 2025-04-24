import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [newProgram, setNewProgram] = useState({ name: '', description: '' });

  // Fetch all programs (GET)
  const fetchPrograms = async () => {
    try {
      const response = await fetch('/api/programs');
      const data = await response.json();
      setPrograms(data);
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  };

  // Create a new program (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProgram),
      });

      if (response.ok) {
        setNewProgram({ name: '', description: '' });
        fetchPrograms(); // Refresh list after adding
      } else {
        console.error('Failed to add program');
      }
    } catch (error) {
      console.error('Error adding program:', error);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white p-8 font-poppins">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold tracking-wide text-blue-400 drop-shadow">
          Programs
        </h1>
      </div>

      {/* Add Program Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-xl shadow-xl mb-8 max-w-2xl mx-auto"
      >
        <h2 className="text-xl font-bold text-green-400 mb-4">Add a New Program</h2>
        <input
          type="text"
          placeholder="Program Name"
          value={newProgram.name}
          onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })}
          required
          className="w-full mb-4 px-4 py-2 rounded text-black"
        />
        <textarea
          placeholder="Program Description"
          value={newProgram.description}
          onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
          required
          className="w-full mb-4 px-4 py-2 rounded text-black"
        ></textarea>
        <button
          type="submit"
          className="bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white px-6 py-2 rounded-xl shadow-lg transition-all duration-300"
        >
          + Add Program
        </button>
      </form>

      {/* Display Programs */}
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
