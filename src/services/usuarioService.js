// src/services/usuarioService.js
const API_URL = "http://localhost:3000/api/v1/usuarios";

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const manejarError = (error) => {
  console.error("Error en usuarioService:", error.message);
  if (error.message.includes("401") || error.message.includes("Token")) {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirecciona al login si el token expiró
  }
};

// Obtener todos los usuarios
export const obtenerUsuarios = async () => {
  try {
    const respuesta = await fetch(API_URL, {
      headers: getAuthHeaders(),
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al obtener usuarios`);
    }

    return await respuesta.json();
  } catch (error) {
    manejarError(error);
    return []; // Devuelve un array vacío para evitar romper el front
  }
};

// Agregar un usuario
export const agregarUsuario = async (usuario) => {
  try {
    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(usuario),
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al agregar usuario`);
    }
  } catch (error) {
    manejarError(error);
  }
};

// Actualizar usuario por ID
export const actualizarUsuario = async (id, usuario) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(usuario),
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al actualizar usuario`);
    }
  } catch (error) {
    manejarError(error);
  }
};

// Eliminar usuario por ID
export const eliminarUsuario = async (id) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al eliminar usuario`);
    }
  } catch (error) {
    manejarError(error);
  }
};
