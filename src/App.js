import React, { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Clientes from "./pages/Clientes";
import Personas from "./pages/Personas.jsx";
import Mesas from "./pages/Mesa";
import Productos from "./pages/Productos.jsx";
import Promociones from "./pages/Promociones.jsx";
import Pedidos from "./pages/Pedidos.jsx";
import Categorias from "./pages/Categoria.jsx";
import DetallePedidos from "./pages/DetallePedidos.jsx";
import Login from "./pages/Login";
import AcercaDe from "./pages/AcercaDe.jsx";
import Footer from "./components/Footer";
import ReporteVentas from './components/ReporteVentas'; 
import Usuarioa from "./pages/Usuarios.jsx";
import { AuthContext } from "./context/AuthContext";
import { jwtDecode } from "jwt-decode";
import "bootstrap/dist/css/bootstrap.min.css";
import ReporteIngresos from "./components/ReporteIngresos.jsx";

const App = () => {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded);
        } else {
          localStorage.removeItem("token");
        }
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, [setUser]);

  return (
    <>
      {user && <Navbar />}
      <div className="container mt-3">
        <Routes>
          <Route
            path="/"
            element={user ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/clientes"
            element={user ? <Clientes /> : <Navigate to="/login" />}
          />
          <Route
            path="/personas"
            element={user ? <Personas /> : <Navigate to="/login" />}
          />
          <Route
            path="/mesas"
            element={user ? <Mesas /> : <Navigate to="/login" />}
          />
          <Route
            path="/productos"
            element={user ? <Productos /> : <Navigate to="/login" />}
          />
          <Route
            path="/promociones"
            element={user ? <Promociones /> : <Navigate to="/login" />}
          />
          <Route
            path="/pedidos"
            element={user ? <Pedidos /> : <Navigate to="/login" />}
          />
          <Route
            path="/categorias"
            element={user ? <Categorias /> : <Navigate to="/login" />}
          />
          <Route
            path="/detallepedidos"
            element={user ? <DetallePedidos/> : <Navigate to="/login" />}
          />
          <Route
            path="/reporteventas"
            element={user ? <ReporteVentas/> : <Navigate to="/login" />}
          />
          <Route
            path="/reporteingresos"
            element={user ? <ReporteIngresos/> : <Navigate to="/login" />}
          />
          <Route
            path="/usuarios"
            element={user ? <Usuarioa/> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route path="/acercade" element={<AcercaDe />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;  