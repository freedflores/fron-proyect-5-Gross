import React, { useContext } from "react";
import {
  Navbar as BsNavbar,
  Nav,
  Container,
  NavDropdown,
  Dropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const rol = user?.rol?.toLowerCase();
  const isAdmin = rol === "admin" || rol === "administrador";
  const isCajero = rol === "cajero";
  const isMesero = rol === "mesero";

  return (
    <BsNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BsNavbar.Brand as={Link} to="/">
          <img src={logo} alt="Logo" style={{ height: "30px" }} />
        </BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>

            {/* RECURSOS */}
            {(isAdmin || isCajero || isMesero) && (
              <NavDropdown title="Recursos" id="recursos-dropdown">
                <NavDropdown.Item as={Link} to="/clientes">Clientes</NavDropdown.Item>
                {(isAdmin || isMesero || isCajero) && (
                  <NavDropdown.Item as={Link} to="/mesas">Reservas</NavDropdown.Item>
                )}
                <NavDropdown.Item as={Link} to="/productos">Productos</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/promociones">Promociones</NavDropdown.Item>
                {isAdmin && (
                  <NavDropdown.Item as={Link} to="/categorias">Categorías</NavDropdown.Item>
                )}
              </NavDropdown>
            )}

            {/* GESTIÓN */}
            {(isAdmin || isCajero || isMesero) && (
              <NavDropdown title="Gestión" id="gestion-dropdown">
                <NavDropdown.Item as={Link} to="/pedidos">Pedidos</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/detallepedidos">Detalle Pedido</NavDropdown.Item>
                {isAdmin && (
                  <>
                    <NavDropdown.Item as={Link} to="/inventario">Inventario</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/personas">Personas</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/usuarios">gestionar user</NavDropdown.Item>
                  </>
                )}
              </NavDropdown>
            )}

            {/* INGRESOS */}
            {(isAdmin || isCajero) && (
              <NavDropdown title="Ingresos" id="ingresos-dropdown">
                <NavDropdown.Item as={Link} to="/ingresos/registrar">Registrar Ingreso</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/ingresos/historial">Historial de Ingresos</NavDropdown.Item>
              </NavDropdown>
            )}

            {/* SALIDAS */}
            {(isAdmin || isCajero) && (
              <NavDropdown title="Salidas" id="salidas-dropdown">
                <NavDropdown.Item as={Link} to="/salidas/registrar">Registrar Salida</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/salidas/historial">Historial de Salidas</NavDropdown.Item>
              </NavDropdown>
            )}

            {/* REPORTES */}
            {(isAdmin || isCajero) && (
              <NavDropdown title="Reportes" id="reportes-dropdown">
                <NavDropdown.Item as={Link} to="/reporteventas">Reporte de Ventas</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/reporteingresos">Reporte de Ingresos</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>

          {/* PERFIL DE USUARIO */}
          {user && (
            <Dropdown align="end">
              <Dropdown.Toggle variant="secondary" id="dropdown-user">
                <FaUserCircle size={20} className="me-2" />
                {user.name?.toUpperCase()}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/acercade">Acerca de Mi APP</Dropdown.Item>
                <Dropdown.Item onClick={() => alert("Funcionalidad aún no implementada")}>
                  Cambiar contraseña
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>Cerrar sesión</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;
