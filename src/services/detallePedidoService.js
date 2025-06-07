const API_URL = "http://localhost:3000/api/v1/detallePedido"; // Ajusta si tu ruta es diferente

const getAuthHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`,
});

const manejarError = (error) => {
  console.error("Error en detallePedidoService:", error.message);
  if (error.message.includes("401") || error.message.includes("Token")) {
    localStorage.removeItem("token");
    window.location.href = "/login"; // Redirecciona al login si el token expiró
  }
};

// Obtener todos los detalles de pedidos
export const obtenerDetallesPedidos = async () => {
  try {
    const respuesta = await fetch(API_URL, {
      headers: getAuthHeaders(),
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al obtener detalles de pedidos`);
    }

    return await respuesta.json();
  } catch (error) {
    manejarError(error);
    return []; // Devuelve un array vacío para evitar romper el front
  }
};

// Agregar un detalle de pedido
export const agregarDetallePedido = async (detalle) => {
  try {
    const respuesta = await fetch(API_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(detalle),
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al agregar detalle de pedido`);
    }
  } catch (error) {
    manejarError(error);
  }
};

// Actualizar detalle de pedido por ID
export const actualizarDetallePedido = async (id, detalle) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(detalle),
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al actualizar detalle de pedido`);
    }
  } catch (error) {
    manejarError(error);
  }
};

// Eliminar detalle de pedido por ID
export const eliminarDetallePedido = async (id) => {
  try {
    const respuesta = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!respuesta.ok) {
      throw new Error(`Error ${respuesta.status} al eliminar detalle de pedido`);
    }
  } catch (error) {
    manejarError(error);
  }
};
