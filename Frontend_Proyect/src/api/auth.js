import axios from './axios.js';

export const registerRequest = usuario => axios.post(`/register`, usuario)

export const LoginRequest = usuario => axios.post(`/login`, usuario)

export const verityTokenRequet = () => axios.get('/verify')

