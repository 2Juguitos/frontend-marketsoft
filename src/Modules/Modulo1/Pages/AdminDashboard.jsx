// src/pages/AdminDashboard.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/Authcontext";






const AdminDashboard = () => {
  const { logout, user } = useContext(AuthContext);

  return (
    <div>
      <h2>Panel de Administrador</h2>
      <p>Bienvenido, {user.username}</p>
      <nav>
        <ul>
          <li><Link to="/productos">Lista de Productos</Link></li>
          <li><Link to="/ventas-productoventa">Ventas</Link></li>
          <li><Link to="/inventarios">Inventarios</Link></li>
          <li><Link to="/proveedores">Proveedores</Link></li>
          {/* Agregare más enlaces segun funcionalidades */}
        </ul>
      </nav>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};

export default AdminDashboard;
