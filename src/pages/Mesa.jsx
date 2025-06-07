import React, { useState } from "react";
import MesasForm from "../components/mesas/MesaForm"; // Asegúrate del nombre correcto
import { Button, Container, Row, Col, Table } from "react-bootstrap";
import Swal from "sweetalert2";

const MesasPage = () => {
  const [mesas, ] = useState([
    { MesaID: 1, NumeroMesa: 1, Capacidad: 4, Ubicacion: "Interior", Estado: "Disponible" },
    { MesaID: 2, NumeroMesa: 2, Capacidad: 4, Ubicacion: "Interior", Estado: "Ocupada" },
    { MesaID: 3, NumeroMesa: 3, Capacidad: 4, Ubicacion: "Exterior", Estado: "Disponible" },
    { MesaID: 4, NumeroMesa: 4, Capacidad: 6, Ubicacion: "VIP", Estado: "Reservada" },
    { MesaID: 5, NumeroMesa: 5, Capacidad: 2, Ubicacion: "Terraza", Estado: "Disponible" },
    { MesaID: 6, NumeroMesa: 6, Capacidad: 4, Ubicacion: "Interior", Estado: "Mantenimiento" },
    { MesaID: 7, NumeroMesa: 7, Capacidad: 4, Ubicacion: "VIP", Estado: "Disponible" },
    { MesaID: 8, NumeroMesa: 8, Capacidad: 6, Ubicacion: "Terraza", Estado: "Ocupada" },
  ]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [mesaSeleccionada, setMesaSeleccionada] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [mostrarTabla, setMostrarTabla] = useState(false);

  const handleMesaClick = (mesa) => {
    setMesaSeleccionada(mesa);
    setMostrarModal(true);
  };

  const handleAgregar = (nuevaReserva) => {
    const nuevoID = reservas.length > 0 ? Math.max(...reservas.map(r => r.MesaID)) + 1 : 1;
    setReservas([...reservas, { ...nuevaReserva, MesaID: nuevoID }]);
    Swal.fire("Reserva agregada", "Los datos han sido guardados", "success");
  };

  const handleActualizar = (id, reservaActualizada) => {
    setReservas(
      reservas.map((r) =>
        r.MesaID === id ? { ...reservaActualizada, MesaID: id } : r
      )
    );
    Swal.fire("Reserva actualizada", "Los datos fueron modificados", "success");
  };

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4">Reservas de Mesas</h2>

      <Row className="mb-3">
        {mesas.map((mesa) => (
          <Col key={mesa.MesaID} xs={6} md={3} className="mb-2">
            <Button
              variant="outline-primary"
              className="w-100"
              onClick={() => handleMesaClick(mesa)}
            >
              Mesa {mesa.NumeroMesa}
            </Button>
          </Col>
        ))}
      </Row>

      <Button
        variant="info"
        onClick={() => setMostrarTabla(!mostrarTabla)}
        className="mb-3"
      >
        {mostrarTabla ? "Ocultar Reservas" : "Mostrar Reservas"}
      </Button>

      {mostrarTabla && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Mesa</th>
              <th>Capacidad</th>
              <th>Ubicación</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva) => (
              <tr key={reserva.MesaID}>
                <td>{reserva.NumeroMesa}</td>
                <td>{reserva.Capacidad}</td>
                <td>{reserva.Ubicacion}</td>
                <td>{reserva.Estado}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <MesasForm
        show={mostrarModal}
        handleClose={() => setMostrarModal(false)}
        agregar={handleAgregar}
        actualizar={handleActualizar}
        mesaSeleccionada={mesaSeleccionada}
      />
    </Container>
  );
};

export default MesasPage;
