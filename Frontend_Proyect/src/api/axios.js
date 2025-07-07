import axios from 'axios';

const baseURL = import.meta.env.DEV
  ? import.meta.env.VITE_API_DEV
  : 'https://backend-rafa-gym.onrender.com'; // En producción asume que backend está en mismo dominio

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default instance;
