import axios from 'axios';


const instance = axios.create({
  baseURL: 'http://localhost:8000/beta/',

});


instance.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem('access_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);


instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refresh_token');
      if (refreshToken) {
        try {

          const response = await axios.post('http://localhost:8000/beta/token/refresh/', {
            refresh: refreshToken,
          });

          localStorage.setItem('access_token', response.data.access);

          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          return instance(originalRequest);
        } catch (refreshError) {

          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          window.location.href = '/login';

        }
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
