// src/Modules/Modulo1/Pages/InventarioList.jsx
import React, { useEffect, useState } from 'react';
import { getInventarios, deleteInventario, updateInventario } from '../services/inventarioService';
import { getProductos } from '../services/productoService';
import { getAdministradores } from '../services/administradorService';
import { Link } from 'react-router-dom';
import { Container, Table, Alert, Spinner, Button, Modal, Form } from 'react-bootstrap';

const InventarioList = () => {
  const [inventarios, setInventarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Estados para el modal de edición
  const [showModal, setShowModal] = useState(false);
  const [currentInventario, setCurrentInventario] = useState(null);
  
  // Estados para el formulario de actualización
  const [updatePrecio, setUpdatePrecio] = useState('');
  const [updateStock, setUpdateStock] = useState('');
  const [updateFechaRegistro, setUpdateFechaRegistro] = useState('');
  const [updateProductoDisponible, setUpdateProductoDisponible] = useState(false);
  const [updateProductoId, setUpdateProductoId] = useState('');
  const [updateAdministradorId, setUpdateAdministradorId] = useState('');

  // Listas para dropdowns en el modal de edición
  const [productos, setProductos] = useState([]);
  const [administradores, setAdministradores] = useState([]);

  // Función para cargar inventarios
  const loadInventarios = () => {
    getInventarios()
      .then(data => {
        setInventarios(data);
        setLoading(false);
      })
      .catch(err => {
        setError('No se pudieron cargar los inventarios');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadInventarios();
    // Cargar dropdowns para el modal de edición
    getProductos()
      .then(data => setProductos(data))
      .catch(err => console.error('Error al obtener productos:', err));
    getAdministradores()
      .then(data => setAdministradores(data))
      .catch(err => console.error('Error al obtener administradores:', err));
  }, []);

  // Función para eliminar un inventario
  const handleDelete = async (id) => {
    try {
      await deleteInventario(id);
      setInventarios(prev => prev.filter(inv => inv.id !== id));
      setSuccess("Registro eliminado exitosamente");
      setError(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (error) {
      setError('Error al eliminar el inventario');
    }
  };

  // Abrir modal para editar un inventario
  const handleEdit = (inventario) => {
    setCurrentInventario(inventario);
    setUpdatePrecio(inventario.precio);
    setUpdateStock(inventario.stock);
    setUpdateFechaRegistro(new Date(inventario.fechaRegistro).toISOString().slice(0, 10));
    setUpdateProductoDisponible(inventario.productoDisponible);
    setUpdateProductoId(inventario.producto ? inventario.producto.idProducto : '');
    setUpdateAdministradorId(inventario.administrador ? inventario.administrador.idAdmin : '');
    setShowModal(true);
  };

  // Enviar actualización
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const inventarioData = {
      precio: parseFloat(updatePrecio),
      stock: parseInt(updateStock, 10),
      fechaRegistro: updateFechaRegistro,
      productoDisponible: updateProductoDisponible,
      producto: { idProducto: parseInt(updateProductoId, 10) },
      administrador: { idAdmin: parseInt(updateAdministradorId, 10) },
    };

    try {
      const updated = await updateInventario(currentInventario.id, inventarioData);
      setInventarios(prev =>
        prev.map(inv => (inv.id === updated.id ? updated : inv))
      );
      setSuccess("Inventario actualizado exitosamente");
      setError(null);
      setShowModal(false);
      setCurrentInventario(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError("Error al actualizar el inventario");
      setSuccess(null);
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
      <h1>Lista de Inventarios</h1>
      <Link to="/crear-inventario">
        <Button variant="primary" className="mb-3">Crear Inventario</Button>
      </Link>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Fecha Registro</th>
            <th>Disponible</th>
            <th>Producto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {inventarios.map(inv => (
            <tr key={inv.id}>
              <td>{inv.id}</td>
              <td>{inv.precio}</td>
              <td>{inv.stock}</td>
              <td>{new Date(inv.fechaRegistro).toLocaleDateString()}</td>
              <td>{inv.productoDisponible ? 'Sí' : 'No'}</td>
              <td>
                {inv.producto ? `${inv.producto.marcaProd} - ${inv.producto.nombreProd}`: "N/A"}
                </td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => handleEdit(inv)}>
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(inv.id)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal de actualización */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Inventario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubmit}>
            <Form.Group controlId="updatePrecio">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={updatePrecio}
                onChange={(e) => setUpdatePrecio(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="updateStock" className="mt-2">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                value={updateStock}
                onChange={(e) => setUpdateStock(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="updateFechaRegistro" className="mt-2">
              <Form.Label>Fecha de Registro</Form.Label>
              <Form.Control
                type="date"
                value={updateFechaRegistro}
                onChange={(e) => setUpdateFechaRegistro(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="updateProductoDisponible" className="mt-2">
              <Form.Check
                type="checkbox"
                label="Producto Disponible"
                checked={updateProductoDisponible}
                onChange={(e) => setUpdateProductoDisponible(e.target.checked)}
              />
            </Form.Group>
            <Form.Group controlId="updateProducto" className="mt-2">
              <Form.Label>Producto</Form.Label>
              <Form.Control
                as="select"
                value={updateProductoId}
                onChange={(e) => setUpdateProductoId(e.target.value)}
                required
              >
                <option value="">Seleccione un producto</option>
                {productos.map(p => (
                  <option key={p.idProducto} value={p.idProducto}>
                    {p.nombreProd}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="updateAdministrador" className="mt-2">
              <Form.Label>Administrador</Form.Label>
              <Form.Control
                as="select"
                value={updateAdministradorId}
                onChange={(e) => setUpdateAdministradorId(e.target.value)}
                required
              >
                <option value="">Seleccione un administrador</option>
                {administradores.map(a => (
                  <option key={a.idAdmin} value={a.idAdmin}>
                    {a.nombreAdmin}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Actualizar Inventario
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default InventarioList;
