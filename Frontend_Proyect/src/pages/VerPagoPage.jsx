import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axiosInstance from "../api/axios";
import {usePagos} from "../context/PagosContext.jsx";
import { HiArrowLeft, HiCreditCard } from 'react-icons/hi';

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
    <div className="max-w-md mx-auto bg-zinc-800 text-white p-8 rounded-xl shadow-lg mt-12">
      {/* Ícono y título */}
      <div className="flex items-center gap-2 mb-6">
        <HiCreditCard className="text-sky-400 w-8 h-8" />
        <h1 className="text-2xl font-bold">Detalles del Pago</h1>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between border-b border-zinc-700 pb-2">
          <span className="font-medium text-gray-300">DNI:</span>
          <span>{pago.idCliente?.dni}</span>
        </div>
        <div className="flex justify-between border-b border-zinc-700 pb-2">
          <span className="font-medium text-gray-300">Cliente:</span>
          <span>{pago.idCliente?.nombre} {pago.idCliente?.apellidos}</span>
        </div>
        <div className="flex justify-between border-b border-zinc-700 pb-2">
          <span className="font-medium text-gray-300">Membresía:</span>
          <span>{pago.idMembresia?.tipo}</span>
        </div>
        {pago.idMembresia?.tipo === "Básica" && (
          <div className="flex justify-between border-b border-zinc-700 pb-2">
            <span className="font-medium text-gray-300">Sede:</span>
            <span>{pago.accesoSedes?.nombre}</span>
          </div>
        )}
        {/** Montos y fechas */}
        <div className="flex justify-between border-b border-zinc-700 pb-2">
          <span className="font-medium text-gray-300">Monto:</span>
          <span className="text-green-400 font-semibold">
            S/ {pago.monto.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between border-b border-zinc-700 pb-2">
          <span className="font-medium text-gray-300">Método:</span>
          <span>{pago.metodoPago}</span>
        </div>
        <div className="flex justify-between border-b border-zinc-700 pb-2">
          <span className="font-medium text-gray-300">Inicio:</span>
          <span>{new Date(pago.fechaInicio).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium text-gray-300">Vencimiento:</span>
          <span>{new Date(pago.fechaPago).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Botón de retorno */}
      <Link
        to="/pagos"
        className="mt-8 flex items-center justify-center gap-2 w-full bg-sky-600 hover:bg-sky-700 py-2 rounded transition"
      >
        <HiArrowLeft className="w-5 h-5" />
        Volver a pagos
      </Link>
    </div>
  );
}

export default VerPago;