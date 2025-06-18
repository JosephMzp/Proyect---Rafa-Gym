import { useEffect } from 'react';
import { useClientes } from '../context/ClientesContext';
import {Link} from 'react-router-dom'

function ClientesPage({cliente}) {
  const { clientes, createCliente, getCliente, getClientes, updateCliente, deleteCliente} = useClientes();
  console.log(clientes)

  useEffect(()=>{
    getClientes();
  },[])

  return (
    <div className="p-6">
      <ul className="flex justify-between px-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Lista de Clientes</h1>
      <li>
          <Link to='/add-clientes'
          className='bg-green-900 px-4 py-1 rounded'>Agregar Cliente</Link>
          </li>
      </ul>
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
            {clientes.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-400">
                  No hay clientes registrados.
                </td>
              </tr>
            ) : (
              clientes.map(c => (
                <tr key={c._id} className="hover:bg-gray-700">
                  <td className="px-4 py-2 border-b border-gray-700">{c.dni}</td>
                  <td className="px-4 py-2 border-b border-gray-700">{c.nombre}</td>
                  <td className="px-4 py-2 border-b border-gray-700">{c.apellidos}</td>
                  <td className="px-4 py-2 border-b border-gray-700">{c.telefono}</td>
                  <td className="px-4 py-2 border-b border-gray-700 space-x-2">
                    <button
                      onClick={() => getCliente(cliente._id)}
                      className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
                    >
                      Ver
                    </button>
                    <button
                      onClick={() => updateCliente(cliente._id)}
                      className="bg-yellow-600 hover:bg-yellow-700 px-2 py-1 rounded"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => deleteCliente(cliente._id)}
                      className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
                    >
                      Eliminar
                    </button>
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