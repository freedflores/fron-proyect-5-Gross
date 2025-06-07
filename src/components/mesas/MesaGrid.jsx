// MesaGrid.jsx
import React from "react";
import '../../style/mesa.css'; // usarás estilos aquí

const MesaGrid = ({ mesas, onMesaClick }) => {
  return (
    <div className="mesa-grid-container">
      {mesas.map((mesa, index) => (
        <div
          key={index}
          className={`mesa-card ${mesa.Estado.toLowerCase()}`} // clase visual según estado
          onClick={() => onMesaClick(mesa)} // cuando haces click en la mesa
        >
          <h5>Mesa {mesa.NumeroMesa}</h5>
          <p>Capacidad: {mesa.Capacidad}</p>
          <p>{mesa.Estado}</p>
        </div>
      ))}
    </div>
  );
};

export default MesaGrid;
