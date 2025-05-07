import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const PromocionForm = ({ show, handleClose, agregar, actualizar, promocionSeleccionada }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [descuento, setDescuento] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (promocionSeleccionada) {
      setNombre(promocionSeleccionada.Nombre || "");
      setDescripcion(promocionSeleccionada.Descripcion || "");
      setDescuento(promocionSeleccionada.Descuento || "");
      setFechaInicio(promocionSeleccionada.Fecha_Inicio?.slice(0, 10) || "");
      setFechaFin(promocionSeleccionada.Fecha_Fin?.slice(0, 10) || "");
    } else {
      setNombre("");
      setDescripcion("");
      setDescuento("");
      setFechaInicio("");
      setFechaFin("");
    }
    setErrores({});
  }, [promocionSeleccionada]);

  const validar = () => {
    const nuevosErrores = {};
    if (!nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!descripcion.trim()) nuevosErrores.descripcion = "La descripción es obligatoria";
    if (descuento === "" || isNaN(descuento) || descuento < 0)
      nuevosErrores.descuento = "El descuento debe ser un número positivo";
    if (fechaFin && new Date(fechaFin) < new Date(fechaInicio))
      nuevosErrores.fechaFin = "La fecha de fin no puede ser anterior a la fecha de inicio";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;

  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!validar()) {
      Swal.fire("Campos inválidos", "Por favor revisa los datos ingresados", "error");
      return;
    }

    const nuevaPromocion = {
      nombre,
      descripcion,
      descuento,
      fecha_inicio: fechaInicio,
      fecha_fin: fechaFin,

    };

    if (promocionSeleccionada) {
      actualizar(promocionSeleccionada.PromocionID, nuevaPromocion);
    } else {
      agregar(nuevaPromocion);
    }

    setNombre("");
    setDescripcion("");
    setDescuento("");
    setFechaInicio("");
    setFechaFin("");
    setErrores({});
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{promocionSeleccionada ? "Editar Promoción" : "Agregar Promoción"}</Modal.Title>
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
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              isInvalid={!!errores.descripcion}
            />
            <Form.Control.Feedback type="invalid">{errores.descripcion}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descuento (%)</Form.Label>
            <Form.Control
              type="number"
              value={descuento}
              onChange={(e) => setDescuento(e.target.value)}
              isInvalid={!!errores.descuento}
            />
            <Form.Control.Feedback type="invalid">{errores.descuento}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha de Inicio</Form.Label>
            <Form.Control
              type="date"
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Fecha de Fin</Form.Label>
            <Form.Control
              type="date"
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              isInvalid={!!errores.fechaFin}
            />
            <Form.Control.Feedback type="invalid">{errores.fechaFin}</Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            {promocionSeleccionada ? "Actualizar" : "Agregar"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PromocionForm;
