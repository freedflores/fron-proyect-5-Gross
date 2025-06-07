import React, { useState } from "react";
import { Table, Button, Pagination } from "react-bootstrap";
import Swal from "sweetalert2";
import '../../style/pedido.css';

const PedidoList = ({ pedidos, seleccionar, eliminar }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const elementosPorPagina = 5;

  const totalPaginas = Math.ceil(pedidos.length / elementosPorPagina);
  const indiceInicio = (paginaActual - 1) * elementosPorPagina;
  const indiceFinal = indiceInicio + elementosPorPagina;
  const pedidosPaginados = pedidos.slice(indiceInicio, indiceFinal);

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
        Swal.fire("¡Eliminado!", "El pedido ha sido eliminado.", "success");
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
      <Table className="tabla-pedidos" striped bordered hover>
        <thead>
          <tr>
           
            <th>Nombre Cliente</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Estado</th>
            <th>Tipo de Entrega</th>
            <th>Dirección</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {pedidosPaginados.map((p) => {
            const total = parseFloat(p.Total); // Convertir Total a un número flotante
            return (
              <tr key={p.PedidoID}>
                {/* <td>{p.PedidoID}</td> */}
                <td>{p.NombreCliente}</td> 
                <td>{new Date(p.FechaPedido).toLocaleDateString()}</td>
                <td>S/{isNaN(total) ? 'N/A' : total.toFixed(2)}</td> 
                <td>{p.Estado}</td>
                <td>{p.TipoEntrega}</td>
                <td>{p.DireccionEntrega}</td>
                <td>{p.TelefonoContacto}</td>
                <td>
                  <Button variant="warning" onClick={() => seleccionar(p)}>Editar</Button>{" "}
                  <Button variant="danger" onClick={() => confirmarEliminacion(p.PedidoID)}>Eliminar</Button>
                </td>
              </tr>
            );
          })}
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

export default PedidoList;
