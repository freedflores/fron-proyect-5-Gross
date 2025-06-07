import React, { useEffect, useState } from "react";
import {
  obtenerCategorias,
  agregarCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from "../services/categoriaService";
import CategoriaList from "../components/categorias/CategoriaList";
import CategoriaForm from "../components/categorias/CategoriaForm";
import { Button } from "react-bootstrap";

const Categorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    const datos = await obtenerCategorias();
    setCategorias(datos);
  };

  const agregar = async (categoria) => {
    await agregarCategoria(categoria);
    cargarCategorias();
    setMostrarModal(false);
  };

  const actualizar = async (id, categoria) => {
    await actualizarCategoria(id, categoria);
    cargarCategorias();
    setCategoriaSeleccionada(null);
    setMostrarModal(false);
  };

  const eliminar = async (id) => {
    await eliminarCategoria(id);
    cargarCategorias();
  };

  const seleccionarCategoria = (categoria) => {
    setCategoriaSeleccionada(categoria);
    setMostrarModal(true);
  };

  return (
    <div>
      <h2>Gestión de Categorías</h2>
      <Button
        className="mb-3"
        variant="primary"
        onClick={() => {
          setCategoriaSeleccionada(null);
          setMostrarModal(true);
        }}
      >
        Agregar Categoría
      </Button>
      <CategoriaList
        categorias={categorias}
        seleccionar={seleccionarCategoria}
        eliminar={eliminar}
      />
      <CategoriaForm
        show={mostrarModal}
        handleClose={() => setMostrarModal(false)}
        agregar={agregar}
        actualizar={actualizar}
        categoriaSeleccionada={categoriaSeleccionada}
      />
    </div>
  );
};

export default Categorias;
