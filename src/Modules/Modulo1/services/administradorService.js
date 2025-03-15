// src/Modules/Modulo1/services/administradorService.js
import axios from 'axios';

const API_ADMINISTRADORES = 'http://localhost:8082/api/administradores';

export const getAdministradores = async () => {
  const response = await axios.get(API_ADMINISTRADORES);
  return response.data;
};
