import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateProgram = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Your Flask backend base URL
  const API_BASE_URL = 'http://127.0.0.1:5000';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const programData = {
      name,
      description,
    };

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/api/programs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(programData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create program');
      }

      const result = await response.json();
      console.log('Program created:', result.message);

      // Redirect to /programs or any other page
      navigate('/programs');
    } catch (error) {
      console.error('Error creating program:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full bg-black flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="max-w-md w-full bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl text-white"
      >
        <h2 className="text-2xl font-bold text-blue-400 mb-6 text-center">Create Program</h2>

        {error && (
          <div className="text-red-500 text-center mb-4">
            {error}
          </div>
        )}

        <input
          type="text"
          placeholder="Program Name"
          className="w-full p-3 mb-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full p-3 mb-6 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          required
        ></textarea>

        <button
          type="submit"
          className={`w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold shadow-lg transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  );
};

export default CreateProgram;
