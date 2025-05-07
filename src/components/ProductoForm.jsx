import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const ProductoForm = ({ show, handleClose, agregar, actualizar, productoSeleccionado }) => {
  const [nombre, setNombre] = useState("");
  const [categoriaID, setCategoriaID] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (productoSeleccionado) {
      setNombre(productoSeleccionado.Nombre || "");
      setCategoriaID(productoSeleccionado.CategoriaID || "");
      setDescripcion(productoSeleccionado.Descripcion || "");
      setPrecio(productoSeleccionado.Precio || "");
    } else {
      setNombre("");
      setCategoriaID("");
      setDescripcion("");
      setPrecio("");
    }
    setErrores({});
  }, [productoSeleccionado]);

  const validar = () => {
    const nuevosErrores = {};
    if (!nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio";
    if (!categoriaID || isNaN(categoriaID)) nuevosErrores.categoriaID = "Categoría inválida";
    if (!precio || isNaN(precio)) nuevosErrores.precio = "Precio inválido";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!validar()) {
      Swal.fire("Campos inválidos", "Por favor revisa los datos ingresados", "error");
      return;
    }

    const nuevoProducto = {
      nombre,
      categoriaID,
      descripcion,
      precio,
    };

    if (productoSeleccionado) {
      actualizar(productoSeleccionado.ProductoID, nuevoProducto);
    } else {
      agregar(nuevoProducto);
    }

    setNombre("");
    setCategoriaID("");
    setDescripcion("");
    setPrecio("");
    setErrores({});
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{productoSeleccionado ? "Editar Producto" : "Agregar Producto"}</Modal.Title>
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
            <Form.Label>Categoría ID</Form.Label>
            <Form.Control
              type="number"
              value={categoriaID}
              onChange={(e) => setCategoriaID(e.target.value)}
              isInvalid={!!errores.categoriaID}
            />
            <Form.Control.Feedback type="invalid">{errores.categoriaID}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              isInvalid={!!errores.precio}
            />
            <Form.Control.Feedback type="invalid">{errores.precio}</Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            {productoSeleccionado ? "Actualizar" : "Agregar"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ProductoForm;
