import React, { useState } from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import Swal from "sweetalert2";
import '../../style/promocion.css';

const PromocionList = ({ promociones, seleccionar, eliminar }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  const totalPaginas = Math.ceil(promociones.length / elementosPorPagina);
  const indiceInicio = (paginaActual - 1) * elementosPorPagina;
  const indiceFinal = indiceInicio + elementosPorPagina;
  const promocionesPaginadas = promociones.slice(indiceInicio, indiceFinal);

  const confirmarEliminacion = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminar(id);
        Swal.fire("¡Eliminada!", "La promoción ha sido eliminada.", "success");
      }
    });
  };

  const obtenerItemsPaginacion = () => {
    const paginas = [];
    let inicio = Math.max(paginaActual - 2, 1);
    let fin = Math.min(paginaActual + 2, totalPaginas);
    if (paginaActual <= 2) fin = Math.min(5, totalPaginas);
    else if (paginaActual >= totalPaginas - 1) inicio = Math.max(totalPaginas - 4, 1);
    for (let i = inicio; i <= fin; i++) {
      paginas.push(
        <Pagination.Item key={i} active={i === paginaActual} onClick={() => setPaginaActual(i)}>
          {i}
        </Pagination.Item>
      );
    }
    return paginas;
  };

  return (
    <>
      <Table className="tabla-promociones" striped bordered hover>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Descuento (%)</th>
            <th>Fecha Inicio</th>
            <th>Fecha Fin</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {promocionesPaginadas.map((p) => (
            <tr key={p.PromocionID}>
              {/* <td>{p.PromocionID}</td> */}
              <td>{p.Nombre}</td>
              <td>{p.Descripcion}</td>
              <td>{p.Descuento}%</td>
              <td>{new Date(p.Fecha_Inicio).toLocaleDateString()}</td>
              <td>{new Date(p.Fecha_Fin).toLocaleDateString()}</td>
              <td>
                <Button variant="warning" onClick={() => seleccionar(p)}>Editar</Button>{" "}
                <Button variant="danger" onClick={() => confirmarEliminacion(p.PromocionID)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination className="justify-content-center">
        <Pagination.First onClick={() => setPaginaActual(1)} disabled={paginaActual === 1} />
        <Pagination.Prev onClick={() => setPaginaActual(paginaActual - 1)} disabled={paginaActual === 1} />
        {obtenerItemsPaginacion()}
        <Pagination.Next onClick={() => setPaginaActual(paginaActual + 1)} disabled={paginaActual === totalPaginas} />
        <Pagination.Last onClick={() => setPaginaActual(totalPaginas)} disabled={paginaActual === totalPaginas} />
      </Pagination>
    </>
  );
};

export default PromocionList;
