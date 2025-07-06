import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../api/axios.js";
import { useClientes } from "../context/ClientesContext.jsx";
import { useSedes } from "../context/SedesContext.jsx";

function RegistrarPagos() {
  const { register, handleSubmit, watch, reset } = useForm();
  const { getClienteDni } = useClientes();
  const { getSedes } = useSedes();

  const [dni, setDni] = useState("");
  const [cliente, setCliente] = useState(null);
  const [sedes, setSedes] = useState([]);
  const [membresias, setMembresias] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  const idMembresia = watch("idMembresia");
  const selectedMembresia = membresias.find(m => m._id === idMembresia);

  useEffect(() => {
    getSedes().then(setSedes).catch(() => setError("Error al cargar sedes"));
    axiosInstance.get("/membresias").then(res => setMembresias(res.data));
  }, []);

  const buscarCliente = async () => {
    setMensaje(""); setError("");
    try {
      const data = await getClienteDni(dni);
      setCliente(data);
    } catch (err) {
      setCliente(null);
      setError(err.response?.status === 404 ? "Cliente no encontrado" : "Error al buscar cliente");
    }
  };

  const onSubmit = async (data) => {
    if (!cliente) return setError("Primero busca un cliente");

    const body = {
      idCliente: cliente._id,
      idMembresia: data.idMembresia,
      monto: parseFloat(data.monto),
      metodoPago: data.metodoPago,
      accesoSedes: selectedMembresia?.tipo === "Básica" ? data.sede : undefined,
    };

    try {
      await axiosInstance.post("/pagos", body);
      setMensaje("Pago registrado correctamente 😊");
      setError("");
      reset();
    } catch (err) {  
      setError(err.response?.data?.message || 'Error al guardar');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-zinc-800 text-white p-6 rounded-md mt-10">
      <h1 className="text-2xl font-bold mb-4">Registrar Pago</h1>

      {/* Buscar Cliente */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Ingrese DNI"
          className="w-full px-4 py-2 rounded bg-zinc-700"
          value={dni}
          onChange={e => setDni(e.target.value)}
        />
        <button
          onClick={buscarCliente}
          className="bg-sky-500 hover:bg-sky-600 px-4 py-2 rounded"
        >
          Buscar
        </button>
      </div>

      {error && <p className="text-red-400">{error}</p>}
      {mensaje && <p className="text-green-400">{mensaje}</p>}

      {cliente && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="bg-zinc-700 p-4 rounded space-y-1">
            <p><strong>Nombre:</strong> {cliente.nombre} {cliente.apellidos}</p>
            <p><strong>Email:</strong> {cliente.email}</p>
            <p><strong>Teléfono:</strong> {cliente.telefono}</p>
          </div>

          <select
            {...register("idMembresia", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded"
          >
            <option value="">Selecciona una membresía</option>
            {membresias.map(m => (
              <option key={m._id} value={m._id}>{m.tipo} — S/ {m.costo}</option>
            ))}
          </select>

          {selectedMembresia?.tipo === "Básica" && (
            <select
              {...register("sede", { required: true })}
              className="w-full bg-zinc-700 text-white px-4 py-2 rounded"
            >
              <option value="">Selecciona una sede</option>
              {sedes.map(s => (
                <option key={s._id} value={s._id}>{s.nombre}</option>
              ))}
            </select>
          )}

          <input
            type="number"
            step="0.01"
            placeholder="Monto"
            {...register("monto", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded"
          />

          <select
            {...register("metodoPago", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded"
          >
            <option value="">Selecciona un método</option>
            <option value="Efectivo">Efectivo</option>
            <option value="Yape">Yape</option>
            <option value="Transferencia">Transferencia</option>
          </select>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            Registrar Pago
          </button>
        </form>
      )}
    </div>
  );
}

export default RegistrarPagos;
