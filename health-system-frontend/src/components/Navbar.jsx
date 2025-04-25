import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
  
    navigate('/login'); 
  };

  return (
    <nav className="m-4 mt-6 bg-gradient-to-r from-blue-800 via-blue-600 to-blue-500 shadow-2xl px-10 py-6 text-white flex items-center justify-between rounded-3xl font-poppins">
      <h1 className="text-4xl font-extrabold tracking-wide drop-shadow-lg">
        🏥 Health Info System
      </h1>
      <div className="space-x-6 text-lg font-semibold">
        <Link
          to="/dashboard"
          className="bg-white text-blue-800 px-5 py-2 rounded-full shadow-md transition-all duration-300 hover:bg-blue-100 hover:scale-105"
        >
          Dashboard
        </Link>
        <Link
          to="/programs"
          className="bg-white text-blue-800 px-5 py-2 rounded-full shadow-md transition-all duration-300 hover:bg-blue-100 hover:scale-105"
        >
          Programs
        </Link>
        <Link
          to="/clients"
          className="bg-white text-blue-800 px-5 py-2 rounded-full shadow-md transition-all duration-300 hover:bg-blue-100 hover:scale-105"
        >
          Clients
        </Link>
        {/* Enhanced Log Out button */}
        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full shadow-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
        >
          LOG OUT
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
