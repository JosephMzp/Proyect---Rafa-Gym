import { useState, useEffect } from "react";
import {useForm} from 'react-hook-form'
import axiosInstance from "../api/axios.js";
import axios from "axios"
import {useClientes} from '../context/ClientesContext.jsx'
import {useSedes} from '../context/SedesContext.jsx'
import { useNavigate, useParams} from 'react-router-dom';


function RegistrarAsistencia() {

     const {register, handleSubmit, setValue, formState: { errors }} = useForm();
     const {createClientes, getCliente, updateCliente, clientes, getClienteDni} = useClientes();
     const {getSede, getSedes} = useSedes();
     const navigate = useNavigate();
     const params = useParams();

  const [dni, setDni] = useState("");
  const [cliente, setCliente] = useState(null);
  const [sede, setSede] = useState("");
  const [sedes, setSedes] = useState([]);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    //getSedes().catch(() => setError("No se pudieron cargar las sedes"));
    const cargarSedes = async () => {
    try {
      const data = await getSedes();   // Aquí sí esperamos los datos
      setSedes(data);                  // Ahora sí actualizamos el estado local
    } catch {
      setError("No se pudieron cargar las sedes");
    }}
    cargarSedes();
  }, []);

  const buscarCliente = async () => {
    setError(""); setMensaje("");
    try {
      const data = await getClienteDni(dni);
      setCliente(data);
    } catch(err){
        console.log(err)
      setCliente(null);
      setError(err.response?.status === 404 ? "Cliente no encontrado" : "Error al buscar cliente");
    }
  };

  const registrarAsistencia = async () => {
    if (!cliente) return setError("Primero busca un cliente");
    if (!sede) return setError("Selecciona una sede");

    try {
      await axiosInstance.post("/asistencias", {
        idCliente: cliente._id,
        idSede: sede
      });
      setMensaje("Asistencia registrada 😊");
      setError("");
    } catch(err) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
    setError("Ya registró asistencia hoy 🙂");
  } else {
    setError("Error al registrar asistencia");
  }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-zinc-800 text-white p-6 rounded-md mt-10">
      <h1 className="text-2xl font-bold mb-4">Registrar Asistencia</h1>

      {/* Buscar cliente por DNI */}
      <input
        type="text"
        placeholder="Ingrese DNI"
        className="w-full px-4 py-2 mb-2 rounded bg-zinc-700"
        value={dni}
        onChange={e => setDni(e.target.value)}
      />
      <button
        onClick={buscarCliente}
        className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded w-full mb-4"
      >Buscar Cliente</button>

      {/* Mostrar errores */}
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {mensaje && <p className="text-green-400">{mensaje}</p>}

      {cliente && (
        <>
          {/* Información del cliente */}
          <div className="mb-4 border-t border-zinc-600 pt-4 space-y-2">
            <p><strong>Nombre:</strong> {cliente.nombre} {cliente.apellidos}</p>
            <p><strong>Email:</strong> {cliente.email}</p>
            <p><strong>Teléfono:</strong> {cliente.telefono}</p>
          </div>

          {/* Selector de sede */}
          <select
            value={sede}
            onChange={e => setSede(e.target.value)}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded mb-4"
          >
            <option value="">Selecciona una sede</option>
            {sedes.map(s => (
              <option key={s._id} value={s._id}>{s.nombre}</option>
            ))}
          </select>

          {/* Botón registrar asistencia */}
          <button
            onClick={registrarAsistencia}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded w-full"
          >
            Registrar Asistencia
          </button>
        </>
      )}

      {mensaje && <p className="text-green-400 mt-4">{mensaje}</p>}
    </div>
  );
}

export default RegistrarAsistencia;
