// src/Modules/Modulo1/components/CategoriaForm.jsx
import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { createCategoria } from '../services/categoriaService';

const CategoriaForm = () => {
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [fechaRegistroCategoria, setFechaRegistroCategoria] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoriaData = {
      nombreCategoria,
      fechaRegistroCategoria, // Se espera formato "YYYY-MM-DD"
    };

    try {
      await createCategoria(categoriaData);
      setSuccess('Categoría creada exitosamente');
      setError(null);
      setNombreCategoria('');
      setFechaRegistroCategoria('');
    } catch (err) {
      setError('Error al crear la categoría');
      setSuccess(null);
    }
  };

  return (
    <Container className="mt-4">
      <h1>Crear Categoría</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="nombreCategoria">
          <Form.Label>Nombre de la Categoría</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el nombre de la categoría"
            value={nombreCategoria}
            onChange={(e) => setNombreCategoria(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="fechaRegistroCategoria" className="mt-2">
          <Form.Label>Fecha de Registro</Form.Label>
          <Form.Control
            type="date"
            value={fechaRegistroCategoria}
            onChange={(e) => setFechaRegistroCategoria(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Crear Categoría
        </Button>
      </Form>
    </Container>
  );
};

export default CategoriaForm;
