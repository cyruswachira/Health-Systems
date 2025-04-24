import { useState, useEffect } from 'react';

const RegisterClient = () => {
  const [programs, setPrograms] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch all available programs on mount
  useEffect(() => {
    fetch('http://localhost:5000/api/programs')
      .then((res) => res.json())
      .then((data) => setPrograms(data))
      .catch((err) => console.error('Error fetching programs:', err));
  }, []);

  const handleProgramChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      if (selectedPrograms.length < 2) {
        setSelectedPrograms((prev) => [...prev, value]);
      } else {
        alert('You can only select up to 2 programs.');
      }
    } else {
      setSelectedPrograms((prev) => prev.filter((id) => id !== value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!name || !email || !phone || !gender || selectedPrograms.length === 0) {
      alert('Please fill out all fields and select at least one program.');
      return;
    }

    if (selectedPrograms.length > 2) {
      alert('You can only register for a maximum of 2 programs.');
      return;
    }

    const clientData = {
      name,
      email,
      phone,
      gender,
      selectedPrograms,
    };

    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/clients', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clientData),
      });

      if (response.ok) {
        alert('Client registered successfully!');
        // Clear form
        setName('');
        setEmail('');
        setPhone('');
        setGender('');
        setSelectedPrograms([]);
      } else {
        const error = await response.json();
        alert(`Failed to register client: ${error.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error submitting client:', error);
      alert('Something went wrong while submitting the form.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center px-6 py-10">
      <form onSubmit={handleSubmit} className="w-full max-w-xl bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl text-white font-bold text-center mb-6">Register New Client</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 rounded-lg bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-3 mb-4 rounded-lg bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full p-3 mb-4 rounded-lg bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <div className="mb-6">
          <p className="text-white font-medium mb-2">Select Programs (Max 2)</p>
          <div className="flex flex-wrap gap-3">
            {programs.map((program) => (
              <div key={program.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`program-${program.id}`}
                  value={program.id}
                  onChange={handleProgramChange}
                  checked={selectedPrograms.includes(program.id)}
                  disabled={selectedPrograms.length >= 2 && !selectedPrograms.includes(program.id)}
                  className="hidden"
                />
                <label
                  htmlFor={`program-${program.id}`}
                  className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium ${
                    selectedPrograms.includes(program.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-white hover:bg-blue-500'
                  }`}
                >
                  {program.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-white font-medium mb-2">Gender</p>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Gender --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 mt-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register Client'}
        </button>
      </form>
    </div>
  );
};

export default RegisterClient;
