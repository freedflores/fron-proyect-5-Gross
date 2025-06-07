import React from "react";
import "../style/Pizza.css";

const Home = () => {
  return (
    <div className="full-screen-wrapper">
      <div className="pizza-body">
        <div className="animated-text">
          <h1>
            <span className="word">Bienvenido</span>&nbsp;
            <span className="word">a</span>&nbsp;
            <span className="word">Massimo</span>&nbsp;
            <span className="word">Grosso</span>
          </h1>
          <p className="subtext">Web App creado por los alumnos de DSI - V</p>

          {/* Botones */}
          <div className="button-group">
            <button className="home-button">Ver Reservas</button>
            <button className="home-button">Administrar Productos</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
