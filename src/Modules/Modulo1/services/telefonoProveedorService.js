import axios from "axios";

const API_URL = "http://localhost:8082/api/telefonosprov"; // Ajusta la URL según tu backend

const telefonoProveedorService = {
    getAllTelefonos: async () => {
        try {
          const response = await axios.get(API_URL);
          console.log("Respuesta de telefonos:", response.data); // Log de verificación
          return response.data;
        } catch (error) {
          console.error("Error al obtener teléfonos de proveedores", error);
          return [];
        }
      },

  // Obtener teléfono por ID
  getTelefonoById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener el teléfono con ID: ${id}`, error);
      return null;
    }
  },

  // Crear un teléfono nuevo
  createTelefono: async (telefono) => {
    try {
      const response = await axios.post(API_URL, telefono);
      return response.data;
    } catch (error) {
      console.error("Error al crear teléfono de proveedor", error);
      return null;
    }
  },

  // Actualizar un teléfono existente
  updateTelefono: async (id, telefono) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, telefono);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar el teléfono con ID: ${id}`, error);
      return null;
    }
  },

  // Eliminar un teléfono
  deleteTelefono: async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return true;
    } catch (error) {
      console.error(`Error al eliminar el teléfono con ID: ${id}`, error);
      return false;
    }
  },

  // Obtener teléfonos por proveedor
  getTelefonosByProveedor: async (idProveedor) => {
    try {
      const response = await axios.get(`${API_URL}/proveedor/${idProveedor}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener teléfonos del proveedor con ID: ${idProveedor}`, error);
      return [];
    }
  },
};

export default telefonoProveedorService;
