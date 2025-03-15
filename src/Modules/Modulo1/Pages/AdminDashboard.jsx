// src/pages/AdminDashboard.jsx
import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Table, Button, Spinner, Alert } from "react-bootstrap";
import { AuthContext } from "../../../context/Authcontext";
import { getAdministradores } from "../services/administradorService";

const AdminDashboard = () => {
  const { logout, user } = useContext(AuthContext);
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
        console.error("Error al cargar administradores:", err);
        setError("No se pudieron cargar los administradores");
        setLoading(false);
      });
  }, []);

  return (
    <Container className="mt-4">
      {/* Encabezado del Dashboard */}
      <Row className="mb-4 align-items-center">
        <Col>
          <h2>Panel de Administrador</h2>
          <p>Bienvenido, {user.username}</p>
        </Col>
        <Col className="text-end">
          <Button variant="outline-danger" onClick={logout}>
            Cerrar sesión
          </Button>
        </Col>
      </Row>

      {/* Sección de la lista de administradores */}
      <Row>
        <Col>
          <h3>Lista de Administradores</h3>
          {loading ? (
            <Spinner animation="border" role="status" className="mt-3">
              <span className="visually-hidden">Cargando...</span>
            </Spinner>
          ) : error ? (
            <Alert variant="danger" className="mt-3">
              {error}
            </Alert>
          ) : (
            <Table striped bordered hover className="mt-3">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Usuario</th>
                  <th>Rol</th>
                </tr>
              </thead>
              <tbody>
                {administradores.map((admin) => (
                  <tr key={admin.idAdmin}>
                    <td>{admin.idAdmin}</td>
                    <td>{admin.nombreAdmin}</td>
                    <td>{admin.username}</td>
                    <td>{admin.rol}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
