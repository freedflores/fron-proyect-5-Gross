import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import '../../style/pedido.css';

const PedidoForm = ({ show, handleClose, agregar, actualizar, pedidoSeleccionado }) => {
  const [clienteID, setClienteID] = useState("");
  const [clientes, setClientes] = useState([]);
  const [fechaPedido, setFechaPedido] = useState("");
  const [total, setTotal] = useState("");
  const [estado, setEstado] = useState("");
  const [tipoEntrega, setTipoEntrega] = useState("");
  const [direccionEntrega, setDireccionEntrega] = useState("");
  const [telefonoContacto, setTelefonoContacto] = useState("");
  const [errores, setErrores] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/clientes")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((err) => console.error("Error al obtener clientes:", err));
  }, []);

  useEffect(() => {
    if (pedidoSeleccionado) {
      setClienteID(pedidoSeleccionado.ClienteID || "");
      setFechaPedido(pedidoSeleccionado.FechaPedido?.slice(0, 10) || "");
      setTotal(pedidoSeleccionado.Total || "");
      setEstado(pedidoSeleccionado.Estado || "");
      setTipoEntrega(pedidoSeleccionado.TipoEntrega || "");
      setDireccionEntrega(pedidoSeleccionado.DireccionEntrega || "");
      setTelefonoContacto(pedidoSeleccionado.TelefonoContacto || "");
    } else {
      setClienteID("");
      setFechaPedido("");
      setTotal("");
      setEstado("");
      setTipoEntrega("");
      setDireccionEntrega("");
      setTelefonoContacto("");
    }
    setErrores({});
  }, [pedidoSeleccionado]);

  const validar = () => {
    const nuevosErrores = {};
    if (!clienteID) nuevosErrores.clienteID = "Cliente es obligatorio";
    if (!fechaPedido) nuevosErrores.fechaPedido = "Fecha de pedido es obligatoria";
    if (!total || isNaN(total)) nuevosErrores.total = "Total debe ser un número válido";
    if (!estado) nuevosErrores.estado = "Estado es obligatorio";
    if (!tipoEntrega) nuevosErrores.tipoEntrega = "Tipo de entrega es obligatorio";
    if (!direccionEntrega) nuevosErrores.direccionEntrega = "Dirección es obligatoria";
    if (!telefonoContacto || isNaN(telefonoContacto)) nuevosErrores.telefonoContacto = "Teléfono inválido";
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    if (!validar()) {
      Swal.fire("Campos inválidos", "Por favor revisa los datos ingresados", "error");
      return;
    }

    const nuevoPedido = {
      PedidoID: pedidoSeleccionado ? pedidoSeleccionado.PedidoID : undefined,
      ClienteID: clienteID,
      FechaPedido: fechaPedido,
      Total: parseFloat(total),
      Estado: estado,
      TipoEntrega: tipoEntrega,
      DireccionEntrega: direccionEntrega,
      TelefonoContacto: telefonoContacto,
    };

    if (pedidoSeleccionado) {
      actualizar(pedidoSeleccionado.PedidoID, nuevoPedido);
    } else {
      agregar(nuevoPedido);
    }

    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{pedidoSeleccionado ? "Editar Pedido" : "Agregar Pedido"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={manejarEnvio}>
          <Form.Group className="mb-3">
            <Form.Label>Cliente</Form.Label>
            <Form.Select
              value={clienteID}
              onChange={(e) => setClienteID(e.target.value)}
              isInvalid={!!errores.clienteID}
            >
              <option value="">Seleccione un cliente</option>
              {clientes.map((cliente) => (
                <option key={cliente.ClienteID} value={cliente.ClienteID}>
                  {cliente.Nombre}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errores.clienteID}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha de Pedido</Form.Label>
            <Form.Control
              type="date"
              value={fechaPedido}
              onChange={(e) => setFechaPedido(e.target.value)}
              isInvalid={!!errores.fechaPedido}
            />
            <Form.Control.Feedback type="invalid">{errores.fechaPedido}</Form.Control.Feedback>
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
          <Form.Group className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Control
              type="text"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              isInvalid={!!errores.estado}
            />
            <Form.Control.Feedback type="invalid">{errores.estado}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tipo de Entrega</Form.Label>
            <Form.Control
              type="text"
              value={tipoEntrega}
              onChange={(e) => setTipoEntrega(e.target.value)}
              isInvalid={!!errores.tipoEntrega}
            />
            <Form.Control.Feedback type="invalid">{errores.tipoEntrega}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              value={direccionEntrega}
              onChange={(e) => setDireccionEntrega(e.target.value)}
              isInvalid={!!errores.direccionEntrega}
            />
            <Form.Control.Feedback type="invalid">{errores.direccionEntrega}</Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              value={telefonoContacto}
              onChange={(e) => setTelefonoContacto(e.target.value)}
              isInvalid={!!errores.telefonoContacto}
            />
            <Form.Control.Feedback type="invalid">{errores.telefonoContacto}</Form.Control.Feedback>
          </Form.Group>
          <Button variant="primary" type="submit">
            {pedidoSeleccionado ? "Actualizar" : "Agregar"}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default PedidoForm;
