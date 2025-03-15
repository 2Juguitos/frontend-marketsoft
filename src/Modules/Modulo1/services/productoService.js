// src/Modules/Modulo1/services/productoService.js
import axios from 'axios';

const API_PRODUCTOS = 'http://localhost:8082/api/productos';

export const getProductos = async () => {
  try {
    const response = await axios.get(API_PRODUCTOS);
    return response.data;
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

export const createProducto = async (productoData) => {
  try {
    const response = await axios.post(API_PRODUCTOS, productoData);
    return response.data;
  } catch (error) {
    console.error("Error al crear producto:", error);
    throw error;
  }
};

export const updateProducto = async (id, productoData) => {
  try {
    const response = await axios.put(`${API_PRODUCTOS}/${id}`, productoData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar producto:", error);
    throw error;
  }
};

export const deleteProducto = async (id) => {
  try {
    const response = await axios.delete(`${API_PRODUCTOS}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar producto:", error);
    throw error;
  }
};
