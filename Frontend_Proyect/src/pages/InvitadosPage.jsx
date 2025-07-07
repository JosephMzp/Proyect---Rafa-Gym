import { useState,useEffect } from 'react';
import { useInvitados } from '../context/InvitadosContext.jsx';
import ConfirmModal from "../components/ConfirmarModal.jsx"
import { Link } from 'react-router-dom';

function InvitadosPage() {
  const { invitados=[], total=0, getInvitados, deleteInvitado } = useInvitados();
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    getInvitados(page,limit);
  }, [page, getInvitados]);

  const handleDeleteClick = (client) => {
    setToDelete(client);
    setIsOpen(true);
  };

  const handleConfirm = async () => {
    await deleteCliente(toDelete._id);
    setIsOpen(false);
    getClientes();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold text-white">Lista de Invitados</h1>
        <Link to="/invitados/nuevo" className="bg-green-600 px-4 py-2 rounded">Registrar Invitado</Link>
      </div>
      <div className="overflow-auto rounded-lg border border-gray-700">
        <table className="w-full text-white text-left">
          <thead className="bg-gray-800">
            <tr>
              {['DNI Cliente', 'Cliente', 'Invitado', 'Sede', 'Fecha Visita', 'Acciones'].map(col => (
                <th key={col} className="px-4 py-2">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {invitados?.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-400">
                  No hay invitados registrados.
                </td>
              </tr>
            ) : (
                invitados.map(inv => (
              <tr key={inv._id} className="hover:bg-gray-700">
                <td className="px-4 py-2">{inv.idCliente.dni}</td>
                <td className="px-4 py-2">{inv.idCliente.nombre} {inv.idCliente.apellidos}</td>
                <td className="px-4 py-2">{inv.nombre}</td>
                <td className="px-4 py-2">{inv.idSede.nombre}</td>
                <td className="px-4 py-2">{new Date(inv.createdAt).toLocaleDateString()}</td>
                <td className="px-4 py-2 space-x-2">
                  <Link
                      to={`/invitados/${inv._id}`}
                      className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
                    >Ver</Link>
                  <button onClick={() => handleDeleteClick(inv)} className="bg-red-600 px-2 py-1 rounded">Eliminar</button>
                </td>
              </tr>
            )))}
          </tbody>
        </table>
      </div>
      {/*  paginación  */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-sky-600 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 rounded ${p === page ? 'bg-sky-500 text-white' : 'bg-zinc-600'}`}
          >
            {p}
          </button>
        ))}
        <button
          onClick={() => setPage(p => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-sky-600 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
      <ConfirmModal
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              onConfirm={handleConfirm}
              title="Confirmar eliminación"
              message={`¿Eliminar a ${toDelete?.nombre} ?`}
            />
    </div>
  );
}

export default InvitadosPage;
