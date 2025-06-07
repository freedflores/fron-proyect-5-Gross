import React, { useState } from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import Swal from "sweetalert2";
import '../../style/cliente.css';

const ClienteList = ({ clientes, seleccionar, eliminar }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  const totalPaginas = Math.ceil(clientes.length / elementosPorPagina);
  const indiceInicio = (paginaActual - 1) * elementosPorPagina;
  const indiceFinal = indiceInicio + elementosPorPagina;
  const clientesPaginados = clientes.slice(indiceInicio, indiceFinal);

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
        Swal.fire("¡Eliminado!", "El registro ha sido eliminado.", "success");
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
      <Table className="tabla-clientes" bordered hover>
        <thead>
          <tr>
            {/* <th>ID</th> ID oculto */}
            <th>Nombre</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Fecha Registro</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientesPaginados.map((c) => (
            <tr key={c.ClienteID}>
              {/* <td>{c.ClienteID}</td> ID oculto */}
              <td>{c.Nombre}</td>
              <td>{c.Email}</td>
              <td>{c.Telefono}</td>
              <td>{new Date(c.FechaRegistro).toLocaleDateString()}</td>
              <td>{c.Direccion}</td>
              <td>
                <Button variant="warning" onClick={() => seleccionar(c)}>Editar</Button>{" "}
                <Button variant="danger" onClick={() => confirmarEliminacion(c.ClienteID)}>Eliminar</Button>
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

export default ClienteList;
