import axios from 'axios';

const baseURL = import.meta.env.DEV
  ? import.meta.env.VITE_API_DEV
  : '/api'; // En producción asume que backend está en mismo dominio

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default instance;
