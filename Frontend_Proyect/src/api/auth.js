import axios from './axios.js';

const API = "http://localhost:3000/api"

export const registerRequest = usuario => axios.post(`/register`, usuario)

export const LoginRequest = usuario => axios.post(`/login`, usuario)

export const verityTokenRequet = () => axios.get('/verify')

