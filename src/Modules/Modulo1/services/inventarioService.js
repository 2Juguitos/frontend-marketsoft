// src/modules/modulo1/services/inventarioService.js
import axios from 'axios';

const API_INVENTARIO = 'http://localhost:8082/api/inventario';

export const getInventarios = async () => {
  try {
    const response = await axios.get(API_INVENTARIO);
    return response.data;
  } catch (error) {
    console.error('Error al obtener inventarios:', error);
    throw error;
  }
};

export const getInventarioById = async (id) => {
  try {
    const response = await axios.get(`${API_INVENTARIO}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el inventario:', error);
    throw error;
  }
};


export const createInventario = async (inventarioData) => {
  try {
    const response = await axios.post(API_INVENTARIO, inventarioData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el inventario:', error);
    throw error;
  }
};

export const updateInventario = async (id, inventarioData) => {
  try {
    const response = await axios.put(`${API_INVENTARIO}/${id}`, inventarioData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el inventario:', error);
    throw error;
  }
};

export const deleteInventario = async (id) => {
  try {
    await axios.delete(`${API_INVENTARIO}/${id}`);
  } catch (error) {
    console.error('Error al eliminar el inventario:', error);
    throw error;
  }
};
