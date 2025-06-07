import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import '../style/usuario.css';

const UsuarioForm = ({ show, handleClose, agregar, actualizar, usuarioSeleccionado = [] }) => {
  const [personaID, setPersonaID] = useState("");
  const [personas, setPersonas] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rol, setRol] = useState("");
  const [errores, setErrores] = useState({});

    useEffect(() => {
      fetch("http://localhost:3000/api/v1/personas")
        .then((res) => res.json())
        .then((data) => setPersonas(data))
        .catch((err) => console.error("Error al obtener personas:", err));
    }, []);

  useEffect(() => {
    if (usuarioSeleccionado) {
      setPersonaID(usuarioSeleccionado.PersonaID || "");
      setEmail(usuarioSeleccionado.email || "");
      setRol(usuarioSeleccionado.rol || "");
      setPassword("");
    } else {
      setPersonaID("");
      setEmail("");
      setPassword("");
      setRol("");
    }
    setErrores({});
  }, [usuarioSeleccionado]);

  const validar = () => {
    const nuevosErrores = {};
    if (!personaID) nuevosErrores.personaID = "Debe seleccionar una persona";
    if (!email.trim()) nuevosErrores.email = "El email es obligatorio";
    if (!usuarioSeleccionado && !password.trim()) nuevosErrores.password = "La contraseña es obligatoria";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!validar()) {
      Swal.fire("Campos inválidos", "Por favor revisa los datos ingresados", "error");
      return;
    }

    const nuevoUsuario = {
      PersonaID: personaID,
      email,
      rol,
    };

    if (!usuarioSeleccionado) {
      nuevoUsuario.password = password;
      agregar(nuevoUsuario);
    } else {
      actualizar(usuarioSeleccionado.id, nuevoUsuario);
    }

    setPersonaID("");
    setEmail("");
    setPassword("");
    setRol("");
    setErrores({});
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{usuarioSeleccionado ? "Editar Usuario" : "Agregar Usuario"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={manejarEnvio}>
          <Form.Group className="mb-3">
            <Form.Label>Persona</Form.Label>
            <Form.Select
              value={personaID}
              onChange={(e) => setPersonaID(e.target.value)}
              isInvalid={!!errores.personaID}
            >
              <option value="">Seleccione una persona</option>
              {Array.isArray(personas) &&
                personas.map((p) => (
                  <option key={p.PersonaID} value={p.PersonaID}>
                    {p.Nombre}
                  </option>
                ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errores.personaID}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={!!errores.email}
            />
            <Form.Control.Feedback type="invalid">{errores.email}</Form.Control.Feedback>
          </Form.Group>

          {!usuarioSeleccionado && (
            <Form.Group className="mb-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={!!errores.password}
              />
              <Form.Control.Feedback type="invalid">{errores.password}</Form.Control.Feedback>
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Rol</Form.Label>
            <Form.Select value={rol} onChange={(e) => setRol(e.target.value)}>
              <option value="cliente">Seleccione el rol</option>
              <option value="admin">Administrador</option>
              <option value="mesero">Mesero</option>
              <option value="cajero">Cajero</option>
            </Form.Select>
          </Form.Group>

          <Button variant="primary" type="submit">
            {usuarioSeleccionado ? "Actualizar" : "Agregar"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default UsuarioForm;
