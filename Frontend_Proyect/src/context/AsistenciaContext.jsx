import { createContext, useContext, useState } from "react";
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

  const getAsistencias = async (page = 1, limit = 10) => {
    try {
      const res = await getAsistenciasRequest(page, limit);
      console.log('Asistencias desde backend:', res.data.asistencias);
      setAsistencias(res.data.asistencias);
      setTotal(res.data.total);
    } catch (error) {
      console.log(error);
    }
  };

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
