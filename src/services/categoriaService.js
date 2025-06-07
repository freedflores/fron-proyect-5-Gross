// src/services/categoriaService.js
const API_URL = "http://localhost:3000/api/v1/categorias";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const manejarError = (error) => {
  console.error("Error en categoriaService:", error.message);
  if (error.message.includes("401") || error.message.includes("Token")) {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirecciona al login si el token expiró
  }
};

// Obtener todas las categorías
export const obtenerCategorias = async () => {
  try {
    const respuesta = await fetch(API_URL, {
      headers: getAuthHeaders(),
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al obtener categorías`);
    }

    return await respuesta.json();
  } catch (error) {
    manejarError(error);
    return [];
  }
};

// Agregar una categoría
export const agregarCategoria = async (categoria) => {
  try {
    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(categoria),
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al agregar categoría`);
    }
  } catch (error) {
    manejarError(error);
  }
};

// Actualizar categoría por ID
export const actualizarCategoria = async (id, categoria) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(categoria),
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al actualizar categoría`);
    }
  } catch (error) {
    manejarError(error);
  }
};

// Eliminar categoría por ID
export const eliminarCategoria = async (id) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al eliminar categoría`);
    }
  } catch (error) {
    manejarError(error);
  }
};
