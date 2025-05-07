import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const ClienteForm = ({show, handleClose, agregar, actualizar, clienteSeleccionado }) => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [fechaRegistro, setFechaRegistro] = useState("");
  const [direccion, setDireccion] = useState("");
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (clienteSeleccionado) {
      setNombre(clienteSeleccionado.Nombre || "");
      setEmail(clienteSeleccionado.Email || "");
      setTelefono(clienteSeleccionado.Telefono || "");
      setFechaRegistro(clienteSeleccionado.FechaRegistro?.slice(0, 10) || "");
      setDireccion(clienteSeleccionado.Direccion || "");
    } else {
      setNombre("");
      setEmail("");
      setTelefono("");
      setFechaRegistro("");
      setDireccion("");
    }
    setErrores({});
  }, [clienteSeleccionado]);

  const validar = () => {
    const nuevosErrores = {};
    if (!nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    if (email && !email.includes("@")) nuevosErrores.email = "Email inválido";
    if (telefono && isNaN(telefono)) nuevosErrores.telefono = "Teléfono inválido";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!validar()) {
      Swal.fire("Campos inválidos", "Por favor revisa los datos ingresados", "error");
      return;
    }

    const nuevoCliente = {
      nombre,
      email,
      telefono,
      fechaRegistro,
      direccion,
    };

    if (clienteSeleccionado) {
      actualizar(clienteSeleccionado.ClienteID, nuevoCliente);
    } else {
      agregar(nuevoCliente);
    }

    setNombre("");
    setEmail("");
    setTelefono("");
    setFechaRegistro("");
    setDireccion("");
    setErrores({});
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{clienteSeleccionado ? "Editar Cliente" : "Agregar Cliente"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={manejarEnvio}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              isInvalid={!!errores.nombre}
            />
            <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
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

          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              isInvalid={!!errores.telefono}
            />
            <Form.Control.Feedback type="invalid">{errores.telefono}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha de Registro</Form.Label>
            <Form.Control
              type="date"
              value={fechaRegistro}
              onChange={(e) => setFechaRegistro(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {clienteSeleccionado ? "Actualizar" : "Agregar"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ClienteForm;
