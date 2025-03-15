// src/Modules/Modulo1/Pages/ProveedorForm.jsx
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { createProveedor } from '../services/proveedorService';
import { getAdministradores } from '../services/administradorService';
import { useNavigate } from 'react-router-dom';

const ProveedorForm = () => {
  const navigate = useNavigate();

// Estados para los campos del formulario
  const [correoProveedor, setCorreoProveedor] = useState('');
  const [empresaProv, setEmpresaProv] = useState('');
  const [nombreProv, setNombreProv] = useState('');
  const [apellidoProv, setApellidoProv] = useState('');
  const [administradorId, setAdministradorId] = useState('');
  const [administradores, setAdministradores] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Cargar la lista de administradores
  useEffect(() => {
    getAdministradores()
      .then((data) => {
        setAdministradores(data);
      })
      .catch((err) => console.error("Error al cargar administradores:", err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construir el objeto de solicitud
    const proveedorRequest = {
      correoProveedor,
      empresaProv,
      nombreProv,
      apellidoProv,
      administrador: { idAdmin: Number(administradorId) }
    };

    try {
      const response = await createProveedor(proveedorRequest);
      setMessage("Proveedor creado exitosamente");
      setError('');
      console.log("Proveedor creado:", response);
      // Redirigir a la lista de proveedores, pasando un mensaje de éxito
      navigate('/proveedores', { state: { successMessage: "Proveedor creado exitosamente" } });
    } catch (err) {
      console.error("Error al crear proveedor", err);
      setError("Error al crear proveedor");
      setMessage('');
    }
  };

  return (
    <Container className="mt-4">
      <h2>Crear Proveedor</h2>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="email"
            value={correoProveedor}
            onChange={(e) => setCorreoProveedor(e.target.value)}
            placeholder="Ingrese el correo"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Empresa</Form.Label>
          <Form.Control
            type="text"
            value={empresaProv}
            onChange={(e) => setEmpresaProv(e.target.value)}
            placeholder="Ingrese la empresa"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={nombreProv}
            onChange={(e) => setNombreProv(e.target.value)}
            placeholder="Ingrese el nombre"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            value={apellidoProv}
            onChange={(e) => setApellidoProv(e.target.value)}
            placeholder="Ingrese el apellido"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Administrador</Form.Label>
          <Form.Select
            value={administradorId}
            onChange={(e) => setAdministradorId(e.target.value)}
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
          Crear Proveedor
        </Button>
      </Form>
    </Container>
  );
};

export default ProveedorForm;
