// src/pages/LoginAdmin.jsx
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/Authcontext";
import { loginAdmin } from "../../../Api/Auth";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";

const LoginAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginAdmin(username, password);
      login(data.token, { username, rol: "ADMIN" });
      navigate("/admin/dashboard");
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <Container className="d-flex align-items-center justify-content-center min-vh-100">
      <Row className="w-100">
        <Col xs={12} sm={10} md={8} lg={5} className="mx-auto">
          <Card className="p-4 shadow">
            <Card.Body>
              <Card.Title className="mb-4 text-center">
                Iniciar Sesión - Administrador
              </Card.Title>
              {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label>Usuario</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Ingrese su usuario"
                    required
                  />
                </Form.Group>
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ingrese su contraseña"
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Ingresar
                </Button>
              </Form>
              <div className="text-center mt-3">
                <Button variant="link" onClick={goToHome}>
                  Volver a Home
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginAdmin;
