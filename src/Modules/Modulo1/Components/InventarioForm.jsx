// src/Modules/Modulo1/components/InventarioForm.jsx
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { createInventario } from '../services/inventarioService';
import { getProductos } from '../services/productoService'; // Servicio para obtener productos
import { getAdministradores } from '../services/administradorService'; // Servicio para obtener administradores

const InventarioForm = () => {
  // Estados para los campos del formulario
  const [precio, setPrecio] = useState('');
  const [stock, setStock] = useState('');
  const [fechaRegistro, setFechaRegistro] = useState('');
  const [productoDisponible, setProductoDisponible] = useState(false);

  // Estados para los dropdowns
  const [productoId, setProductoId] = useState('');
  const [administradorId, setAdministradorId] = useState('');
  const [productos, setProductos] = useState([]);
  const [administradores, setAdministradores] = useState([]);

  // Estados para mensajes de error y éxito
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Obtener la lista de productos y administradores al cargar el componente
  useEffect(() => {
    getProductos()
      .then(data => setProductos(data))
      .catch(err => console.error('Error al obtener productos:', err));
      
    getAdministradores()
      .then(data => setAdministradores(data))
      .catch(err => console.error('Error al obtener administradores:', err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que se hayan seleccionado valores para ambos dropdowns
    if (!productoId || !administradorId) {
      setError('Debe seleccionar un producto y un administrador.');
      return;
    }

    // Construir el objeto de inventario, asegurándose de que las claves coincidan con la entidad
    const inventarioData = {
      precio: parseFloat(precio),
      stock: parseInt(stock, 10),
      fechaRegistro, // Se espera en formato "YYYY-MM-DD"
      productoDisponible,
      producto: { idProducto: parseInt(productoId, 10) },
      // La entidad Administrador utiliza la propiedad idAdmin
      administrador: { idAdmin: parseInt(administradorId, 10) },
    };

    try {
      await createInventario(inventarioData);
      setSuccess('Inventario ingresado exitosamente');
      setError(null);
      // Reiniciar los campos del formulario
      setPrecio('');
      setStock('');
      setFechaRegistro('');
      setProductoDisponible(false);
      setProductoId('');
      setAdministradorId('');
    } catch (err) {
      setError('Error al crear inventario');
      setSuccess(null);
    }
  };

  return (
    <Container className="mt-4">
      <h1>Crear Inventario</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="precio">
          <Form.Label>Precio</Form.Label>
          <Form.Control 
            type="number" 
            step="0.01" 
            placeholder="Ingrese el precio" 
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required 
          />
        </Form.Group>
        <Form.Group controlId="stock" className="mt-2">
          <Form.Label>Stock</Form.Label>
          <Form.Control 
            type="number" 
            placeholder="Ingrese el stock" 
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required 
          />
        </Form.Group>
        <Form.Group controlId="fechaRegistro" className="mt-2">
          <Form.Label>Fecha de Registro</Form.Label>
          <Form.Control 
            type="date" 
            value={fechaRegistro}
            onChange={(e) => setFechaRegistro(e.target.value)}
            required 
          />
        </Form.Group>
        <Form.Group controlId="productoDisponible" className="mt-2">
          <Form.Check 
            type="checkbox"
            label="Producto Disponible"
            checked={productoDisponible}
            onChange={(e) => setProductoDisponible(e.target.checked)}
          />
        </Form.Group>
        <Form.Group controlId="producto" className="mt-2">
          <Form.Label>Producto</Form.Label>
          <Form.Control 
            as="select"
            value={productoId}
            onChange={(e) => setProductoId(e.target.value)}
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
        <Form.Group controlId="administrador" className="mt-2">
          <Form.Label>Administrador</Form.Label>
          <Form.Control 
            as="select"
            value={administradorId}
            onChange={(e) => setAdministradorId(e.target.value)}
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
          Crear Inventario
        </Button>
      </Form>
    </Container>
  );
};

export default InventarioForm;
