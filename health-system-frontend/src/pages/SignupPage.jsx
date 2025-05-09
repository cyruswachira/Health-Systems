import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import doctorImage from '../assets/doctor.jpg'; 

const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const validateForm = () => {
    if (!username || !email || !password) {
      setError('All fields are required.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    const userData = {
      username: username.trim(),
      email: email.trim(),
      password: password.trim()
    };
  
    setLoading(true);
  
    try {
      const response = await fetch('https://health-info-systems.onrender.com/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setMessage(result.message || 'User created!');
        setError('');
        setUsername('');
        setEmail('');
        setPassword('');
        navigate('/login'); 
      } else {
        setMessage('');
        setError(result.message || 'Something went wrong.');
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage('');
      setError('Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${doctorImage})` }}></div>
      
      <div className="w-1/2 flex items-center justify-center bg-gray-900 text-white">
        <div className="max-w-md w-full space-y-8 p-8 bg-opacity-60 rounded-lg shadow-lg backdrop-blur-md">
          <div className="absolute top-16 right-4"> 
            <button
              onClick={() => navigate('/login')}
              className="px-4 py-2 bg-yellow-500 text-black rounded-full font-semibold hover:bg-yellow-600 focus:outline-none"
            >
              Login
            </button>
          </div>

          <h2 className="text-3xl font-bold text-center">Sign Up</h2>
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              {message && <p className="text-green-500">{message}</p>}
              {error && <p className="text-red-500">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-yellow-500 text-black rounded-md font-semibold transition transform hover:scale-105 disabled:bg-gray-500"
              disabled={loading} 
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
