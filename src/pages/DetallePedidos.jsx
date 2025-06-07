import React, { useEffect, useState } from "react";
import {
  obtenerDetallesPedidos,
  agregarDetallePedido,
  actualizarDetallePedido,
  eliminarDetallePedido,
} from "../services/detallePedidoService";
import DetallePedidoList from "../components/detallesPedidos/DetallePedidoList";
import DetallePedidoForm from "../components/detallesPedidos/DetallePedidoForm";
import { Button } from "react-bootstrap";

const DetallePedidos = () => {
  const [detalles, setDetalles] = useState([]);
  const [detalleSeleccionado, setDetalleSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    cargarDetalles();
  }, []);

  const cargarDetalles = async () => {
    const datos = await obtenerDetallesPedidos();
    setDetalles(datos);
  };

  const agregar = async (detalle) => {
    await agregarDetallePedido(detalle);
    cargarDetalles();
    setMostrarModal(false);
  };

  const actualizar = async (id, detalle) => {
    await actualizarDetallePedido(id, detalle);
    cargarDetalles();
    setDetalleSeleccionado(null);
    setMostrarModal(false);
  };

  const eliminar = async (id) => {
    await eliminarDetallePedido(id);
    cargarDetalles();
  };

  const seleccionarDetalle = (detalle) => {
    setDetalleSeleccionado(detalle);
    setMostrarModal(true);
  };

  return (
    <div>
      <h2>Gestión de Detalles de Pedido</h2>
      <Button
        className="mb-3"
        variant="primary"
        onClick={() => {
          setDetalleSeleccionado(null);
          setMostrarModal(true);
        }}
      >
        Agregar Detalle
      </Button>
      <DetallePedidoList detalles={detalles} seleccionar={seleccionarDetalle} eliminar={eliminar} />
      <DetallePedidoForm
        show={mostrarModal}
        handleClose={() => setMostrarModal(false)}
        agregar={agregar}
        actualizar={actualizar}
        detalleSeleccionado={detalleSeleccionado}
      />
    </div>
  );
};

export default DetallePedidos;
