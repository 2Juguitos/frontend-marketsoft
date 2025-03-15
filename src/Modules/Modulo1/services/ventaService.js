import axios from 'axios';

const API_VENTAS = 'http://localhost:8082/api/ventas';




export const postVenta = async (ventaData) => {
  try {
    const response = await axios.post(API_VENTAS, ventaData);
    return response.data;
  } catch (error) {
    console.error("Error al crear venta:", error);
    throw error;
  }
};

export const getVentas = async () => {
  try {
    const response = await axios.get(API_VENTAS);
    return response.data;
  } catch (error) {
    console.error("Error al obtener ventas:", error);
    throw error;
  }
};

export const deleteVenta = async (id) => {
  try {
    const response = await axios.delete(`${API_VENTAS}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar venta:", error);
    throw error;
  }
};
