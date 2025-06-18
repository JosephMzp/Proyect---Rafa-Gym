import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Navbar from './components/Navbar.jsx';

function LayoutPrivado() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-4 ml-60">
        <Outlet />
      </main>
    </div>
  );
}

export default LayoutPrivado;
