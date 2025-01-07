import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // Cambia esto a la URL base de tu API
  withCredentials: true, // Permitir el envío de cookies y credenciales
  headers: {
    'Content-Type': 'application/json', // Cambia esto si necesitas otros encabezados
  },
});

export default apiClient;
