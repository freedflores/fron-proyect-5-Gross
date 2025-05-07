import React from "react";

const Home = () => {
  return (
    <div className="text-center">
      <h1>Bienvenido a Massimo Grosso</h1>
      <p>Web App creado por los alumnos de DSI - V</p>
      <img
        src={require('../assets/foto-cliente.jpg')}
        alt="Massimo Logo"
        style={{
          display: "block",
          margin: "30px auto 0",
          maxWidth: "550px",
          width: "100%",
          height: "auto",
          border: "4px solid white", // Puedes cambiar el color si quieres
          borderRadius: "10px",
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.7)", // Este es el glow blanco 
          marginTop: "3px"
        }}
      />
    </div>
  );
};

export default Home;

