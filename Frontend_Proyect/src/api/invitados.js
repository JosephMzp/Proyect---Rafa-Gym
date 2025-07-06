import axios from "./axios.js";

export const getInvitadosRequest = (page = 1, limit = 10) =>
  axios.get("/invitados", { params: { page, limit } });

export const getInvitadoRequest = (id) => axios.get(`/invitados/${id}`);

export const createInvitadosRequest = (invitado) => {
  if (!invitado.idCliente) {
    throw new Error("Falta idCliente en el payload");
  }
  return axios.post(`/clientes/${invitado.idCliente}/invitados`, {
    idSede: invitado.idSede,
    dni: invitado.dni,
    nombre: invitado.nombre,
    telefono: invitado.telefono,
  });
};

export const updateInvitadoRequest = (id, invitado) =>
  axios.put(`/invitados/${id}`, invitado);

export const deleteInvitadoRequest = (id) => axios.delete(`/invitados/${id}`);
