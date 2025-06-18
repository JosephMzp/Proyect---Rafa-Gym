import { NavLink } from "react-router-dom";

const menuItems = [
  { name: "Clientes", to: "/clientes" },
  { name: "Usuarios", to: "/usuarios" },
  { name: "Tareas", to: "/tasks" },
];

function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-full w-60 bg-zinc-900 text-white shadow-lg">
      <div className="p-6 text-2xl font-bold">Mi App</div>
      <nav className="mt-6 flex flex-col">
        {menuItems.map(({ name, to }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `px-6 py-3 my-1 rounded-lg transition-colors ${
                isActive
                  ? "bg-zinc-700 text-sky-400 font-semibold"
                  : "text-gray-300 hover:bg-zinc-800 hover:text-white"
              }`
            }
          >
            {name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
export default Sidebar