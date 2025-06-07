import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ReporteIngresos = () => {
  const [ingresos, setIngresos] = useState([]);
  const [ingresosFiltrados, setIngresosFiltrados] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState('');
  const [cargando, setCargando] = useState(true);

  const usuario = JSON.parse(localStorage.getItem('usuario'));
  const nombreUsuario = usuario?.nombre || 'FREED';

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/reportes/ingresos')
      .then(res => {
        setIngresos(res.data.ingresos);
        setIngresosFiltrados(res.data.ingresos);
        setCargando(false);
      })
      .catch(err => {
        console.error("Error al cargar el reporte de ingresos:", err);
        setCargando(false);
      });
  }, []);

  useEffect(() => {
    if (!fechaFiltro) {
      setIngresosFiltrados(ingresos);
    } else {
      const filtrados = ingresos.filter((ingreso) => {
        const fechaIngreso = new Date(ingreso.fecha);
        const fechaIngresoISO = fechaIngreso.toISOString().split('T')[0];
        return fechaIngresoISO === fechaFiltro;
      });
      setIngresosFiltrados(filtrados);
    }
  }, [fechaFiltro, ingresos]);

  const exportarPDF = () => {
    const doc = new jsPDF();
    const logoUrl = '/imagenes/logo_gross.png';
    const fechaHora = new Date().toLocaleString();

    const cargarLogoYGenerarPDF = (src) => {
      const img = new Image();
      img.src = src;

      img.onload = () => {
        const pageWidth = doc.internal.pageSize.getWidth();

        doc.addImage(img, 'PNG',);
        doc.setFontSize(10);
        doc.text(`Usuario: ${nombreUsuario}`, 10, 45);
        doc.text(`Fecha y hora: ${fechaHora}`, pageWidth - 70, 15);

        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('REPORTE MASSIMO GROSSO', pageWidth / 2, 55, { align: 'center' });

        doc.setFontSize(16);
        doc.setFont('helvetica', 'normal');
        doc.text('Reporte de Ingresos', 14, 70);

        const columnas = ["Fecha", "N° Ingreso", "Proveedor", "Método de Pago", "Total (S/)", "Estado"];
        const filas = ingresosFiltrados.map(ingreso => [
          new Date(ingreso.fecha).toLocaleDateString(),
          ingreso.numero_ingreso,
          ingreso.proveedor,
          ingreso.metodo_pago,
          Number(ingreso.total).toFixed(2),
          ingreso.estado
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

        doc.save('reporte_ingresos.pdf');
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
        <h2>📥 Reporte de Ingresos</h2>
        <button className="btn btn-success" onClick={exportarPDF}>
          Exportar a PDF
        </button>
      </div>

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
        <p>Cargando ingresos...</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="table-light">
                <tr>
                  <th>Fecha</th>
                  <th>N° Ingreso</th>
                  <th>Proveedor</th>
                  <th>Método de Pago</th>
                  <th>Total</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {ingresosFiltrados.length > 0 ? (
                  ingresosFiltrados.map((ingreso) => (
                    <tr key={ingreso.numero_ingreso}>
                      <td>{new Date(ingreso.fecha).toLocaleDateString()}</td>
                      <td>{ingreso.numero_ingreso}</td>
                      <td>{ingreso.proveedor}</td>
                      <td>{ingreso.metodo_pago}</td>
                      <td>S/ {Number(ingreso.total).toFixed(2)}</td>
                      <td>{ingreso.estado}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">No hay ingresos en esta fecha</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-3 text-end">
            <h5>
              📊 Total Ingresado:{" "}
              <span className="text-primary">
                S/{" "}
                {ingresosFiltrados
                  .reduce((acc, ingreso) => acc + Number(ingreso.total), 0)
                  .toFixed(2)}
              </span>
            </h5>
          </div>
        </>
      )}
    </div>
  );
};

export default ReporteIngresos;
