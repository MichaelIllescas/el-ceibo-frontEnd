import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://app.imperial-net.com', // Cambia esto a la URL base de tu API
  withCredentials: true, // Permitir el envío de cookies y credenciales
  headers: {
    'Content-Type': 'application/json', // Cambia esto si necesitas otros encabezados
  },
});

export default apiClient;
