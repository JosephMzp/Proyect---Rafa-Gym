import axios from './axios.js'

export const getClientesRequest = () => axios.get('/clientes')

export const getClienteRequest = (id) => axios.get(`/clientes/${id}`)

export const createClientesRequest = (cliente) => axios.post('/clientes', cliente)

export const updateClientesRequest = (id, cliente) => 
    axios.put(`/clientes/${id}`, cliente);

export const deleteClientesRequest = (id) => axios.delete(`/clientes/${id}`)