import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import '../../style/tabla.css';

const CategoriaForm = ({ show, handleClose, agregar, actualizar, categoriaSeleccionada }) => {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (categoriaSeleccionada) {
      setNombre(categoriaSeleccionada.Nombre || "");
      setDescripcion(categoriaSeleccionada.Descripcion || "");
    } else {
      setNombre("");
      setDescripcion("");
    }
    setErrores({});
  }, [categoriaSeleccionada]);

  const validar = () => {
    const nuevosErrores = {};
    if (!nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!validar()) {
      Swal.fire("Campos inválidos", "Por favor revisa los datos ingresados", "error");
      return;
    }

    const nuevaCategoria = {
      nombre,
      descripcion,
    };

    if (categoriaSeleccionada) {
      actualizar(categoriaSeleccionada.CategoriaID, nuevaCategoria);
    } else {
      agregar(nuevaCategoria);
    }

    setNombre("");
    setDescripcion("");
    setErrores({});
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{categoriaSeleccionada ? "Editar Categoría" : "Agregar Categoría"}</Modal.Title>
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
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {categoriaSeleccionada ? "Actualizar" : "Agregar"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CategoriaForm;
