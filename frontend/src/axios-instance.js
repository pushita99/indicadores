import { BASE_URL } from '@/services/http-adaptator.js'
const API_URL = BASE_URL;
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: API_URL, // Reemplaza con la URL de tu servidor Nest.js
  withCredentials: true, // Habilita el envío de cookies y credenciales
});

export default axiosInstance;