// src/services/pedidoService.js
const API_URL = "http://localhost:3000/api/v1/pedidos";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const manejarError = (error) => {
  console.error("Error en pedidoService:", error.message);
  if (error.message.includes("401") || error.message.includes("Token")) {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirecciona al login si el token expiró
  }
};

// Obtener todos los pedidos
export const obtenerPedidos = async () => {
  try {
    const respuesta = await fetch(API_URL, {
      headers: getAuthHeaders(),
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al obtener pedidos`);
    }

    return await respuesta.json();
  } catch (error) {
    manejarError(error);
    return []; // Devuelve un array vacío para evitar romper el front
  }
};

// Agregar un pedido
export const agregarPedido = async (pedido) => {
  try {
    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(pedido),
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al agregar pedido`);
    }
  } catch (error) {
    manejarError(error);
  }
};

// Actualizar pedido por ID
export const actualizarPedido = async (id, pedido) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(pedido),
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al actualizar pedido`);
    }
  } catch (error) {
    manejarError(error);
  }
};

// Eliminar pedido por ID
export const eliminarPedido = async (id) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al eliminar pedido`);
    }
  } catch (error) {
    manejarError(error);
  }
};
