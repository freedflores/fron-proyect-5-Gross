import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import '../style/persona.css';

const PersonaForm = ({ show, handleClose, agregar, actualizar, personaSeleccionada }) => {
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const [cargo, setCargo] = useState("");
  const [fechaIngreso, setFechaIngreso] = useState("");
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (personaSeleccionada) {
      setNombre(personaSeleccionada.Nombre || "");
      setDni(personaSeleccionada.DNI || "");
      setNumeroTelefono(personaSeleccionada.Numero_Telefono || "");
      setCargo(personaSeleccionada.Cargo || "");
      setFechaIngreso(personaSeleccionada.Fecha_Ingreso?.slice(0, 10) || "");
    } else {
      setNombre("");
      setDni("");
      setNumeroTelefono("");
      setCargo("");
      setFechaIngreso("");
    }
    setErrores({});
  }, [personaSeleccionada]);

  const validar = () => {
    const nuevosErrores = {};
    if (!nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!dni.trim()) nuevosErrores.dni = "El DNI es obligatorio";
    if (dni && !/^\d{8,}$/g.test(dni)) nuevosErrores.dni = "DNI inválido (debe tener al menos 8 dígitos)";
    if (numeroTelefono && isNaN(numeroTelefono)) nuevosErrores.numeroTelefono = "Número de teléfono inválido";
    if (!cargo.trim()) nuevosErrores.cargo = "El cargo es obligatorio";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!validar()) {
      Swal.fire("Campos inválidos", "Por favor revisa los datos ingresados", "error");
      return;
    }

    const nuevaPersona = {
      nombre,
      dni,
      numero_telefono: numeroTelefono,
      cargo,
      fecha_ingreso: fechaIngreso,
    };

    if (personaSeleccionada) {
      actualizar(personaSeleccionada.PersonaID, nuevaPersona);
    } else {
      agregar(nuevaPersona);
    }

    // Limpiar formulario
    setNombre("");
    setDni("");
    setNumeroTelefono("");
    setCargo("");
    setFechaIngreso("");
    setErrores({});
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{personaSeleccionada ? "Editar Persona" : "Agregar Persona"}</Modal.Title>
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
            <Form.Label>DNI</Form.Label>
            <Form.Control
              type="text"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
              isInvalid={!!errores.dni}
            />
            <Form.Control.Feedback type="invalid">{errores.dni}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Número de Teléfono</Form.Label>
            <Form.Control
              type="text"
              value={numeroTelefono}
              onChange={(e) => setNumeroTelefono(e.target.value)}
              isInvalid={!!errores.numeroTelefono}
            />
            <Form.Control.Feedback type="invalid">{errores.numeroTelefono}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cargo</Form.Label>
            <Form.Control
              type="text"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              isInvalid={!!errores.cargo}
            />
            <Form.Control.Feedback type="invalid">{errores.cargo}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha de Ingreso</Form.Label>
            <Form.Control
              type="date"
              value={fechaIngreso}
              onChange={(e) => setFechaIngreso(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {personaSeleccionada ? "Actualizar" : "Agregar"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PersonaForm;
