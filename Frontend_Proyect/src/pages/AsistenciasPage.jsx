import { useState, useEffect } from "react";
import { useAsistencias } from "../context/AsistenciaContext.jsx";
import { Link } from "react-router-dom";

function AsistenciasPage() {
  const {
    asistencias,
    page,
    totalPages,
    setPage,
    limit,
    total,
    getAsistencias,
  } = useAsistencias();

  useEffect(() => {
    getAsistencias(page, limit);
  }, [page, getAsistencias]);
  console.log("Asistencias en estado:", asistencias);
  return (
    <div className="p-6">
      <ul className="flex justify-between px-4">
        <h1 className="text-2xl font-bold mb-4 text-white">
          Historial de Asistencias
        </h1>
        <li>
          <Link
            to="/add-asistencias"
            className="bg-green-900 px-4 py-1 rounded"
          >
            Agregar Asistencia
          </Link>
        </li>
      </ul>
      <div className="overflow-auto rounded-lg border border-gray-700">
        <table className="w-full table-auto text-sm text-left text-white">
          <thead className="bg-gray-800">
            <tr>
              {["DNI", "Cliente", "Sede", "Fecha Ingreso"].map((col) => (
                <th key={col} className="px-4 py-2 border-b border-gray-700">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {asistencias.length === 0 ? (
              <tr>
                <td colSpan="4" className="px-4 py-6 text-center text-gray-400">
                  Sin registros.
                </td>
              </tr>
            ) : (
              asistencias.map((a) => (
                <tr key={a._id} className="hover:bg-gray-700">
                  <td className="px-4 py-2 border-b border-gray-700">
                    {a.idCliente?.dni ?? "—"}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-700">
                    {a.idCliente
                      ? `${a.idCliente.nombre} ${a.idCliente.apellidos}`
                      : "—"}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-700">
                    {a.idSede?.nombre ?? "—"}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-700">
                    {new Date(a.fechaIngreso).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      <div className="flex justify-center space-x-2 mt-4">
        <button className="px-3 py-1 bg-sky-600 rounded disabled:opacity-50"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`px-3 py-1 rounded ${p === page ? 'bg-sky-500 text-white' : 'bg-zinc-600'}`}
          >
            {p}
          </button>
        ))}
        <button className="px-3 py-1 bg-sky-600 rounded disabled:opacity-50"
          onClick={() => {
            setPage((p) => {
              const next = Math.min(totalPages, p + 1);
              console.log("Cambio página:", p, "→", next);
              return next;
            });
          }}
        >
          Siguiente
        </button>
      </div>
      <p className="text-center mt-2">
        Pag {page} de {totalPages} — Total: {total}
      </p>
    </div>
  );
}

export default AsistenciasPage;
