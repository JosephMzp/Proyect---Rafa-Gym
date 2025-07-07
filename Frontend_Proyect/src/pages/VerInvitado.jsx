import { useEffect, useState } from 'react';
import { useInvitados } from '../context/InvitadosContext';
import { Link, useParams } from 'react-router-dom';
import { HiArrowLeft, HiUser, HiHome, HiUserGroup } from 'react-icons/hi';

function VerInvitado() {
  const { id } = useParams();
  const { getInvitado } = useInvitados();
  const [invitado, setInvitado] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      try {
        const data = await getInvitado(id);
        setInvitado(data);
      } catch (err) {
        setError('Error al obtener invitado');
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [id, getInvitado]);

  if (loading) return <div className="text-white p-4">Cargando...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!invitado) return null;

  const { idCliente, idSede, nombre, dni: dniInv, telefono, createdAt } = invitado;

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-900 p-6">
      <div className="w-full max-w-4xl bg-zinc-800 text-white rounded-xl shadow-xl overflow-hidden">
        <div className="flex justify-between items-center bg-zinc-700 px-6 py-4">
          <h2 className="text-xl font-bold">Detalles del Invitado</h2>
          <Link to="/invitados" className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 px-3 py-2 rounded">
            <HiArrowLeft className="w-5 h-5" />
            Volver
          </Link>
        </div>
        <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-zinc-700">
          <div className="md:w-1/3 p-6 space-y-2">
            <div className="flex items-center gap-2 text-sky-400">
              <HiUser className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Datos del Cliente</h3>
            </div>
            <p><strong>DNI:</strong> {idCliente.dni}</p>
            <p><strong>Nombre:</strong> {idCliente.nombre} {idCliente.apellidos}</p>
            <p><strong>Teléfono:</strong> {idCliente.telefono}</p>
            <p><strong>Email:</strong> {idCliente.email}</p>
          </div>
          <div className="md:w-1/3 p-6 space-y-2">
            <div className="flex items-center gap-2 text-green-400">
              <HiHome className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Sede</h3>
            </div>
            <p><strong>Nombre:</strong> {idSede.nombre}</p>
            <p><strong>Dirección:</strong> {idSede.direccion}</p>
          </div>
          <div className="md:w-1/3 p-6 space-y-2">
            <div className="flex items-center gap-2 text-purple-400">
              <HiUserGroup className="w-6 h-6" />
              <h3 className="text-lg font-semibold">Invitado</h3>
            </div>
            <p><strong>Nombre:</strong> {nombre}</p>
            <p><strong>DNI:</strong> {dniInv}</p>
            <p><strong>Teléfono:</strong> {telefono}</p>
            <p><strong>Registrado:</strong> {new Date(createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerInvitado;
