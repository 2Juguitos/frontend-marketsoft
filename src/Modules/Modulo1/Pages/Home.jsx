// src/pages/Home.jsx
import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PhotoCarousel from "../Components/PhotoCarousel";

const Home = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-column align-items-center">
      <Container className="my-5">
        <Row className="justify-content-center">
          <Col md={10} className="text-center">
            <h1 className="display-4 mb-4">Bienvenido a Marketsoft</h1>
            <p className="lead mb-5">
              Explora nuestras funcionalidades y gestiona tus productos y ventas de forma sencilla.
            </p>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={8}>
            {/* Aquí se muestra el carrusel de fotos */}
            <PhotoCarousel />
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Administrador</Card.Title>
                <Card.Text>
                  Accede a tu panel administrativo para gestionar productos, ventas, inventarios y más.
                </Card.Text>
                <Button as={Link} to="/login" variant="primary" className="w-100">
                  Iniciar Sesión
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="mb-4 shadow-sm">
              <Card.Body>
                <Card.Title>Productos</Card.Title>
                <Card.Text>
                  Visualiza nuestro catálogo de productos y descubre nuestras ofertas.
                </Card.Text>
                <Button as={Link} to="/productos" variant="secondary" className="w-100">
                  Ver Productos
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
