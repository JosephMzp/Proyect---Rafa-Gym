import axios from './axios.js'

export const getSedesRequest = () => axios.get('/sedes')

export const getSedeRequest = (id) => axios.get(`/sedes/${id}`)

export const createSedesRequest = (sede) => axios.post('/sedes', sede)

export const updateSedesRequest = (id, sede) => 
    axios.put(`/sedes/${id}`, sede);

export const deleteSedesRequest = (id) => axios.delete(`/sedes/${id}`)