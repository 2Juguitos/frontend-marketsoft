// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginAdmin from "./Modules/Modulo1/Pages/LoginAdmin.jsx";
import AdminDashboard from "./Modules/Modulo1/Pages/AdminDashboard.jsx";
import ProductoList from "./Modules/Modulo1/Pages/ProductoList";
import ProductoForm from "./Modules/Modulo1/Components/ProductoForm";
import CategoriaList from "./Modules/Modulo1/Pages/CategoriaList";
import InventarioList from "./Modules/Modulo1/Pages/InventarioList";
import ProveedorList from "./Modules/Modulo1/Pages/ProveedorList";
import VentaProductoVentaList from "./Modules/Modulo1/Pages/ProductoVentaVentaList";
import ProveedorForm from "./Modules/Modulo1/Components/ProveedorForm.jsx";
import ProductoProveedorForm from "./Modules/Modulo1/Components/productoProveedorForm.jsx";
import NavBarGlobal from "./Modules/Modulo1/Components/NavBarGlobal";
import { AuthProvider } from "./context/Authcontext";
import PrivateRoute from "./Routes/PrivateRoute";
import Home from "./Modules/Modulo1/Pages/Home.jsx"; 

function App() {
  return (
    
    <AuthProvider>
      <Router>
        <NavBarGlobal />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginAdmin />} />
          <Route path="/productos" element={<ProductoList />} />
          
          <Route element={<PrivateRoute />}>
            <Route path="/ventas-productoventa" element={<VentaProductoVentaList />} />
            <Route path="/proveedores" element={<ProveedorList />} />
            <Route path="/categorias" element={<CategoriaList />} />
            <Route path="/inventarios" element={<InventarioList />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/productos/create" element={<ProductoForm />} />
            <Route path="/proveedores/create" element={<ProveedorForm />} />
            <Route path="/producto-proveedor/create" element={<ProductoProveedorForm />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
