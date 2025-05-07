// src/services/promocionService.js
const API_URL = "http://localhost:3000/api/v1/promociones";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const manejarError = (error) => {
  console.error("Error en promocionService:", error.message);
  if (error.message.includes("401") || error.message.includes("Token")) {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirecciona al login si el token expiró
  }
};

// Obtener todas las promociones
export const obtenerPromociones = async () => {
  try {
    const respuesta = await fetch(API_URL, {
      headers: getAuthHeaders(),
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al obtener promociones`);
    }

    return await respuesta.json();
  } catch (error) {
    manejarError(error);
    return []; // Devuelve un array vacío para evitar romper el front
  }
};

// Agregar una promoción
export const agregarPromocion = async (promocion) => {
  try {
    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(promocion),
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al agregar promoción`);
    }
  } catch (error) {
    manejarError(error);
  }
};

// Actualizar promoción por ID
export const actualizarPromocion = async (id, promocion) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(promocion),
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al actualizar promoción`);
    }
  } catch (error) {
    manejarError(error);
  }
};

// Eliminar promoción por ID
export const eliminarPromocion = async (id) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al eliminar promoción`);
    }
  } catch (error) {
    manejarError(error);
  }
};
