import { useState, useEffect } from "react";
import { usePagos } from "../context/PagosContext.jsx";
import { Link } from "react-router-dom";

function PagosPage() {
  const { pagos = [], total = 0, getPagos } = usePagos();
  const [page, setPage] = useState(1);
  const limit = 10;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    getPagos(page, limit);
  }, [page, getPagos]);
  console.log("Pagos en estado:", pagos, "Total:", total);
  return (
    <div className="p-6">
        <ul className="flex justify-between px-4">
      <h1 className="text-2xl font-bold mb-4 text-white">
        Historial de Pagos
      </h1>
      <li>
        <Link to='/add-pagos'
        className='bg-green-900 px-4 py-1 rounded'>Agregar Pago</Link>
      </li>
      </ul>
      <div className="overflow-auto rounded-lg border border-gray-700">
        <table className="w-full table-auto text-sm text-left text-white">
          <thead className="bg-gray-800">
            <tr>
              {["DNI", "Cliente", "Tipo", "Costo","Fecha de Inicio", "Fecha de Pago", "Acciones"].map((col) => (
                <th key={col} className="px-4 py-2 border-b border-gray-700">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pagos.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-4 py-6 text-center text-gray-400">
                  Sin registros.
                </td>
              </tr>
            ) : (
              pagos.map((p) => (
                <tr key={p._id} className="hover:bg-gray-700">
                  <td className="px-4 py-2 border-b border-gray-700">
                    {p.idCliente?.dni ?? "—"}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-700">
                    {p.idCliente
                      ? `${p.idCliente.nombre} ${p.idCliente.apellidos}`
                      : "—"}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-700">
                    {p.idMembresia?.tipo ?? "—"}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-700">
                    {p.monto ?? "—"}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-700">
                    {new Date(p.fechaInicio).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-700">
                    {new Date(p.fechaPago).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-700 space-x-2">
                  <Link
                      to={`/pagos/${p._id}`}
                      className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
                    >Ver</Link></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => setPage((pg) => Math.max(1, pg - 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-sky-600 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pg) => (
          <button
            key={pg}
            onClick={() => setPage(pg)}
            className={`px-3 py-1 rounded ${
              pg === page ? "bg-sky-500 text-white" : "bg-zinc-600"
            }`}
          >
            {pg}
          </button>
        ))}
        <button
          onClick={() => setPage((pg) => Math.min(totalPages, pg + 1))}
          disabled={page === totalPages}
          className="px-3 py-1 bg-sky-600 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}

export default PagosPage;
