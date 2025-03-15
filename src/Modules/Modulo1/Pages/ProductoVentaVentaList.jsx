// src/Modules/Modulo1/Pages/VentaProductoVentaList.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Container, Table, Alert, Spinner, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getVentas, deleteVenta } from '../services/ventaService';
import { getProductoVentas } from '../services/productoventaService';
import { AuthContext } from "../../../context/Authcontext"; // Ajusta la ruta si es necesario

const VentaProductoVentaList = () => {
  const [ventas, setVentas] = useState([]);
  const [productoVentas, setProductoVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  // Obtenemos el usuario autenticado (si existe)
  const { user } = useContext(AuthContext);

  useEffect(() => {
    Promise.all([getVentas(), getProductoVentas()])
      .then(([ventasData, productoVentasData]) => {
        setVentas(ventasData);
        setProductoVentas(productoVentasData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Error al cargar los datos');
        setLoading(false);
      });
  }, []);

  const handleDelete = async (idVenta) => {
    try {
      await deleteVenta(idVenta);
      setVentas(ventas.filter((venta) => venta.idventa !== idVenta));
      setMessage("Venta y detalle eliminado exitosamente");
    } catch (error) {
      console.error('Error al eliminar la venta:', error);
      setError("Error al eliminar la venta");
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
      <h1>Lista de Ventas</h1>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      {/* Botón para crear una nueva venta: se muestra si hay usuario autenticado (cliente o admin) */}
      {user ? (
        <Link to="/ventas/create">
          <Button variant="primary" className="mb-3">
            Crear Venta
          </Button>
        </Link>
      ) : (
        <p>Para crear ventas, inicia sesión.</p>
      )}

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID Venta</th>
            <th>Precio Venta</th>
            <th>Descuento</th>
            <th>IVA</th>
            <th>Total Final</th>
            <th>Fecha Venta</th>
            <th>ID Cliente</th>
            <th>ID Administrador</th>
            {/* Se muestra columna de acciones solo para administradores */}
            {user && user.rol === "ADMIN" && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta) => (
            <tr key={venta.idventa}>
              <td>{venta.idventa}</td>
              <td>{venta.precioVenta}</td>
              <td>{venta.descuento}</td>
              <td>{venta.iva}</td>
              <td>{venta.totalFinal}</td>
              <td>{new Date(venta.fechaVenta).toLocaleDateString()}</td>
              <td>{venta.cliente?.idCliente ?? 'N/A'}</td>
              <td>{venta.administrador?.idAdmin ?? 'N/A'}</td>
              {user && user.rol === "ADMIN" && (
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(venta.idventa)}>
                    Eliminar
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      <h1 className="mt-4">Detalles de venta</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Precio Unitario</th>
            <th>Cantidad</th>
            <th>Producto</th>
            <th>ID Venta</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {productoVentas.map((pv) => (
            <tr key={pv.idProductoVenta ?? `pv-row-${Math.random()}`}>
              <td>{pv?.idProductoVenta ?? 'N/A'}</td>
              <td>{pv?.precioUnitario ?? 'N/A'}</td>
              <td>{pv?.cantidad ?? 'N/A'}</td>
              <td>
                {typeof pv === 'object'
                  ? (typeof pv.producto === 'object'
                      ? `${pv.producto.marcaProd} - ${pv.producto.nombreProd}`
                      : typeof pv.producto === 'number'
                      ? pv.producto
                      : 'N/A')
                  : 'N/A'}
              </td>
              <td>
                {typeof pv === 'object'
                  ? (typeof pv.venta === 'object'
                      ? pv.venta.idventa
                      : typeof pv.venta === 'number'
                      ? pv.venta
                      : 'N/A')
                  : 'N/A'}
              </td>
              <td>{pv?.subTotal ?? 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default VentaProductoVentaList;

