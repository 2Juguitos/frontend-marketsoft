// src/Modules/Administradores/Pages/AdministradorList.jsx
import React, { useEffect, useState } from 'react';
import { Container, Table, Alert, Spinner } from 'react-bootstrap';
import { getAdministradores } from '../services/administradorService';

const AdministradorList = () => {
  const [administradores, setAdministradores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAdministradores()
      .then((data) => {
        setAdministradores(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('No se pudieron cargar los administradores');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Container className="mt-4">
        <Spinner animation="border" role="status" />
        <span className="ms-2">Cargando...</span>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h1>Lista de Administradores</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
          </tr>
        </thead>
        <tbody>
          {administradores.map((admin) => (
            <tr key={admin.idAdmin}>
              <td>{admin.idAdmin}</td>
              <td>{admin.nombreAdmin}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdministradorList;
