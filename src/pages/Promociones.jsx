import React, { useEffect, useState } from "react";
import { obtenerPromociones, agregarPromocion, actualizarPromocion, eliminarPromocion } from "../services/promocionService";
import PromocionList from "../components/PromocionList";
import PromocionForm from "../components/PromocionForm";
import { Button } from "react-bootstrap";

const Promociones = () => {
  const [promociones, setPromociones] = useState([]);
  const [promocionSeleccionada, setPromocionSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    cargarPromociones();
  }, []);

  const cargarPromociones = async () => {
    const datos = await obtenerPromociones();
    setPromociones(datos);
  };

  const agregar = async (promocion) => {
    await agregarPromocion(promocion);
    cargarPromociones();
    setMostrarModal(false);
  };

  const actualizar = async (id, promocion) => {
    await actualizarPromocion(id, promocion);
    cargarPromociones();
    setPromocionSeleccionada(null);
    setMostrarModal(false);
  };

  const eliminar = async (id) => {
    await eliminarPromocion(id);
    cargarPromociones();
  };

  const seleccionarPromocion = (promocion) => {
    setPromocionSeleccionada(promocion);
    setMostrarModal(true);
  };

  return (
    <div>
      <h2>Gestión de Promociones</h2>
      <Button className="mb-3" variant="primary" onClick={() => { setPromocionSeleccionada(null); setMostrarModal(true); }}>
        Agregar Promoción
      </Button>
      <PromocionList promociones={promociones} seleccionar={seleccionarPromocion} eliminar={eliminar} />
      <PromocionForm
        show={mostrarModal}
        handleClose={() => setMostrarModal(false)}
        agregar={agregar}
        actualizar={actualizar}
        promocionSeleccionada={promocionSeleccionada}
      />
    </div>
  );
};

export default Promociones;
