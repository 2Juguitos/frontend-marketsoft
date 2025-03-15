// src/modules/modulo1/services/categoriaService.js
import axios from 'axios';

const API_CATEGORIAS = 'http://localhost:8082/api/categorias';

export const getCategorias = async () => {
  try {
    const response = await axios.get(API_CATEGORIAS);
    return response.data;
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    throw error;
  }
};

export const getCategoriaById = async (id) => {
  try {
    const response = await axios.get(`${API_CATEGORIAS}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la categoría:', error);
    throw error;
  }
};

export const createCategoria = async (categoriaData) => {
  try {
    const response = await axios.post(API_CATEGORIAS, categoriaData);
    return response.data;
  } catch (error) {
    console.error('Error al crear la categoría:', error);
    throw error;
  }
};

export const updateCategoria = async (id, categoriaData) => {
  try {
    const response = await axios.put(`${API_CATEGORIAS}/${id}`, categoriaData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la categoría:', error);
    throw error;
  }
};

export const deleteCategoria = async (id) => {
  try {
    await axios.delete(`${API_CATEGORIAS}/${id}`);
  } catch (error) {
    console.error('Error al eliminar la categoría:', error);
    throw error;
  }
};
