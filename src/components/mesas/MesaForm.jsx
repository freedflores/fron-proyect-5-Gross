import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const MesasForm = ({ show, handleClose, agregar, actualizar, mesaSeleccionada }) => {
  const [mesa, setMesa] = useState({
    NumeroMesa: "",
    Capacidad: "",
    Ubicacion: "",
    Estado: "",
  });
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (mesaSeleccionada) {
      setMesa({
        NumeroMesa: mesaSeleccionada.NumeroMesa || "",
        Capacidad: mesaSeleccionada.Capacidad || "",
        Ubicacion: mesaSeleccionada.Ubicacion || "",
        Estado: mesaSeleccionada.Estado || "",
      });
    } else {
      setMesa({
        NumeroMesa: "",
        Capacidad: "",
        Ubicacion: "",
        Estado: "",
      });
    }
    setErrores({});
  }, [mesaSeleccionada]);

  const validar = () => {
    const nuevosErrores = {};
    if (!mesa.NumeroMesa || isNaN(mesa.NumeroMesa) || mesa.NumeroMesa <= 0) {
      nuevosErrores.NumeroMesa = "El número de mesa debe ser válido y mayor que 0";
    }
    if (mesa.Capacidad && (isNaN(mesa.Capacidad) || mesa.Capacidad <= 0)) {
      nuevosErrores.Capacidad = "La capacidad debe ser un número válido y mayor que 0";
    }
    if (!mesa.Ubicacion) {
      nuevosErrores.Ubicacion = "Selecciona una ubicación.";
    }
    if (!mesa.Estado) {
      nuevosErrores.Estado = "Selecciona un estado.";
    }
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!validar()) {
      Swal.fire("Campos inválidos", "Por favor revisa los datos ingresados", "error");
      return;
    }

    const mesaAEnviar = {
      NumeroMesa: Number(mesa.NumeroMesa),
      Capacidad: mesa.Capacidad ? Number(mesa.Capacidad) : null,
      Ubicacion: mesa.Ubicacion,
      Estado: mesa.Estado,
    };

    if (mesaSeleccionada) {
      actualizar(mesaSeleccionada.id, mesaAEnviar);
    } else {
      agregar(mesaAEnviar);
    }

    setMesa({
      NumeroMesa: "",
      Capacidad: "",
      Ubicacion: "",
      Estado: "",
    });
    setErrores({});
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMesa((prevMesa) => ({
      ...prevMesa,
      [name]: value,
    }));
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
              value={mesa.NumeroMesa}
              onChange={handleChange}
              isInvalid={!!errores.NumeroMesa}
            />
            <Form.Control.Feedback type="invalid">{errores.NumeroMesa}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Capacidad</Form.Label>
            <Form.Control
              type="number"
              name="Capacidad"
              value={mesa.Capacidad}
              onChange={handleChange}
              isInvalid={!!errores.Capacidad}
            />
            <Form.Control.Feedback type="invalid">{errores.Capacidad}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Ubicación</Form.Label>
            <Form.Select
              name="Ubicacion"
              value={mesa.Ubicacion}
              onChange={handleChange}
              isInvalid={!!errores.Ubicacion}
            >
              <option value="">Seleccione una ubicación...</option>
              <option value="Interior">Interior</option>
              <option value="Exterior">Exterior</option>
              <option value="Terraza">Terraza</option>
              <option value="VIP">VIP</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errores.Ubicacion}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Select
              name="Estado"
              value={mesa.Estado}
              onChange={handleChange}
              isInvalid={!!errores.Estado}
            >
              <option value="">Seleccione un estado...</option>
              <option value="Disponible">Disponible</option>
              <option value="Ocupada">Ocupada</option>
              <option value="Reservada">Reservada</option>
              <option value="Mantenimiento">Mantenimiento</option>
            </Form.Select>
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

export default MesasForm;
