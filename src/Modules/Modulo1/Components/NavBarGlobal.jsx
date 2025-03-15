// src/components/NavBarGlobal.jsx
import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/Authcontext';

const NavBarGlobal = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">MarketSoft</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Enlaces visibles para administradores autenticados */}
            {user && user.rol === "ADMIN" && (
              <>
                <Nav.Link as={Link} to="/admin/dashboard">Dashboard</Nav.Link>
                <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
                <Nav.Link as={Link} to="/ventas-productoventa">Ventas</Nav.Link>
                <Nav.Link as={Link} to="/proveedores">Proveedores</Nav.Link>
                <Nav.Link as={Link} to="/categorias">Categorías</Nav.Link>
                <Nav.Link as={Link} to="/inventarios">Inventarios</Nav.Link>
                <Nav.Link as={Link} to="/producto-proveedor/create">Registro Producto-Proveedor</Nav.Link>
              </>
            )}
          </Nav>
          {/* Mostrar botón de logout solo si está autenticado */}
          {user && user.rol === "ADMIN" && (
            <Button variant="outline-light" onClick={handleLogout}>Cerrar sesión</Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBarGlobal;
