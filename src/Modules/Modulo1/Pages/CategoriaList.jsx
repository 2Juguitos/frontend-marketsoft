// src/Modules/Modulo1/Pages/CategoriaList.jsx
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getCategorias, updateCategoria, deleteCategoria } from '../services/categoriaService';
import { Container, Table, Alert, Spinner, Button, Modal, Form } from 'react-bootstrap';

const CategoriaList = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Estados para el modal de edición
  const [showModal, setShowModal] = useState(false);
  const [currentCategoria, setCurrentCategoria] = useState(null);
  const [editNombre, setEditNombre] = useState('');
  const [editFechaRegistro, setEditFechaRegistro] = useState('');

  // Cargar categorías
  const loadCategorias = () => {
    getCategorias()
      .then(data => {
        setCategorias(data);
        setLoading(false);
      })
      .catch(err => {
        setError('No se pudieron cargar las categorías');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCategorias();
  }, []);

  // Manejar eliminación
  const handleDelete = async (id) => {
    try {
      await deleteCategoria(id);
      setCategorias(prev => prev.filter(cat => cat.idCategoria !== id));
      setSuccess("Registro eliminado exitosamente");
      setError(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError("Error al eliminar la categoría");
      setSuccess(null);
    }
  };

  // Abrir modal de edición
  const handleEdit = (categoria) => {
    setCurrentCategoria(categoria);
    setEditNombre(categoria.nombreCategoria);
    // Suponiendo que 'fechaRegistroCategoria' viene en formato ISO (o similar) y se puede convertir a "YYYY-MM-DD"
    setEditFechaRegistro(new Date(categoria.fechaRegistroCategoria).toISOString().slice(0, 10));
    setShowModal(true);
  };

  // Enviar actualización
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      nombreCategoria: editNombre,
      fechaRegistroCategoria: editFechaRegistro,
    };

    try {
      const updated = await updateCategoria(currentCategoria.idCategoria, updatedData);
      setCategorias(prev => prev.map(cat => (cat.idCategoria === updated.idCategoria ? updated : cat)));
      setSuccess("Categoría actualizada exitosamente");
      setError(null);
      setShowModal(false);
      setCurrentCategoria(null);
      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError("Error al actualizar la categoría");
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
      <h1>Lista de Categorías</h1>
      <Link to="/crear-categoria">
        <Button variant="primary" className="mb-3">Agregar Categoría</Button>
      </Link>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Fecha Registro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map(cat => (
            <tr key={cat.idCategoria}>
              <td>{cat.idCategoria}</td>
              <td>{cat.nombreCategoria}</td>
              <td>{cat.fechaRegistroCategoria}</td>
              <td>
                <Button variant="warning" className="me-2" onClick={() => handleEdit(cat)}>
                  Editar
                </Button>
                <Button variant="danger" onClick={() => handleDelete(cat.idCategoria)}>
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal de edición */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Categoría</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubmit}>
            <Form.Group controlId="editNombre">
              <Form.Label>Nombre de la Categoría</Form.Label>
              <Form.Control 
                type="text"
                value={editNombre}
                onChange={(e) => setEditNombre(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="editFechaRegistro" className="mt-2">
              <Form.Label>Fecha de Registro</Form.Label>
              <Form.Control 
                type="date"
                value={editFechaRegistro}
                onChange={(e) => setEditFechaRegistro(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-3">
              Actualizar Categoría
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CategoriaList;

