import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import doctorImage from '../assets/doctor1.jpg';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    setLoading(true);

    try {
      const response = await fetch('https://health-info-systems.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Login successful!');
        setError('');
        localStorage.setItem('token', result.token);
        navigate('/dashboard');
      } else {
        setMessage('');
        setError(result.message || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('');
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: `url(${doctorImage})` }}></div>

      
      <div className="w-1/2 flex items-center justify-center bg-gray-900 text-white">
        <div className="max-w-md w-full space-y-8 p-8 bg-opacity-60 rounded-lg shadow-lg backdrop-blur-md">
          <h2 className="text-3xl font-bold text-center">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
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
              {loading ? 'Logging In...' : 'Login'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-300">Don't have an account?</p>
            <a href="/" className="text-yellow-500 hover:underline">Sign up</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
