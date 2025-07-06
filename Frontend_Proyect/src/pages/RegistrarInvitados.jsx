import { useState, useEffect } from 'react';
import { useInvitados } from '../context/InvitadosContext';
import { useClientes } from '../context/ClientesContext';
import { useSedes } from '../context/SedesContext';
import axiosInstance from '../api/axios';
import { useNavigate, useParams } from 'react-router-dom';

function RegistrarInvitado() {
  const { getInvitados, createInvitado, getInvitado, updateInvitado } = useInvitados();
  const { getClienteDni } = useClientes();
  const { getSedes } = useSedes();
  const [dniCliente, setDniCliente] = useState('');
  const [cliente, setCliente] = useState(null);
  const [sedes, setSedes] = useState([]);
  const [sede, setSede] = useState('');
  const [nombre, setNombre] = useState('');
  const [dniInv, setDniInv] = useState('');
  const [telefono, setTelefono] = useState('');
  const [error, setError] = useState('');
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSedes().then(setSedes);
    if (params.id) {
      getInvitado(params.id).then(inv => {
        setCliente(inv.idCliente);
        setSede(inv.idSede._id);
        setNombre(inv.nombre);
        setDniInv(inv.dni);
        setTelefono(inv.telefono);
      });
    }
  }, [params.id]);

  const buscarCliente = () => {
    getClienteDni(dniCliente)
      .then(c => setCliente(c))
      .catch(() => setError('Cliente no encontrado'));
  };

  const onSubmit = async () => {
    if (!cliente) return setError('Busca cliente primero');
    try {
      if (params.id) {
        await updateInvitado(params.id, { idCliente: cliente._id, idSede: sede, nombre, dni: +dniInv, telefono: +telefono });
      } else {
        await createInvitado({ idCliente: cliente._id, idSede: sede, nombre, dni: +dniInv, telefono: +telefono });
      }
      navigate('/invitados');
    } catch (err) {
      console.error("Error en onSubmit:", err.response ?? err);
      setError(err.response?.data?.message || 'Error al guardar');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-zinc-800 text-white rounded-md mt-10 relative">
      <button className="absolute top-2 right-2" onClick={() => navigate(-1)}>✕</button>
      <h1 className="text-2xl font-bold mb-4">{params.id ? 'Editar' : 'Registrar'} Invitado</h1>

      <div className="mb-4">
        <label>DNI Cliente</label>
        <div className="flex">
          <input value={dniCliente} onChange={e => setDniCliente(e.target.value)} className="flex-1 bg-zinc-700 p-2" />
          <button onClick={buscarCliente} className="bg-sky-500 px-4 ml-2">Buscar</button>
        </div>
      </div>

      {cliente && (
        <div className="mb-4">
          <p><strong>Cliente:</strong> {cliente.nombre} {cliente.apellidos}</p>
        </div>
      )}

      <div className="mb-4">
        <label>Sede</label>
        <select value={sede} onChange={e => setSede(e.target.value)} className="w-full bg-zinc-700 p-2">
          <option value="">Selecciona sede</option>
          {sedes.map(s => <option key={s._id} value={s._id}>{s.nombre}</option>)}
        </select>
      </div>

      <div className="mb-4">
        <label>Nombre Invitado</label>
        <input value={nombre} onChange={e => setNombre(e.target.value)} className="w-full bg-zinc-700 p-2" />
      </div>

      <div className="mb-4">
        <label>DNI Invitado</label>
        <input type="number" value={dniInv} onChange={e => setDniInv(e.target.value)} className="w-full bg-zinc-700 p-2" />
      </div>

      <div className="mb-4">
        <label>Teléfono Invitado</label>
        <input type="number" value={telefono} onChange={e => setTelefono(e.target.value)} className="w-full bg-zinc-700 p-2" />
      </div>

      {error && <p className="text-red-500">{error}</p>}
      <button onClick={onSubmit} className="bg-green-600 w-full p-2 rounded">{params.id ? 'Guardar cambios' : 'Registrar Invitado'}</button>
    </div>
  );
}

export default RegistrarInvitado;
