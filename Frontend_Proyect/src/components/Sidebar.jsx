import { NavLink } from "react-router-dom";
import {Link} from 'react-router-dom'
import {HiUserGroup,HiCalendar,HiCreditCard,HiFingerPrint,HiUsers,HiCog,HiClipboardList
} from "react-icons/hi";


const menuItems = [
  { name: "Clientes", to: "/clientes", icon: HiUserGroup },
  { name: "Asistencias", to: "/asistencias", icon: HiCalendar },
  { name: "Pagos", to: "/pagos", icon: HiCreditCard },
  { name: "Membresias", to: "/membresias", icon: HiFingerPrint },
  { name: "Invitados", to: "/invitados", icon: HiUsers },
  //{ name: "Usuarios", to: "/usuarios", icon: HiCog },
  { name: "Tareas", to: "/tasks", icon: HiClipboardList },
];

function Sidebar() {
  return (
    <ul>
    <aside className="fixed top-0 left-0 h-full w-60 bg-zinc-900 text-white shadow-lg">
      <Link to={
                 "/datos"
            }>
      <div className="p-6 text-2xl font-bold">Rafa Gym</div></Link>
      <nav className="mt-6 flex flex-col">
        {menuItems.map(({ name, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-zinc-700 text-sky-400 font-semibold"
                  : "text-gray-300 hover:bg-zinc-800 hover:text-white"
              }`
            }
          >
            <Icon className="text-gray-400 mr-3" size={20} />{name}
          </NavLink>
        ))}
      </nav>
    </aside>
    </ul>
  );
}
export default Sidebar