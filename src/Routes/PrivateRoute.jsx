// src/routes/PrivateRoute.jsx
import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);

  // Solo permite acceso si el usuario está autenticado y es ADMIN
  return user && user.rol === "ADMIN" ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
