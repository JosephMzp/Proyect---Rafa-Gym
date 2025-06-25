import axios from './axios.js'

export const getAsistenciasRequest = () => axios.get('/asistencias')

export const getAsistenciaRequest = (id) => axios.get(`/asistencias/${id}`)

export const createAsistenciasRequest = (asistencia) => axios.post('/asistencias', asistencia)

export const updateAsistenciaRequest = (id, asistencia) => 
    axios.put(`/asistencias/${id}`, asistencia);

export const deleteAsistenciaRequest = (id) => axios.delete(`/asistencias/${id}`)