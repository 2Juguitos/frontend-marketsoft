// src/Modules/Modulo1/Pages/ProductoForm.jsx
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { createProducto } from '../services/productoService';
import { getCategorias } from '../services/categoriaService'; // Asegúrate de que este servicio exista
import { getAdministradores } from '../services/administradorService';
import { useNavigate } from 'react-router-dom';

const ProductoForm = () => {
  const navigate = useNavigate();
  const [marcaProd, setMarcaProd] = useState('');
  const [nombreProd, setNombreProd] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [adminId, setAdminId] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [administradores, setAdministradores] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Cargar categorías y administradores
  useEffect(() => {
    getCategorias()
      .then((data) => setCategorias(data))
      .catch((err) => console.error("Error al cargar categorías:", err));
    getAdministradores()
      .then((data) => setAdministradores(data))
      .catch((err) => console.error("Error al cargar administradores:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construir el objeto de solicitud
    const productoData = {
      marcaProd,
      nombreProd,
      categoria: { idCategoria: Number(categoriaId) },
      administrador: { idAdmin: Number(adminId) }
    };

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await createProducto(productoData);
      setMessage("Producto creado exitosamente");
      setError('');
      // Limpiar campos del formulario
      setMarcaProd('');
      setNombreProd('');
      setCategoriaId('');
      setAdminId('');
      
      navigate('/productos');
    } catch (err) {
      console.error("Error al crear producto:", err);
      setError("Error al crear producto");
      setMessage('');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Crear Producto</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Marca</Form.Label>
          <Form.Control
            type="text"
            value={marcaProd}
            onChange={(e) => setMarcaProd(e.target.value)}
            placeholder="Ingrese la marca del producto"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={nombreProd}
            onChange={(e) => setNombreProd(e.target.value)}
            placeholder="Ingrese el nombre del producto"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Select
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            required
          >
            <option value="">Seleccione una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.idCategoria} value={cat.idCategoria}>
                {cat.nombreCategoria}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Administrador</Form.Label>
          <Form.Select
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
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
          Crear Producto
        </Button>
      </Form>
    </Container>
  );
};

export default ProductoForm;
