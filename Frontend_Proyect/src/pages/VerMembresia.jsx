import { useEffect, useState } from 'react';
import { useMembresias } from '../context/MembresiaContext.jsx';
import { useParams, Link } from 'react-router-dom';
import { HiArrowLeft, HiGift, HiCurrencyDollar, HiUsers } from 'react-icons/hi';

function VerMembresia() {
  const { id } = useParams();
  const { getMembresia } = useMembresias();
  const [membresia, setMembresia] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMembresia(id);
        setMembresia(data);
      } catch (err) {
        setError('Error al cargar membresía');
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id, getMembresia]);

  if (loading) return <div className="text-white p-4">Cargando...</div>;
  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (!membresia) return null;

  const { tipo, costo, ingresoDiario, asesoramiento, invitadosMensuales } = membresia;

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-900 p-6">
      <div className="w-full max-w-md bg-zinc-800 text-white rounded-xl shadow-xl overflow-hidden">
        {/* Encabezado */}
        <div className="flex justify-between items-center bg-zinc-700 px-6 py-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <HiGift className="w-6 h-6 text-sky-400" />
            Detalles de Membresía
          </h2>
          <Link to="/membresias" className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 px-3 py-2 rounded">
            <HiArrowLeft className="w-5 h-5" />
            Volver
          </Link>
        </div>

        {/* Contenido */}
        <div className="p-6 space-y-4">
          <div className="flex justify-between border-b border-zinc-700 pb-2">
            <span className="font-medium text-gray-300">Tipo:</span>
            <span className="text-white">{tipo}</span>
          </div>
          <div className="flex justify-between border-b border-zinc-700 pb-2">
            <span className="font-medium text-gray-300">Costo:</span>
            <span className="text-green-400 font-semibold">S/ {costo.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-b border-zinc-700 pb-2">
            <span className="font-medium text-gray-300">Ingresos diarios:</span>
            <span>{ingresoDiario} acceso(s)</span>
          </div>
          <div className="flex justify-between border-b border-zinc-700 pb-2">
            <span className="font-medium text-gray-300">Asesoramiento:</span>
            <span>{asesoramiento ? 'Sí' : 'No'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-300">Invitados mensuales:</span>
            <span>
              <HiUsers className="inline w-5 h-5 text-purple-400 mr-1 align-middle" />
              {invitadosMensuales}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerMembresia;
