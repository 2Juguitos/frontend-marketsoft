import axios from 'axios';
const API_PRODUCTOPROVEEDOR = 'http://localhost:8082/api/producto_proveedor';

export const getProductoProveedores = async () => {
  try {
    const response = await axios.get(API_PRODUCTOPROVEEDOR);
    return response.data;
  } catch (error) {
    console.error("Error al obtener producto proveedor:", error);
    throw error;
  }
};

export const createProductoProveedor = async (productoProveedorData) => {
  try {
    const response = await axios.post(API_PRODUCTOPROVEEDOR, productoProveedorData);
    return response.data;
  } catch (error) {
    console.error("Error al crear producto proveedor:", error);
    throw error;
  }
};

export const updateProductoProveedor = async (productoId, proveedorId, productoProveedorData) => {
  try {
    const response = await axios.put(`${API_PRODUCTOPROVEEDOR}/${productoId}/${proveedorId}`, productoProveedorData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar producto proveedor:", error);
    throw error;
  }
};

export const deleteProductoProveedor = async (productoId, proveedorId) => {
  try {
    const response = await axios.delete(`${API_PRODUCTOPROVEEDOR}/${productoId}/${proveedorId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar producto proveedor:", error);
    throw error;
  }
};
