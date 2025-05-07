import React, { useEffect, useState } from "react";
import {
  obtenerMesas,
  agregarMesa,
  actualizarMesa,
  eliminarMesa,
} from "../services/mesaService"; // Asegúrate de que estas funciones existan
import MesaList from "../components/mesas/MesaList";
import MesaForm from "../components/mesas/MesaForm";
import { Button } from "react-bootstrap";

const Mesas = () => {
  const [mesas, setMesas] = useState([]);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    cargarMesas();
  }, []);

  const cargarMesas = async () => {
    const datos = await obtenerMesas();
    setMesas(datos);
  };

  const agregar = async (mesa) => {
    await agregarMesa(mesa);
    cargarMesas();
    setMostrarModal(false);
  };

  const actualizar = async (id, mesa) => {
    await actualizarMesa(id, mesa);
    cargarMesas();
    setMesaSeleccionada(null);
    setMostrarModal(false);
  };

  const eliminar = async (id) => {
    await eliminarMesa(id);
    cargarMesas();
  };

  const seleccionarMesa = (mesa) => {
    setMesaSeleccionada(mesa);
    setMostrarModal(true);
  };

  return (
    <div>
      <h2>Gestión de Mesas</h2>

      <Button
        className="mb-3"
        variant="primary"
        onClick={() => {
          setMesaSeleccionada(null); // Limpiar selección anterior
          setMostrarModal(true);     // Mostrar formulario vacío
        }}
      >
        Agregar Mesa
      </Button>

      <MesaList mesas={mesas} seleccionar={seleccionarMesa} eliminar={eliminar} />

      <MesaForm
        show={mostrarModal}
        handleClose={() => setMostrarModal(false)}
        agregar={agregar}
        actualizar={actualizar}
        mesaSeleccionada={mesaSeleccionada}
      />
    </div>
  );
};

export default Mesas;
