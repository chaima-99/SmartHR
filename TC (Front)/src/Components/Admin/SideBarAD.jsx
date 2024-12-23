import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaTachometerAlt, FaUser,  FaSignOutAlt } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';

const Sidebar = ({ setActiveTab }) => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar toggle

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await fetch('/api/user'); // Replace this with your actual endpoint
      const data = await response.json();
      setUser(data);
    };

    fetchUserData();
  }, []);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsSidebarOpen(false); // Close sidebar on navigation (mobile)
  };
  const handleLogout = () => {
    // Redirect to the login page
    Navigate("/src/Pages/Login_page.jsx");
  };
  return (
    <div>
      {/* Hamburger Icon for Mobile */}
      <div className="lg:hidden p-4">
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? (
            <FiX className="text-[#1D5C96] text-2xl" />
          ) : (
            <FiMenu className="text-[#1D5C96] text-2xl" />
          )}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed top-0 left-0 w-64 bg-[#1D5C96] h-screen text-white p-6 z-50 lg:fixed lg:translate-x-0 lg:block lg:w-64 lg:h-screen transition-transform duration-300`}
      >
        <div className="flex items-center mb-6">
          <img
            src="path/to/profile/picture.jpg" // Replace with actual image source
            alt="Profile"
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h2 className="text-lg font-bold">{user.name}</h2>
            <p className="text-sm">{user.email}</p>
          </div>
        </div>

        <nav className="mt-6">
          <button
            className="flex items-center w-full text-left py-2 px-4 rounded hover:bg-blue-700 focus:bg-blue-800 transition mb-2"
            onClick={() => handleNavClick('dashboard')}
          >
            <FaTachometerAlt className="mr-2" />
            Dashboard
          </button>
          <button
            className="flex items-center w-full text-left py-2 px-4 rounded hover:bg-blue-700 focus:bg-blue-800 transition mb-2"
            onClick={() => handleNavClick('createAccount')}
          >
            <FaUser className="mr-2" />
            Create Account
          </button>
         
        </nav>

        <button className="mt-64 flex items-center text-white py-2 px-4 rounded w-full hover:bg-gray-700 transition"
        onClick={handleLogout}>
          <FaSignOutAlt className="mr-2" />
          Log out
        </button>
      </div>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;
