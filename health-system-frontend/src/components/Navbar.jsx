import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="font-bold text-xl">Health Info System</h1>
      <div className="space-x-4">
        <Link to="/">Dashboard</Link>
        <Link to="/programs">Programs</Link>
        <Link to="/clients">Clients</Link>
      </div>
    </nav>
  );
};

export default Navbar;