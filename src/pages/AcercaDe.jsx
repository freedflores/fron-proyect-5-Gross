import React from "react";
import "../style/AcercaDe.css";

const AcercaDe = () => {
  return (
    <div className="acercade-wrapper">
      <div className="acercade-container">

        {/* Sección 1 */}
        <div className="acercade-content">
          <div className="acercade-text">
            {/* <p className="acercade-subtitle">ACERCA DE</p> */}
            <h2 className="acercade-title">
              RESTAURANTE <span className="highlight">MASSIMO</span> GROSSO <br /> PUCALLPA.
            </h2>
            <p className="acercade-description">
              MASSIMO GROSSO es un elegante restaurante que combina la alta cocina italiana con un ambiente moderno y acogedor.
              Cada espacio ha sido diseñado pensando en brindar una experiencia gastronómica única, donde la calidad, el confort y el sabor
              se fusionan para satisfacer a los paladares más exigentes.
            </p>
          </div>
          <div className="acercade-image-container">
            <div className="circle-background"></div>
            <div className="dots-pattern"></div>
            <img
              src="/imagenes/foto-cliente.jpg"
              alt="Persona trabajando"
              className="acercade-image"
            />
          </div>
        </div>

        {/* Sección 2 */}
        <div className="acercade-content reverse">
          <div className="acercade-image-container">
            <div className="circle-background"></div>
            <div className="dots-pattern"></div>
            <img
              src="/imagenes/foto-cliente.jpg"
              alt="Comida Italiana"
              className="acercade-image"
            />
          </div>
          <div className="acercade-text">
            <h2 className="acercade-title">
              NUESTRA <span className="highlight">ESPECIALIDAD</span>
            </h2>
            <p className="acercade-description">
              Disfruta de los más auténticos sabores de Italia con nuestras pastas artesanales, pizzas al horno de leña y postres tradicionales.
              Cada plato está preparado con ingredientes frescos y el toque único de nuestros chefs especializados.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AcercaDe;
