import { useEffect, useState } from 'react';

function UsuariosPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users') // ajusta tu endpoint real
      .then(res => res.json())
      .then(data => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando usuarios...</p>;

  return (
    <table className="min-w-full bg-zinc-800 text-white">
      <thead>
        <tr>
          <th className="px-4 py-2">#</th>
          <th className="px-4 py-2">Usuario</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Rol</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u, i) => (
          <tr key={u.id} className="even:bg-zinc-700">
            <td className="border px-4 py-2">{i + 1}</td>
            <td className="border px-4 py-2">{u.username}</td>
            <td className="border px-4 py-2">{u.email}</td>
            <td className="border px-4 py-2">{u.rol}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
export default UsuariosPage;
