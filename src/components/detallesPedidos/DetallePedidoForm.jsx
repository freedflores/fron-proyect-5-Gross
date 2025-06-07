import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import '../../style/detallePedido.css';

const DetallePedidoForm = ({ show, handleClose, agregar, actualizar, detalleSeleccionado }) => {
  const [pedidoID, setPedidoID] = useState("");
  const [productoID, setProductoID] = useState("");
  const [productos, setProductos] = useState([]);
  const [cantidad, setCantidad] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState("");
  const [total, setTotal] = useState("");
  const [errores, setErrores] = useState({});

  // Traer productos al cargar el componente
  useEffect(() => {
    fetch("http://localhost:3000/api/v1/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .catch((err) => console.error("Error al obtener productos:", err));
  }, []);

  useEffect(() => {
    if (detalleSeleccionado) {
      setPedidoID(detalleSeleccionado.PedidoID || "");
      setProductoID(detalleSeleccionado.ProductoID || "");
      setCantidad(detalleSeleccionado.Cantidad || "");
      setPrecioUnitario(detalleSeleccionado.PrecioUnitario || "");
      setTotal(detalleSeleccionado.Total || "");
    } else {
      setPedidoID("");
      setProductoID("");
      setCantidad("");
      setPrecioUnitario("");
      setTotal("");
    }
    setErrores({});
  }, [detalleSeleccionado]);

  const validar = () => {
    const nuevosErrores = {};
    if (!pedidoID) nuevosErrores.pedidoID = "PedidoID es obligatorio";
    if (!productoID) nuevosErrores.productoID = "ProductoID es obligatorio";
    if (!cantidad || isNaN(cantidad) || cantidad <= 0) nuevosErrores.cantidad = "Cantidad inválida";
    if (!precioUnitario || isNaN(precioUnitario) || precioUnitario <= 0) nuevosErrores.precioUnitario = "Precio inválido";
    if (!total || isNaN(total) || total <= 0) nuevosErrores.total = "Total inválido";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!validar()) {
      Swal.fire("Campos inválidos", "Por favor revisa los datos ingresados", "error");
      return;
    }

    const nuevoDetalle = {
      pedidoID,
      productoID,
      cantidad,
      precioUnitario,
      total,
    };

    if (detalleSeleccionado) {
      actualizar(detalleSeleccionado.DetallePedidoID, nuevoDetalle);
    } else {
      agregar(nuevoDetalle);
    }

    setPedidoID("");
    setProductoID("");
    setCantidad("");
    setPrecioUnitario("");
    setTotal("");
    setErrores({});
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{detalleSeleccionado ? "Editar Detalle de Pedido" : "Agregar Detalle de Pedido"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={manejarEnvio}>
          <Form.Group className="mb-3">
            <Form.Label>Pedido ID</Form.Label>
            <Form.Control
              type="number"
              value={pedidoID}
              onChange={(e) => setPedidoID(e.target.value)}
              isInvalid={!!errores.pedidoID}
            />
            <Form.Control.Feedback type="invalid">{errores.pedidoID}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Producto</Form.Label>
            <Form.Select
              value={productoID}
              onChange={(e) => setProductoID(e.target.value)}
              isInvalid={!!errores.productoID}
            >
              <option value="">Seleccione un producto</option>
              {productos.map((prod) => (
                <option key={prod.ProductoID} value={prod.ProductoID}>
                  {prod.Nombre}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errores.productoID}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Cantidad</Form.Label>
            <Form.Control
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              isInvalid={!!errores.cantidad}
            />
            <Form.Control.Feedback type="invalid">{errores.cantidad}</Form.Control.Feedback>
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
            <Form.Control.Feedback type="invalid">{errores.precioUnitario}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Total</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              isInvalid={!!errores.total}
            />
            <Form.Control.Feedback type="invalid">{errores.total}</Form.Control.Feedback>
          </Form.Group>

          <Button variant="primary" type="submit">
            {detalleSeleccionado ? "Actualizar" : "Agregar"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DetallePedidoForm;
