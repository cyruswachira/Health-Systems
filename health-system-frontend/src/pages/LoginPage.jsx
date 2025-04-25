import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error('Invalid username or password');
            }

            const data = await response.json();
            // Store JWT token in localStorage
            localStorage.setItem('access_token', data.access_token);
            navigate('/doctor-dashboard'); // Redirect to doctor dashboard
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-3xl font-semibold mb-6 text-center">Login to Your Account</h2>
                {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            className="w-full p-3 bg-gray-700 text-white rounded-lg"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="w-full p-3 bg-gray-700 text-white rounded-lg"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="w-full p-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-400 transition"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <span>Don't have an account? </span>
                    <a href="/signup" className="text-yellow-500">Sign up here</a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
