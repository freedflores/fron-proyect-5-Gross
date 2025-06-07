import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ReporteVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [ventasFiltradas, setVentasFiltradas] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState('');
  const [cargando, setCargando] = useState(true);

  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const nombreUsuario = usuario?.nombre || 'FREED';

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/reportes/ventas')
      .then(res => {
        setVentas(res.data.ventas);
        setVentasFiltradas(res.data.ventas);
        setCargando(false);
      })
      .catch(err => {
        console.error("Error al cargar el reporte de ventas:", err);
        setCargando(false);
      });
  }, []);

  // Filtrar ventas cuando cambia la fecha
  useEffect(() => {
  if (!fechaFiltro) {
    setVentasFiltradas(ventas);
  } else {
    const filtradas = ventas.filter((venta) => {
      const fechaVenta = new Date(venta.fecha);
      const fechaVentaISO = fechaVenta.toISOString().split('T')[0]; // YYYY-MM-DD
      return fechaVentaISO === fechaFiltro;
    });
    setVentasFiltradas(filtradas);
  }
}, [fechaFiltro, ventas]);


  const exportarPDF = () => {
    const doc = new jsPDF();
    const logoUrl = '/imagenes/logo_gross.png';
    const fechaHora = new Date().toLocaleString();

    const cargarLogoYGenerarPDF = (src) => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        const pageWidth = doc.internal.pageSize.getWidth();

        doc.addImage(img, 'PNG', 10, 10, 30, 30);
        doc.setFontSize(10);
        doc.text(`Usuario: ${nombreUsuario}`, 10, 45);
        doc.text(`Fecha y hora: ${fechaHora}`, pageWidth - 70, 15);

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('REPORTE MASSIMO GROSSO', pageWidth / 2, 55, { align: 'center' });

        doc.setFontSize(16);
        doc.setFont('helvetica', 'normal');
        doc.text('Reporte de Ventas', 14, 70);

        const columnas = ["Fecha", "N° Pedido", "Cliente", "Tipo Entrega", "Total (S/)", "Estado"];
        const filas = ventasFiltradas.map(venta => [
          new Date(venta.fecha).toLocaleDateString(),
          venta.numero_pedido,
          venta.cliente,
          venta.tipo_entrega,
          Number(venta.total).toFixed(2),
          venta.estado
        ]);

        autoTable(doc, {
          startY: 75,
          head: [columnas],
          body: filas,
          styles: { fontSize: 10 },
          theme: 'grid',
          didDrawPage: (data) => {
            const pageCount = doc.internal.getNumberOfPages();
            const pageSize = doc.internal.pageSize;
            const pageHeight = pageSize.height;
            const pageNumber = doc.internal.getCurrentPageInfo().pageNumber;
            doc.setFontSize(9);
            doc.text(`Página ${pageNumber} de ${pageCount}`, pageSize.width - 40, pageHeight - 10);
          }
        });

        doc.save('reporte_ventas.pdf');
      };

      img.onerror = () => {
        console.error("No se pudo cargar el logo");
      };
    };

    cargarLogoYGenerarPDF(logoUrl);
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>🧾 Reporte de Ventas</h2>
        <button className="btn btn-danger" onClick={exportarPDF}>
          Exportar a PDF
        </button>
      </div>

      {/* Campo para filtrar por fecha */}
      <div className="mb-3">
        <label htmlFor="fechaFiltro" className="form-label">Buscar por Fecha:</label>
        <input
          type="date"
          id="fechaFiltro"
          className="form-control"
          value={fechaFiltro}
          onChange={(e) => setFechaFiltro(e.target.value)}
        />
      </div>

      {cargando ? (
        <p>Cargando ventas...</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>Fecha</th>
                  <th>N° Pedido</th>
                  <th>Cliente</th>
                  <th>Tipo Entrega</th>
                  <th>Total</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {ventasFiltradas.length > 0 ? (
                  ventasFiltradas.map((venta) => (
                    <tr key={venta.numero_pedido}>
                      <td>{new Date(venta.fecha).toLocaleDateString()}</td>
                      <td>{venta.numero_pedido}</td>
                      <td>{venta.cliente}</td>
                      <td>{venta.tipo_entrega}</td>
                      <td>S/ {Number(venta.total).toFixed(2)}</td>
                      <td>{venta.estado}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No hay ventas en esta fecha</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-3 text-end">
            <h5>
              💰 Total Vendido:{" "}
              <span className="text-success">
                S/{" "}
                {ventasFiltradas
                  .reduce((acc, venta) => acc + Number(venta.total), 0)
                  .toFixed(2)}
              </span>
            </h5>
          </div>
        </>
      )}
    </div>
  );
};

export default ReporteVentas;
