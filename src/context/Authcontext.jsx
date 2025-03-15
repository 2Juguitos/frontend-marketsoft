// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Se inicializa con el token almacenado en localStorage (si existe)
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      // Aquí podrías decodificar el token o hacer una petición para obtener datos del usuario.
      // Por simplicidad, asignamos un objeto usuario con rol ADMIN.
      setUser({ username: "adminUser", rol: "ADMIN" });
    } else {
      setUser(null);
    }
  }, [token]);

  const login = (tokenReceived, userData) => {
    localStorage.setItem("token", tokenReceived);
    setToken(tokenReceived);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
