const API_URL_MESAS = "http://localhost:3000/api/v1/mesas";

// Obtener lista de mesas
export const obtenerMesas = async () => {
  try {
    const respuesta = await fetch(API_URL_MESAS);

    if (!respuesta.ok) {
      const errorData = await respuesta.json();
      throw new Error(errorData.message || "Error desconocido al obtener las mesas.");
    }

    const data = await respuesta.json();
    return data;
  } catch (error) {
    console.error("❌ Error en obtenerMesas:", error.message);
    return []; // Retornar array vacío para que el frontend no se rompa
  }
};

// Agregar una nueva mesa
export const agregarMesa = async (mesa) => {
  try {
    // Validación mínima del objeto
    if (!mesa.NumeroMesa || !mesa.Capacidad) {
      throw new Error("Faltan datos obligatorios: número y capacidad.");
    }

    const respuesta = await fetch(API_URL_MESAS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mesa),
    });

    if (!respuesta.ok) {
      const errorData = await respuesta.json();
      console.error("❌ Detalles del error al agregar la mesa:", errorData);
      throw new Error(errorData.message || "Error desconocido al agregar la mesa.");
    }

    const mesaCreada = await respuesta.json();
    return mesaCreada;
  } catch (error) {
    console.error("❌ Error en agregarMesa:", error.message);
    throw error;
  }
};

// Actualizar información de una mesa
export const actualizarMesa = async (id, mesa) => {
  try {
    if (!id|| !mesa.NumeroMesa || !mesa.Capacidad) {
      throw new Error("Datos incompletos para actualizar la mesa.");
    }

    const respuesta = await fetch(`${API_URL_MESAS}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mesa),
    });

    if (!respuesta.ok) {
      const errorData = await respuesta.json();
      console.error("❌ Detalles del error al actualizar la mesa:", errorData);
      throw new Error(errorData.message || "Error al actualizar la mesa.");
    }

    const mesaActualizada = await respuesta.json();
    return mesaActualizada;
  } catch (error) {
    console.error("❌ Error en actualizarMesa:", error.message);
    throw error;
  }
};

// Eliminar una mesa
export const eliminarMesa = async (id) => {
  try {
    const respuesta = await fetch(`${API_URL_MESAS}/${id}`, {
      method: "DELETE",
    });

    if (!respuesta.ok) {
      const errorData = await respuesta.json();
      console.error("❌ Detalles del error al eliminar la mesa:", errorData);
      throw new Error(errorData.message || "Error al eliminar la mesa.");
    }

    const resultado = await respuesta.json();
    return resultado;
  } catch (error) {
    console.error("❌ Error en eliminarMesa:", error.message);
    throw error;
  }
};
