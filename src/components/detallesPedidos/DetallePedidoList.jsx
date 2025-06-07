import React, { useState } from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import Swal from "sweetalert2";
import '../../style/detallePedido.css';

const DetallePedidoList = ({ detalles, seleccionar, eliminar }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  const totalPaginas = Math.ceil(detalles.length / elementosPorPagina);
  const indiceInicio = (paginaActual - 1) * elementosPorPagina;
  const indiceFinal = indiceInicio + elementosPorPagina;
  const detallesPaginados = detalles.slice(indiceInicio, indiceFinal);

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
        Swal.fire("¡Eliminado!", "El detalle ha sido eliminado.", "success");
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
      <Table className="tabla-detalles" striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>PedidoID</th>
            <th>Producto</th> 
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Sub Total</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {detallesPaginados.map((d) => (
            <tr key={d.DetallePedidoID}>
              <td>{d.DetallePedidoID}</td>
              <td>{d.PedidoID}</td>
              <td>{d.NombreProducto}</td>
              <td>{d.Cantidad}</td>
              <td>S/{parseFloat(d.PrecioUnitario).toFixed(2)}</td>
              <td>S/{parseFloat(d.Total).toFixed(2)}</td>
              <td>
                <Button variant="warning" onClick={() => seleccionar(d)}>Editar</Button>{" "}
                <Button variant="danger" onClick={() => confirmarEliminacion(d.DetallePedidoID)}>Eliminar</Button>
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

export default DetallePedidoList;
