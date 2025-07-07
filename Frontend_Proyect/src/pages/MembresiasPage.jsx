import { useEffect, useState } from 'react';
import { useMembresias } from '../context/MembresiaContext.jsx';
import { Link } from 'react-router-dom';

function MembresiasPage() {
  const { membresias, getMembresias, getMembresia } = useMembresias();
  const [filtro, setFiltro] = useState('');
  const [filtrados, setFiltrados] = useState([]);

  useEffect(() => {
    getMembresias();
  }, []);

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <h1 className="text-2xl font-bold text-white">Lista de membresias</h1>
        <div className="flex gap-2 w-full sm:w-auto">
        </div>
      </div>

      <div className="overflow-auto rounded-lg border border-gray-700">
        <table className="w-full min-w-max table-auto text-sm text-left text-white">
          <thead className="bg-gray-800">
            <tr>
              {['Tipo', 'Costo', 'Ingreso Diario', 'Invitados', 'Acciones'].map(col => (
                <th key={col} className="px-4 py-2 border-b border-gray-700">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {membresias.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-400">
                  {membresias.length === 0 ? 
                    'No hay membresias registradas.' :
                    'No se encontraron membresias.'}
                </td>
              </tr>
            ) : (
              membresias.map(m => (
                <tr key={m._id} className="hover:bg-gray-700">
                  <td className="px-4 py-2 border-b border-gray-700">{m.tipo}</td>
                  <td className="px-4 py-2 border-b border-gray-700">{m.costo}</td>
                  <td className="px-4 py-2 border-b border-gray-700">{m.ingresoDiario}</td>
                  <td className="px-4 py-2 border-b border-gray-700">{m.invitadosMensuales}</td>
                  <td className="px-4 py-2 border-b border-gray-700 space-x-2">
                    <Link
                      to={`/membresias/${m._id}`}
                      className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
                    >Ver</Link>
                    <Link
                      to={`/edit-membresias/${m._id}`}
                      className="bg-yellow-600 hover:bg-yellow-700 px-2 py-1 rounded"
                    >Editar</Link>
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

export default MembresiasPage;
