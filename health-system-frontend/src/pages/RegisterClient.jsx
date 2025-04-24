import { useState } from 'react';

const RegisterClient = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedPrograms, setSelectedPrograms] = useState([]);
  const [gender, setGender] = useState('');

  const programs = [
    { id: 'HIV', name: 'HIV' },
    { id: 'TB', name: 'TB' },
    { id: 'Malaria', name: 'Malaria' },
    { id: 'Cancer', name: 'Cancer' }, 
    { id: 'Diabetes', name: 'Diabetes' },
  ];

  const handleProgramChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      if (selectedPrograms.length < 2) {
        setSelectedPrograms((prev) => [...prev, value]);
      }
    } else {
      setSelectedPrograms((prev) => prev.filter((program) => program !== value));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPrograms.length > 2) {
      alert('You can register for a maximum of 2 programs');
      return;
    }
    console.log({ name, email, phone, selectedPrograms, gender });
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center px-6 py-8">
      <form onSubmit={handleSubmit} className="max-w-lg w-full bg-gray-800 p-8 rounded-xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-white mb-6">Register Client</h2>

      
        <input
          type="text"
          placeholder="Client Name"
          className="w-full p-3 mb-4 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

      
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        
        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full p-3 mb-4 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

      
        <div className="mb-6">
          <p className="text-white mb-2">Select Programs (max 2)</p>
          <div className="flex gap-4 flex-wrap">
            {programs.map((program) => (
              <div key={program.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={program.id}
                  value={program.id}
                  className="hidden"
                  onChange={handleProgramChange}
                  checked={selectedPrograms.includes(program.id)}
                  disabled={selectedPrograms.length >= 2 && !selectedPrograms.includes(program.id)}
                />
                <label
                  htmlFor={program.id}
                  className={`cursor-pointer px-4 py-2 rounded-full text-sm font-semibold ${
                    selectedPrograms.includes(program.id)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-white'
                  } hover:bg-blue-600 transition-all`}
                >
                  {program.name}
                </label>
              </div>
            ))}
          </div>
        </div>

      
        <div className="mb-6">
          <p className="text-white mb-2">Gender</p>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-700 bg-gray-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterClient;
