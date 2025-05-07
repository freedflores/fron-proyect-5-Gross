import React, { useEffect, useState } from "react";
import { obtenerPedidos, agregarPedido, actualizarPedido, eliminarPedido } from "../services/pedidoService";
import PedidoList from "../components/PedidoList";
import PedidoForm from "../components/PedidoForm";
import { Button } from "react-bootstrap";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    cargarPedidos();
  }, []);

  const cargarPedidos = async () => {
    const datos = await obtenerPedidos();
    setPedidos(datos);
  };

  const agregar = async (pedido) => {
    await agregarPedido(pedido);
    cargarPedidos();
    setMostrarModal(false);
  };

  const actualizar = async (id, pedido) => {
    await actualizarPedido(id, pedido);
    cargarPedidos();
    setPedidoSeleccionado(null);
    setMostrarModal(false);
  };

  const eliminar = async (id) => {
    await eliminarPedido(id);
    cargarPedidos();
  };

  const seleccionarPedido = (pedido) => {
    setPedidoSeleccionado(pedido);
    setMostrarModal(true);
  };

  return (
    <div>
      <h2>Gestión de Pedidos</h2>
      <Button className="mb-3" variant="primary" onClick={() => { setPedidoSeleccionado(null); setMostrarModal(true); }}>
        Agregar Pedido
      </Button>
      <PedidoList pedidos={pedidos} seleccionar={seleccionarPedido} eliminar={eliminar} />
      <PedidoForm
        show={mostrarModal}
        handleClose={() => setMostrarModal(false)}
        agregar={agregar}
        actualizar={actualizar}
        pedidoSeleccionado={pedidoSeleccionado}
      />
    </div>
  );
};

export default Pedidos;
