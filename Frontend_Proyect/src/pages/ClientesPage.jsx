import { useEffect, useState } from 'react';
import { useClientes } from '../context/ClientesContext.jsx';
import { Link } from 'react-router-dom';

function ClientesPage() {
  const { clientes, getClientes, deleteCliente } = useClientes();
  const [filtro, setFiltro] = useState('');
  const [filtrados, setFiltrados] = useState([]);

  useEffect(() => {
    getClientes();
  }, []);

  useEffect(() => {
    const f = filtro.toLowerCase().trim();
    if (!f) {
      setFiltrados(clientes);
    } else {
      setFiltrados(
        clientes.filter(c =>
          c.dni.toString().includes(f) ||
          c.nombre.toLowerCase().includes(f) ||
          c.apellidos.toLowerCase().includes(f)
        )
      );
    }
  }, [filtro, clientes]);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <h1 className="text-2xl font-bold text-white">Lista de Clientes</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <input
            type="text"
            placeholder="Buscar por DNI, nombre o apellido"
            className="w-full sm:w-64 px-4 py-2 rounded bg-zinc-700 text-white"
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
          />
          <Link
            to="/add-clientes"
            className="bg-green-900 px-4 py-2 rounded text-white hover:bg-green-800"
          >
            + Agregar
          </Link>
        </div>
      </div>

      <div className="overflow-auto rounded-lg border border-gray-700">
        <table className="w-full min-w-max table-auto text-sm text-left text-white">
          <thead className="bg-gray-800">
            <tr>
              {['DNI', 'Nombre', 'Apellidos', 'Teléfono', 'Acciones'].map(col => (
                <th key={col} className="px-4 py-2 border-b border-gray-700">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtrados.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-400">
                  {clientes.length === 0 ? 
                    'No hay clientes registrados.' :
                    'No se encontraron clientes.'}
                </td>
              </tr>
            ) : (
              filtrados.map(c => (
                <tr key={c._id} className="hover:bg-gray-700">
                  <td className="px-4 py-2 border-b border-gray-700">{c.dni}</td>
                  <td className="px-4 py-2 border-b border-gray-700">{c.nombre}</td>
                  <td className="px-4 py-2 border-b border-gray-700">{c.apellidos}</td>
                  <td className="px-4 py-2 border-b border-gray-700">{c.telefono}</td>
                  <td className="px-4 py-2 border-b border-gray-700 space-x-2">
                    <Link
                      to={`/clientes/${c._id}`}
                      className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
                    >Ver</Link>
                    <Link
                      to={`/edit-clientes/${c._id}`}
                      className="bg-yellow-600 hover:bg-yellow-700 px-2 py-1 rounded"
                    >Editar</Link>
                    <button
                      onClick={() => deleteCliente(c._id)}
                      className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
                    >Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientesPage;
