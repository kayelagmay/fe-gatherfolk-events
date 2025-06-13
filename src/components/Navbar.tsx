import { NavLink, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('admin_token');

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/staff-login');
  };

  return (
    <nav className="bg-blue-600 p-4">
      <ul className="flex space-x-4">
        <h1> Gatherfolk Events </h1>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-white font-semibold hover:text-gray-200 transition ${
                isActive ? 'underline' : ''
              }`
            }
          >
            Home
          </NavLink>
        </li>

        {token ? (
          <>
            <li>
              <NavLink
                to="/staff-dashboard"
                className={({ isActive }) =>
                  `text-white font-semibold hover:text-gray-200 transition ${
                    isActive ? 'underline' : ''
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-white font-semibold hover:text-gray-200 transition"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <NavLink
              to="/staff-login"
              className={({ isActive }) =>
                `text-white font-semibold hover:text-gray-200 transition ${
                  isActive ? 'underline' : ''
                }`
              }
            >
              Staff Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};