import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { HiMenu, HiX, HiUserCircle, HiLogout, HiLogin, HiUserAdd } from 'react-icons/hi';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { isAuthenticated, logout, usuario } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const activeClass = 'text-sky-400 bg-zinc-800 font-semibold';
  const inactiveClass = 'text-gray-300 hover:text-white hover:bg-zinc-800';

  return (
    <nav className="bg-zinc-900 flex items-center justify-between px-6 py-4">
      <Link to={isAuthenticated ? '/tasks' : '/'}>
        <h1 className="text-2xl font-bold text-white">Rafa Gym</h1>
      </Link>

      {/* Desktop Links */}
      <ul className="hidden md:flex items-center gap-x-4">
        {isAuthenticated ? (
          <>
            <li className="text-gray-300">
              Bienvenido, <span className="font-medium text-white">{usuario.username}</span>
            </li>

            <li>
              <button
                onClick={logout}
                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 rounded px-3 py-1 text-white"
              >
                <HiLogout /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${isActive ? activeClass : inactiveClass} flex items-center gap-1 px-3 py-1 rounded`
                }
              >
                <HiLogin /> Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `${isActive ? activeClass : inactiveClass} flex items-center gap-1 px-3 py-1 rounded`
                }
              >
                <HiUserAdd /> Register
              </NavLink>
            </li>
          </>
        )}
      </ul>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-gray-300"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-zinc-900 py-4 flex flex-col items-center gap-3 md:hidden">
          {isAuthenticated ? (
            <>
              <span className="text-white">Bienvenido, {usuario.username}</span>
              <button
                onClick={() => { logout(); setMobileOpen(false); }}
                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 rounded px-3 py-1 text-white"
              >
                <HiLogout /> Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                onClick={() => setMobileOpen(false)}
                to="/login"
                className={({ isActive }) =>
                  `${isActive ? activeClass : inactiveClass} flex items-center gap-1 px-3 py-1 rounded`
                }
              >
                <HiLogin /> Login
              </NavLink>
              <NavLink
                onClick={() => setMobileOpen(false)}
                to="/register"
                className={({ isActive }) =>
                  `${isActive ? activeClass : inactiveClass} flex items-center gap-1 px-3 py-1 rounded`
                }
              >
                <HiUserAdd /> Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;
