// src/services/productoService.js
const API_URL = "http://localhost:3000/api/v1/productos";  // Cambié la URL para productos

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const manejarError = (error) => {
  console.error("Error en productoService:", error.message);
  if (error.message.includes("401") || error.message.includes("Token")) {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirecciona al login si el token expiró
  }
};

// Obtener todos los productos
export const obtenerProductos = async () => {
  try {
    const respuesta = await fetch(API_URL, {
      headers: getAuthHeaders(),
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al obtener productos`);
    }

    return await respuesta.json();
  } catch (error) {
    manejarError(error);
    return []; // Devuelve un array vacío para evitar romper el front
  }
};

// Agregar un producto
export const agregarProducto = async (producto) => {
  try {
    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(producto),
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al agregar producto`);
    }
  } catch (error) {
    manejarError(error);
  }
};

// Actualizar producto por ID
export const actualizarProducto = async (id, producto) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(producto),
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al actualizar producto`);
    }
  } catch (error) {
    manejarError(error);
  }
};

// Eliminar producto por ID
export const eliminarProducto = async (id) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al eliminar producto`);
    }
  } catch (error) {
    manejarError(error);
  }
};
