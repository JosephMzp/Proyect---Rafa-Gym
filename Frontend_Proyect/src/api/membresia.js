import axios from './axios.js'

export const getMembresiasRequest = () => axios.get('/membresias')

export const getMembresiaRequest = (id) => axios.get(`/membresias/${id}`)

export const createMembresiasRequest = (membresia) => axios.post('/membresias', membresia)

export const updateMembresiaRequest = (id, membresia) => 
    axios.put(`/membresias/${id}`, membresia);

export const deleteMembresiaRequest = (id) => axios.delete(`/membresias/${id}`)