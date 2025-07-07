import axios from 'axios'

const baseURL = import.meta.env.PROD
  ? '/api'
  : 'http://localhost:3000/api'

const instance = axios.create({
  baseURL,
  withCredentials: true // si usas cookies/sesión
})

export default instance