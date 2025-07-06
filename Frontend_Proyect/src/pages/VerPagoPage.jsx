import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axios";
import {usePagos} from "../context/PagosContext.jsx"

function VerPago() {
  const { id } = useParams();
  const [pago, setPago] = useState(null);
  const [error, setError] = useState("");
  const { pagos, getPagos, deleteCliente } = usePagos();

  useEffect(() => {
    const fetchPago = async () => {
      try {
        const res = await axiosInstance.get(`/pagos/${id}`);
        setPago(res.data);
      } catch (err) {
        console.error(err);
        setError("Error al obtener el pago");
      }
    };
    fetchPago();
  }, [id]);

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  if (!pago) {
    return <div className="text-white p-4">Cargando...</div>;
  }

  const { idCliente, idMembresia, accesoSedes, monto, metodoPago, fechaInicio, fechaPago } = pago;

  return (
    <div className="max-w-xl mx-auto bg-zinc-800 text-white p-6 rounded-md mt-10">
      <h1 className="text-2xl font-bold mb-6">Detalles del Pago</h1>

      <div className="space-y-4">
        <p><strong>DNI:</strong> {idCliente?.dni}</p>
        <p><strong>Nombre:</strong> {idCliente?.nombre} {idCliente?.apellidos}</p>
        <p><strong>Membresía:</strong> {idMembresia?.tipo}</p>

        {idMembresia?.tipo === "Básica" && (
          <p><strong>Sede asignada:</strong> {accesoSedes?.nombre || accesoSedes}</p>
        )}

        <p><strong>Monto pagado:</strong> S/ {monto.toFixed(2)}</p>
        <p><strong>Método de pago:</strong> {metodoPago}</p>
        <p><strong>Fecha de inicio:</strong> {new Date(fechaInicio).toLocaleDateString()}</p>
        <p><strong>Fecha de vencimiento:</strong> {new Date(fechaPago).toLocaleDateString()}</p>
      </div>

      <div className="mt-6">
        <Link
          to="/pagos"
          className="inline-block bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded"
        >
          Volver
        </Link>
      </div>
    </div>
  );
}

export default VerPago;
