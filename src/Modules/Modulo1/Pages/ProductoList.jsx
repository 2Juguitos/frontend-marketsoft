// src/Modules/Modulo1/Pages/ProductoList.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Container, Table, Alert, Spinner, Button, Modal, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getProductos, updateProducto, deleteProducto } from '../services/productoService';
import { getCategorias } from '../services/categoriaService';
import { getAdministradores } from '../services/administradorService';
import { AuthContext } from '../../../context/Authcontext'; // Ajusta la ruta según corresponda

const ProductoList = () => {
  const { user } = useContext(AuthContext);
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [administradores, setAdministradores] = useState([]);
  const [adminMap, setAdminMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  // Estados para el modal de edición de producto
  const [showEditModal, setShowEditModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [editForm, setEditForm] = useState({
    marcaProd: "",
    nombreProd: "",
    categoriaId: "",
    idAdmin: ""
  });

  // Cargar productos
  useEffect(() => {
    getProductos()
      .then(data => {
        setProductos(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar productos:', err);
        setError('No se pudieron cargar los productos.');
        setLoading(false);
      });
  }, []);

  // Cargar categorías
  useEffect(() => {
    getCategorias()
      .then(data => setCategorias(data))
      .catch(err => console.error("Error al cargar categorías:", err));
  }, []);

  // Cargar administradores y construir el mapa (idAdmin -> nombreAdmin)
  useEffect(() => {
    getAdministradores()
      .then(data => {
        setAdministradores(data);
        const map = {};
        data.forEach(admin => {
          map[admin.idAdmin] = admin.nombreAdmin;
        });
        setAdminMap(map);
      })
      .catch(err => console.error("Error al cargar administradores:", err));
  }, []);

  const openEditModal = (prod) => {
    setProductToEdit(prod);
    setEditForm({
      marcaProd: prod.marcaProd,
      nombreProd: prod.nombreProd,
      categoriaId: prod.categoria ? prod.categoria.idCategoria : "",
      idAdmin: prod.administrador
                ? (typeof prod.administrador === 'object'
                    ? prod.administrador.idAdmin
                    : prod.administrador)
                : ""
    });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setProductToEdit(null);
  };

  const handleEditChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        marcaProd: editForm.marcaProd,
        nombreProd: editForm.nombreProd,
        categoria: { idCategoria: Number(editForm.categoriaId) },
        administrador: { idAdmin: Number(editForm.idAdmin) }
      };
      const updatedProduct = await updateProducto(productToEdit.idProducto, updatedData);
      setProductos(productos.map(prod =>
        prod.idProducto === productToEdit.idProducto ? updatedProduct : prod
      ));
      setMessage("Producto actualizado exitosamente");
      closeEditModal();
    } catch (error) {
      console.error("Error al actualizar producto", error);
      setError("Error al actualizar producto");
    }
  };

  const handleDeleteProduct = async (idProducto) => {
    try {
      await deleteProducto(idProducto);
      setProductos(productos.filter(prod => prod.idProducto !== idProducto));
      setMessage("Producto eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar producto", error);
      setError("Error al eliminar producto");
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
      <h1>Lista de Productos</h1>
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
      
      {/* Botón para crear un nuevo producto, solo para administrador */}
      {user && user.rol === "ADMIN" ? (
        <Link to="/productos/create">
          <Button variant="primary" className="mb-3">
            Agregar Producto
          </Button>
        </Link>
      ) : (
        <p>Para agregar productos, inicia sesión como administrador.</p>
      )}
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Marca</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Administrador</th>
            {user && user.rol === "ADMIN" && <th>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {productos.map(prod => (
            <tr key={prod.idProducto}>
              <td>{prod.idProducto}</td>
              <td>{prod.marcaProd}</td>
              <td>{prod.nombreProd}</td>
              <td>{prod.categoria ? prod.categoria.nombreCategoria : 'N/A'}</td>
              <td>{prod.administrador?.nombreAdmin || adminMap[prod.administrador] || 'N/A'}</td>
              {user && user.rol === "ADMIN" && (
                <td>
                  <Button variant="warning" size="sm" className="me-2" onClick={() => openEditModal(prod)}>
                    Editar
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteProduct(prod.idProducto)}>
                    Eliminar
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      
      {/* Modal para editar producto */}
      <Modal show={showEditModal} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                name="marcaProd"
                value={editForm.marcaProd}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombreProd"
                value={editForm.nombreProd}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Select
                name="categoriaId"
                value={editForm.categoriaId}
                onChange={handleEditChange}
                required
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map(cat => (
                  <option key={cat.idCategoria} value={cat.idCategoria}>
                    {cat.nombreCategoria}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Administrador</Form.Label>
              <Form.Select
                name="idAdmin"
                value={editForm.idAdmin}
                onChange={handleEditChange}
                required
              >
                <option value="">Seleccione un administrador</option>
                {administradores.map(admin => (
                  <option key={admin.idAdmin} value={admin.idAdmin}>
                    {admin.nombreAdmin}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
              Guardar Cambios
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProductoList;
