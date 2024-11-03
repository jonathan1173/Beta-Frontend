import axios from 'axios';

// Configuración inicial de la instancia de axios
const instance = axios.create({
  baseURL: 'http://localhost:8000/beta/', // URL base de la API
});

// Interceptor de solicitudes
instance.interceptors.request.use(
  (config) => {
    // Obtener el token de acceso almacenado en el navegador
    const token = localStorage.getItem('access_token');
    // Si el token existe, adjuntarlo al encabezado de autorización
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor de respuestas para manejar el token de refresco
instance.interceptors.response.use(
  (response) => response, // Pasar respuestas exitosas
  async (error) => {
    const originalRequest = error.config;
    // Verificar si el error es 401 y el token de refresco existe
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {
          // Solicitar nuevo token de acceso con el token de refresco
          const response = await axios.post('http://localhost:8000/beta/token/refresh/', {
            refresh: refreshToken,
          });
          // Almacenar el nuevo token de acceso
          localStorage.setItem('access_token', response.data.access);
          // Adjuntar el nuevo token al encabezado de autorización y reintentar la solicitud original
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          return instance(originalRequest);
        } catch (refreshError) {
          // Si el token de refresco falla, limpiar los tokens y redirigir a login
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login'; // Redirigir al login
        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
