// src/Modules/Modulo1/Pages/VentaForm.jsx
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { postVenta } from '../services/ventaService';
import { getProductos } from '../services/productoService';
import { useNavigate } from 'react-router-dom';

const VentaForm = () => {
  const navigate = useNavigate();
  
  // Estados para los campos del formulario
  const [descuento, setDescuento] = useState(0);
  const [fechaVenta, setFechaVenta] = useState('');
  const [idCliente, setIdCliente] = useState(''); // Este campo es opcional (nullable)
  const [idAdmin, setIdAdmin] = useState('');
  const [productoVentas, setProductoVentas] = useState([
    { cantidad: 0, idProducto: '' }
  ]);
  const [productos, setProductos] = useState([]); // Lista de productos para el select
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Cargar productos al iniciar el componente
  useEffect(() => {
    getProductos()
      .then((data) => {
        setProductos(data);
      })
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  // Agregar un producto a la lista
  const handleAddProduct = () => {
    setProductoVentas([...productoVentas, { cantidad: 0, idProducto: '' }]);
  };

  // Manejo de cambios en los productos
  const handleProductChange = (index, field, value) => {
    const newProducts = [...productoVentas];
    newProducts[index][field] = value;
    setProductoVentas(newProducts);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construir el JSON según el formato esperado.
    // idCliente es opcional, se envía null si está vacío.
    const ventaRequest = {
      descuento: Number(descuento),
      fechaVenta, // Se espera una cadena ISO (ej: "2025-02-17T00:00:00.000+00:00")
      idCliente: idCliente ? { idCliente: Number(idCliente) } : null,
      idAdmin: { idAdmin: Number(idAdmin) },
      productoVentas: productoVentas.map((prod) => ({
        cantidad: Number(prod.cantidad),
        producto: { idProducto: Number(prod.idProducto) }
      }))
    };

    try {
      const response = await postVenta(ventaRequest);
      setMessage("Venta creada exitosamente");
      setError('');
      console.log("Venta creada:", response);
      // Redirige a la lista de ventas
      navigate('/ventas-productoventa');
    } catch (err) {
      console.error("Error al crear venta", err);
      setError("Error al crear venta");
      setMessage('');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Crear Venta</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Descuento</Form.Label>
          <Form.Control
            type="number"
            value={descuento}
            onChange={(e) => setDescuento(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fecha Venta</Form.Label>
          <Form.Control
            type="datetime-local"
            value={fechaVenta}
            onChange={(e) => setFechaVenta(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>ID Cliente (opcional)</Form.Label>
          <Form.Control
            type="number"
            placeholder="Dejar vacío si no aplica"
            value={idCliente}
            onChange={(e) => setIdCliente(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>ID Administrador</Form.Label>
          <Form.Control
            type="number"
            value={idAdmin}
            onChange={(e) => setIdAdmin(e.target.value)}
          />
        </Form.Group>

        <h4>Productos de la Venta</h4>
        {productoVentas.map((prod, index) => (
          <div key={index} className="mb-3 border p-3">
            <Form.Group className="mb-2">
              <Form.Label>Cantidad</Form.Label>
              <Form.Control
                type="number"
                value={prod.cantidad}
                onChange={(e) =>
                  handleProductChange(index, 'cantidad', e.target.value)
                }
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Producto</Form.Label>
              <Form.Select
                value={prod.idProducto}
                onChange={(e) =>
                  handleProductChange(index, 'idProducto', e.target.value)
                }
              >
                <option value="">Seleccione un producto</option>
                {productos.map((p) => (
                  <option key={p.idProducto} value={p.idProducto}>
                    {p.nombreProd} - {p.marcaProd}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </div>
        ))}
        <Button variant="secondary" onClick={handleAddProduct}>
          Agregar Producto
        </Button>

        <div className="mt-3">
          <Button variant="primary" type="submit">
            Crear Venta
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default VentaForm;
