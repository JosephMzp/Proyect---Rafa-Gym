import { useEffect, useState } from 'react';
import { useMembresias } from '../context/MembresiaContext.jsx';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { HiArrowLeft, HiPencil} from 'react-icons/hi';
import { FaEdit } from "react-icons/fa";

function EditarMembresia() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMembresia, updateMembresia } = useMembresias();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }} = useForm();
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await getMembresia(id);
        reset({ 
          tipo: data.tipo, 
          costo: data.costo,
          ingresoDiario: data.ingresoDiario,
          asesoramiento: data.asesoramiento,
          invitadosMensuales: data.invitadosMensuales
        });
      } catch {
        setError('Error al cargar la membresía');
      }
    }
    load();
  }, [id, getMembresia, reset]);

  const onSubmit = async (values) => {
    try {
      await updateMembresia(id, values);
      navigate('/membresias');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-zinc-900 p-6">
      <div className="w-full max-w-md bg-zinc-800 text-white rounded-xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center bg-zinc-700 px-6 py-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <FaEdit className="w-6 h-6 text-sky-400" />
            Editar Membresía
          </h2>
          <Link to="/membresias" className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 px-3 py-2 rounded">
            <HiArrowLeft className="w-5 h-5" />
            Volver
          </Link>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          {error && <p className="text-red-400">{error}</p>}

          <div>
            <label className="block text-sm text-gray-300">Tipo</label>
            <input
              {...register('tipo', { required: true })}
              className="mt-1 w-full bg-zinc-700 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {errors.tipo && <p className="text-red-400 text-sm">Requerido</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-300">Costo (S/)</label>
            <input
              type="number" step="0.01"
              {...register('costo', { required: true, valueAsNumber: true })}
              className="mt-1 w-full bg-zinc-700 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {errors.costo && <p className="text-red-400 text-sm">Requerido</p>}
          </div>

          <div>
            <label className="block text-sm text-gray-300">Ingresos diarios</label>
            <input
              type="number"
              {...register('ingresoDiario', { required: true, valueAsNumber: true })}
              className="mt-1 w-full bg-zinc-700 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {errors.ingresoDiario && <p className="text-red-400 text-sm">Requerido</p>}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register('asesoramiento')}
              className="h-4 w-4 text-sky-500 rounded bg-zinc-700 focus:ring-sky-500"
            />
            <label className="text-gray-300 text-sm">Asesoramiento incluido</label>
          </div>

          <div>
            <label className="block text-sm text-gray-300">Invitados mensuales</label>
            <input
              type="number"
              {...register('invitadosMensuales', { required: true, valueAsNumber: true })}
              className="mt-1 w-full bg-zinc-700 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            {errors.invitadosMensuales && <p className="text-red-400 text-sm">Requerido</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 py-2 rounded transition disabled:opacity-50"
          >
            <HiPencil className="w-5 h-5" />
            {isSubmitting ? 'Guardando...' : 'Guardar cambios'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditarMembresia;
