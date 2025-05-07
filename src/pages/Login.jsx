import React, { useState, useContext } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Form, Button, Alert, Card } from "react-bootstrap";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });

      const token = res.data.token;
      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      setUser(decoded);
      setMessage("¡Bienvenido al sistema!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      setMessage("Credenciales incorrectas");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      <Card style={{ width: "25rem", backgroundColor: "black", border: "3px solid white", color: "white" }}>
        <Card.Body>
          <Card.Title className="mb-4 text-center">
            <img
              src={require('../assets/massimo-logo.png')}
              alt="Logo"
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #fdfefe",
                marginBottom: "10px"
              }}
            />
            <br />
            <i className="bi bi-box-arrow-in-right me-2"></i>Iniciar Sesión
          </Card.Title>
          {message && <Alert variant="info">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label><img src={require('../assets/email-icon.png')} alt="Email Icon" style={{ width: "20px", height: "20px", marginRight: "8px", marginTop: "-4px" }} />Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label><img src={require('../assets/password-icon.png')} alt="Password Icon" style={{ width: "20px", height: "20px", marginRight: "8px", marginTop: "-8px" }} />Contraseña:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>
                {/* <img src={require('../assets/role-icon.png')} alt="Role Icon" style={{ width: "20px", height: "20px", marginRight: "8px", marginTop: "-4px" }} /> */}
                Rol:
              </Form.Label>
              <Form.Control
                as="select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="">Selecciona un rol</option>
                <option value="admin">Administrador</option>
                <option value="mesero">Mesero</option>
                <option value="cajero">Cajero</option>
              </Form.Control>
            </Form.Group>
            <Button variant="danger"
              type="submit"
              className="w-100"
              style={{ marginTop: "10px" }}>
              Ingresar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
