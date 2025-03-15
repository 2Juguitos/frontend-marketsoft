import axios from 'axios';

const API_PROVEEDORES = 'http://localhost:8082/api/proveedores';

export const getProveedores = async () => {
  try {
    const response = await axios.get(API_PROVEEDORES);
    return response.data;
  } catch (error) {
    console.error("Error al obtener proveedores:", error);
    throw error;
  }
};

export const createProveedor = async (proveedorData) => {
  try {
    const response = await axios.post(API_PROVEEDORES, proveedorData);
    return response.data;
  } catch (error) {
    console.error("Error al crear proveedor:", error);
    throw error;
  }
};

export const updateProveedor = async (id, proveedorData) => {
  try {
    const response = await axios.put(`${API_PROVEEDORES}/${id}`, proveedorData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar proveedor:", error);
    throw error;
  }
};

export const deleteProveedor = async (id) => {
  try {
    const response = await axios.delete(`${API_PROVEEDORES}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar proveedor:", error);
    throw error;
  }
};
