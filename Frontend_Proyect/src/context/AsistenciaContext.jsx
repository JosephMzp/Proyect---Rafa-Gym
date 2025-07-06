import { createContext, useContext, useState, useCallback ,useEffect } from "react";
import {
  createAsistenciasRequest,
  getAsistenciasRequest,
  getAsistenciaRequest,
  deleteAsistenciaRequest,
  updateAsistenciaRequest,
} from "../api/asistencia.js";

const AsistenciaContext = createContext();

export const useAsistencias = () => {
  const context = useContext(AsistenciaContext);

  if (!context) {
    throw new Error("Error");
  }
  return context;
};

export function AsistenciaProvider({ children }) {
  const [asistencias, setAsistencias] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const getAsistencias = async (p = page, lim = limit) => {
  try {
    const res = await getAsistenciasRequest(p, lim);
    setAsistencias(res.data.asistencias);
    setTotal(res.data.total);
    setPage(res.data.page);
    setTotalPages(res.data.totalPages);
  } catch (error) {
    console.error(error);
  }
}

  useEffect(() => {
    async function load() {
    getAsistencias(page, limit);
    }load();
  }, [page, getAsistencias]);

  const createAsistencia = async (asistencia) => {
    try {
      const res = await createAsistenciasRequest(asistencia);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteAsistencia = async (id) => {
    try {
      const res = await deleteAsistenciaRequest(id);
      if (res.status == 204)
        setAsistencias(
          asistencias.filter((asistencia) => asistencia._id != id)
        );
    } catch (error) {
      console.log(error);
    }
  };

  const getAsistencia = async (id) => {
    try {
      const res = await getAsistenciaRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateAsistencia = async (id, asistencia) => {
    try {
      await updateAsistenciaRequest(id, asistencia);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AsistenciaContext.Provider
      value={{
        asistencias,
        total,
        limit,
        setLimit,
        totalPages,
        page,
        setPage,
        createAsistencia,
        getAsistencias,
        deleteAsistencia,
        getAsistencia,
        updateAsistencia,
      }}
    >
      {children}
    </AsistenciaContext.Provider>
  );
}
