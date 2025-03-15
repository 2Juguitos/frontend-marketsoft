// src/Modules/Modulo1/Pages/ProductoProveedorForm.jsx
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { createProductoProveedor } from '../services/productoproveedorService';
import { getProductos } from '../services/productoService';
import { getProveedores } from '../services/proveedorService';
import { useNavigate } from 'react-router-dom';

const ProductoProveedorForm = () => {
  const navigate = useNavigate();
  const [productoId, setProductoId] = useState('');
  const [proveedorId, setProveedorId] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precioUnitario, setPrecioUnitario] = useState('');
  const [productos, setProductos] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Cargar productos y proveedores al montar el componente
  useEffect(() => {
    getProductos()
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al cargar productos:", err));
    getProveedores()
      .then((data) => setProveedores(data))
      .catch((err) => console.error("Error al cargar proveedores:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const productoProveedorRequest = {
      id: {
        productoId: Number(productoId),
        proveedorId: Number(proveedorId)
      },
     
      producto: { idProducto: Number(productoId) },
      proveedor: { idProveedor: Number(proveedorId) },
      cantidad: Number(cantidad),
      precioUnitario: Number(precioUnitario)
    };

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await createProductoProveedor(productoProveedorRequest);
      setMessage("Producto-Proveedor creado exitosamente");
      setError('');
      
      setProductoId('');
      setProveedorId('');
      setCantidad('');
      setPrecioUnitario('');
      
     navigate('/proveedores');
    } catch (err) {
      console.error("Error al crear Producto-Proveedor:", err);
      setError("Error al crear Producto-Proveedor");
      setMessage('');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Crear Producto-Proveedor</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Producto</Form.Label>
          <Form.Select
            value={productoId}
            onChange={(e) => setProductoId(e.target.value)}
            required
          >
            <option value="">Seleccione un producto</option>
            {productos.map((prod) => (
              <option key={prod.idProducto} value={prod.idProducto}>
                {prod.nombreProd} - {prod.marcaProd}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Proveedor</Form.Label>
          <Form.Select
            value={proveedorId}
            onChange={(e) => setProveedorId(e.target.value)}
            required
          >
            <option value="">Seleccione un proveedor</option>
            {proveedores.map((prov) => (
              <option key={prov.idProveedor} value={prov.idProveedor}>
                {prov.nombreProv} {prov.apellidoProv}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Cantidad</Form.Label>
          <Form.Control
            type="number"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            placeholder="Ingrese la cantidad"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio Unitario</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            value={precioUnitario}
            onChange={(e) => setPrecioUnitario(e.target.value)}
            placeholder="Ingrese el precio unitario"
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Crear Producto-Proveedor
        </Button>
      </Form>
    </Container>
  );
};

export default ProductoProveedorForm;
