import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const DetallePedidoForm = ({ show, handleClose, agregar, actualizar, detalleSeleccionado }) => {
  const [pedidoID, setPedidoID] = useState("");
  const [productoID, setProductoID] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [errores, setErrores] = useState({});

  useEffect(() => {
    if (detalleSeleccionado) {
      setPedidoID(detalleSeleccionado.PedidoID || "");
      setProductoID(detalleSeleccionado.ProductoID || "");
      setCantidad(detalleSeleccionado.Cantidad || "");
      setPrecioUnitario(detalleSeleccionado.PrecioUnitario || "");
      setComentarios(detalleSeleccionado.Comentarios || "");
    } else {
      setPedidoID("");
      setProductoID("");
      setCantidad("");
      setPrecioUnitario("");
      setComentarios("");
    }
    setErrores({});
  }, [detalleSeleccionado]);

  const calcularSubtotal = () => {
    return parseFloat(cantidad || 0) * parseFloat(precioUnitario || 0);
  };

  const validar = () => {
    const nuevosErrores = {};
    if (!pedidoID) nuevosErrores.pedidoID = "PedidoID requerido";
    if (!productoID) nuevosErrores.productoID = "ProductoID requerido";
    if (!cantidad || isNaN(cantidad)) nuevosErrores.cantidad = "Cantidad inválida";
    if (!precioUnitario || isNaN(precioUnitario)) nuevosErrores.precioUnitario = "Precio inválido";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!validar()) return;

    const nuevoDetalle = {
      DetalleID: detalleSeleccionado?.DetalleID,
      PedidoID: pedidoID,
      ProductoID: productoID,
      Cantidad: parseInt(cantidad),
      PrecioUnitario: parseFloat(precioUnitario),
      Subtotal: calcularSubtotal(),
      Comentarios: comentarios,
    };

    if (detalleSeleccionado) {
      actualizar(detalleSeleccionado.DetalleID, nuevoDetalle);
    } else {
      agregar(nuevoDetalle);
    }

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{detalleSeleccionado ? "Editar Detalle" : "Agregar Detalle"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={manejarEnvio}>
          <Form.Group className="mb-3">
            <Form.Label>PedidoID</Form.Label>
            <Form.Control
              type="number"
              value={pedidoID}
              onChange={(e) => setPedidoID(e.target.value)}
              isInvalid={!!errores.pedidoID}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>ProductoID</Form.Label>
            <Form.Control
              type="number"
              value={productoID}
              onChange={(e) => setProductoID(e.target.value)}
              isInvalid={!!errores.productoID}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              isInvalid={!!errores.cantidad}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio Unitario</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={precioUnitario}
              onChange={(e) => setPrecioUnitario(e.target.value)}
              isInvalid={!!errores.precioUnitario}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Comentarios</Form.Label>
            <Form.Control
              as="textarea"
              value={comentarios}
              onChange={(e) => setComentarios(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary">
            {detalleSeleccionado ? "Actualizar" : "Agregar"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DetallePedidoForm;
