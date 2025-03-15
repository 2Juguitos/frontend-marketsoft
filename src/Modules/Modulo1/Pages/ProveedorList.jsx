// src/Modules/Modulo1/Pages/ProveedorList.jsx
import React, { useState, useEffect } from 'react';
import { Container, Table, Alert, Spinner, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getProveedores, deleteProveedor, updateProveedor } from '../services/proveedorService';
import { getProductoProveedores, deleteProductoProveedor } from '../services/productoproveedorService';
import { getAdministradores } from '../services/administradorService';

const ProveedorList = () => {
  const [proveedores, setProveedores] = useState([]);
  const [productoProveedores, setProductoProveedores] = useState([]);
  const [administradores, setAdministradores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  
  // Estados para el modal de edición de Proveedor
  const [showEditModal, setShowEditModal] = useState(false);
  const [proveedorToEdit, setProveedorToEdit] = useState(null);
  const [editForm, setEditForm] = useState({
    correoProveedor: "",
    empresaProv: "",
    nombreProv: "",
    apellidoProv: "",
    idAdmin: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener proveedores
        const proveedoresData = await getProveedores();
        console.log("proveedoresData:", proveedoresData);
        setProveedores(proveedoresData);
      } catch (err) {
        console.error("Error al cargar proveedores:", err);
        setError("Error al cargar proveedores.");
      }
      
      try {
        // Obtener registros de Producto-Proveedor
        const productoProveedoresData = await getProductoProveedores();
        setProductoProveedores(productoProveedoresData);
      } catch (err) {
        console.error("Error al cargar producto-proveedores:", err);
        // Opcional: setError("Error al cargar las relaciones de producto-proveedor.");
      }
      
      setLoading(false);
    };
    
    fetchData();
  }, []);

  // Cargar administradores para el select en el modal de Proveedor
  useEffect(() => {
    getAdministradores()
      .then((data) => {
        setAdministradores(data);
      })
      .catch((err) => console.error("Error al cargar administradores:", err));
  }, []);

  // Funciones para Proveedor
  const handleDelete = async (idProveedor) => {
    try {
      await deleteProveedor(idProveedor);
      setProveedores(proveedores.filter((prov) => prov.idProveedor !== idProveedor));
      setMessage("Proveedor y sus relaciones eliminados exitosamente");
    } catch (error) {
      console.error('Error al eliminar proveedor:', error);
      setError("Error al eliminar proveedor");
    }
  };

  const openEditModal = (prov) => {
    setProveedorToEdit(prov);
    setEditForm({
      correoProveedor: prov.correoProveedor,
      empresaProv: prov.empresaProv,
      nombreProv: prov.nombreProv,
      apellidoProv: prov.apellidoProv,
      idAdmin: prov.administrador?.idAdmin || ""
    });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setProveedorToEdit(null);
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        correoProveedor: editForm.correoProveedor,
        empresaProv: editForm.empresaProv,
        nombreProv: editForm.nombreProv,
        apellidoProv: editForm.apellidoProv,
        administrador: { idAdmin: Number(editForm.idAdmin) }
      };
      const updatedProveedor = await updateProveedor(proveedorToEdit.idProveedor, updatedData);
      setProveedores(proveedores.map((prov) =>
        prov.idProveedor === proveedorToEdit.idProveedor ? updatedProveedor : prov
      ));
      setMessage("Proveedor editado exitosamente");
      closeEditModal();
    } catch (error) {
      console.error("Error al actualizar proveedor", error);
      setError("Error al actualizar proveedor");
    }
  };

  // Para Producto-Proveedor solo dejamos eliminar la relación
  const handleDeletePP = async (productoId, proveedorId) => {
    try {
      await deleteProductoProveedor(productoId, proveedorId);
      setProductoProveedores(productoProveedores.filter((pp) => {
        return !(pp.id.productoId === productoId && pp.id.proveedorId === proveedorId);
      }));
      setMessage("Producto-Proveedor eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar Producto-Proveedor", error);
      setError("Error al eliminar Producto-Proveedor");
    }
  };

  if (loading) {
    return (
      <Container className="mt-4">
        <Spinner animation="border" role="status" />
        <span className="ms-2">Cargando...</span>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1>Lista de Proveedores</h1>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      
      {/* Botón para crear un nuevo proveedor */}
      <Link to="/proveedores/create">
        <Button variant="primary" className="mb-3">
          Crear Proveedor
        </Button>
      </Link>
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID Proveedor</th>
            <th>Correo</th>
            <th>Empresa</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Administrador</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((prov) => (
            <tr key={prov.idProveedor}>
              <td>{prov.idProveedor}</td>
              <td>{prov.correoProveedor}</td>
              <td>{prov.empresaProv}</td>
              <td>{prov.nombreProv}</td>
              <td>{prov.apellidoProv}</td>
              <td>
                {prov.administrador && typeof prov.administrador === 'object'
                  ? prov.administrador.nombreAdmin
                  : prov.administrador}
              </td>
              <td>
                <Button variant="warning" size="sm" className="me-2" onClick={() => openEditModal(prov)}>
                  Editar
                </Button>
                <Button variant="danger" size="sm" onClick={() => handleDelete(prov.idProveedor)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Sección de Producto-Proveedor */}
      <h1 className="mt-4">Registros de proveedor</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Producto ID</th>
            <th>Proveedor ID</th>
            <th>Producto</th>
            <th>Proveedor</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productoProveedores.map((pp, index) => (
            <tr key={index}>
              <td>{pp.id?.productoId ?? 'N/A'}</td>
              <td>{pp.id?.proveedorId ?? 'N/A'}</td>
              <td>
                {pp.producto
                  ? `${pp.producto.nombreProd} - ${pp.producto.marcaProd}`
                  : 'N/A'}
              </td>
              <td>
                {pp.proveedor
                  ? `${pp.proveedor.nombreProv} ${pp.proveedor.apellidoProv}`
                  : 'N/A'}
              </td>
              <td>{pp.cantidad ?? 'N/A'}</td>
              <td>{pp.precioUnitario ?? 'N/A'}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDeletePP(pp.id.productoId, pp.id.proveedorId)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      {/* Botón para crear un nuevo registro de Producto-Proveedor */}
      <Link to="/producto-proveedor/create">
        <Button variant="primary" className="mt-3">
          Registros de proveedor
        </Button>
      </Link>

      {/* Modal para editar proveedor */}
      <Modal show={showEditModal} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Proveedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                type="email"
                name="correoProveedor"
                value={editForm.correoProveedor}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Empresa</Form.Label>
              <Form.Control
                type="text"
                name="empresaProv"
                value={editForm.empresaProv}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombreProv"
                value={editForm.nombreProv}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellidoProv"
                value={editForm.apellidoProv}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Administrador</Form.Label>
              <Form.Select
                name="idAdmin"
                value={editForm.idAdmin}
                onChange={handleEditChange}
                required
              >
                <option value="">Seleccione un administrador</option>
                {administradores.map((admin) => (
                  <option key={admin.idAdmin} value={admin.idAdmin}>
                    {admin.nombreAdmin}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProveedorList;
