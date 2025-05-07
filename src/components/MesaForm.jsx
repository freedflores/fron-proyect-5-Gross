import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const MesaForm = ({ show, handleClose, agregar, actualizar, mesaSeleccionada }) => {
  const [form, setForm] = useState({
    NumeroMesa: "",
    Capacidad: "",
    Ubicacion: "",
    Estado: ""
  });
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (mesaSeleccionada) {
      setForm({ ...mesaSeleccionada });
    } else {
      setForm({
        NumeroMesa: "",
        Capacidad: "",
        Ubicacion: "",
        Estado: ""
      });
    }
    setErrores({});
  }, [mesaSeleccionada]);

  const validar = () => {
    const nuevosErrores = {};
    if (!form.NumeroMesa || isNaN(form.NumeroMesa)) nuevosErrores.NumeroMesa = "Número inválido";
    if (!form.Capacidad || isNaN(form.Capacidad)) nuevosErrores.Capacidad = "Capacidad inválida";
    if (!form.Estado.trim()) nuevosErrores.Estado = "El estado es obligatorio";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarCambio = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!validar()) {
      Swal.fire("Campos inválidos", "Por favor revisa los datos ingresados", "error");
      return;
    }

    if (mesaSeleccionada) {
      actualizar(mesaSeleccionada.MesaID, form);
    } else {
      agregar(form);
    }

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{mesaSeleccionada ? "Editar Mesa" : "Agregar Mesa"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={manejarEnvio}>
          <Form.Group className="mb-3">
            <Form.Label>Número de Mesa</Form.Label>
            <Form.Control
              type="number"
              name="NumeroMesa"
              value={form.NumeroMesa}
              onChange={manejarCambio}
              isInvalid={!!errores.NumeroMesa}
            />
            <Form.Control.Feedback type="invalid">{errores.NumeroMesa}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Capacidad</Form.Label>
            <Form.Control
              type="number"
              name="Capacidad"
              value={form.Capacidad}
              onChange={manejarCambio}
              isInvalid={!!errores.Capacidad}
            />
            <Form.Control.Feedback type="invalid">{errores.Capacidad}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ubicación</Form.Label>
            <Form.Control
              type="text"
              name="Ubicacion"
              value={form.Ubicacion}
              onChange={manejarCambio}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Control
              type="text"
              name="Estado"
              value={form.Estado}
              onChange={manejarCambio}
              isInvalid={!!errores.Estado}
            />
            <Form.Control.Feedback type="invalid">{errores.Estado}</Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            {mesaSeleccionada ? "Actualizar" : "Agregar"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MesaForm;
