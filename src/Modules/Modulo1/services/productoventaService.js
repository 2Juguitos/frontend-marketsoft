// src/Modules/Modulo1/services/productoventaService.js
import axios from 'axios';

const API_PRODUCTOVENTA = 'http://localhost:8082/api/productoventa';

export const getProductoVentas = async () => {
  try {
    const response = await axios.get(API_PRODUCTOVENTA);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los detalles de venta:", error);
    throw error;
  }
};
