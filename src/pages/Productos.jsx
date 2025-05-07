import React, { useEffect, useState } from "react";
import {
  obtenerProductos,
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
} from "../services/productoService";
import ProductoList from "../components/ProductoList";
import ProductoForm from "../components/ProductoForm";
import { Button } from "react-bootstrap";

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    const datos = await obtenerProductos();
    setProductos(datos);
  };

  const agregar = async (producto) => {
    await agregarProducto(producto);
    cargarProductos();
    setMostrarModal(false);
  };

  const actualizar = async (id, producto) => {
    await actualizarProducto(id, producto);
    cargarProductos();
    setProductoSeleccionado(null);
    setMostrarModal(false);
  };

  const eliminar = async (id) => {
    await eliminarProducto(id);
    cargarProductos();
  };

  const seleccionarProducto = (producto) => {
    setProductoSeleccionado(producto);
    setMostrarModal(true);
  };

  return (
    <div>
      <h2>Gestión de Productos</h2>
      <Button
        className="mb-3"
        variant="primary"
        onClick={() => {
          setProductoSeleccionado(null);
          setMostrarModal(true);
        }}
      >
        Agregar Producto
      </Button>
      <ProductoList
        productos={productos}
        seleccionar={seleccionarProducto}
        eliminar={eliminar}
      />
      <ProductoForm
        show={mostrarModal}
        handleClose={() => setMostrarModal(false)}
        agregar={agregar}
        actualizar={actualizar}
        productoSeleccionado={productoSeleccionado}
      />
    </div>
  );
};

export default Productos;
