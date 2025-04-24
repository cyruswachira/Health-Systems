import { useState } from 'react';

const CreateProgram = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, description });
    // Add API call to backend here
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 shadow">
      <h2 className="text-xl font-bold mb-4">Create Program</h2>
      <input
        type="text"
        placeholder="Program Name"
        className="w-full p-2 mb-4 border"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="w-full p-2 mb-4 border"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create</button>
    </form>
  );
};

export default CreateProgram;
