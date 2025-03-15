// src/axiosConfig.js
import axios from 'axios';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // O extraerlo desde tu AuthContext si lo prefieres
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axios;
