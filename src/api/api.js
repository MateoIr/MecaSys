import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
});

const getAllClients = async () => {
  try {
    const response = await apiClient.get("/traerClientes");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getAllMecanics = async () => {
  try {
    const response = await apiClient.get("/traerMecanicos");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getAllServices = async () => {
  try {
    const response = await apiClient.get("/traerServicios");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getAllSpareParts = async () => {
  try {
    const response = await apiClient.get("/traerRepuestos");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getCar = async (id) => {
  try {
    const response = await apiClient.get(`/traerVehiculo/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getUnicTrun = async (id) => {
  if (!id || id === "null") {
    return null; // O algún valor predeterminado
  }
  try {
    const response = await apiClient.get(`/traerUnicoTurno/${id}`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getAllTurns = async () => {
  try {
    const response = await apiClient.get("/traerTurnos");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const deleteTurno = async (id) => {
  try {
    const response = await apiClient.delete(`/eliminarTurno/${id}`);
    return response; // Aquí puedes retornar la respuesta si lo necesitas
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const registerTurn = async (data) => {
  // Elimina la desestructuración aquí
  try {
    const response = await apiClient.post("/cargarTurno", data);
    return response.data;
  } catch (error) {
    console.error("Error registrando el turno:", error);
    throw error;
  }
};
const updateTurn = async ({ data, id }) => {
  try {
    const response = await apiClient.put(`/modificarTurno/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error registrando mascota:", error);
    throw error;
  }
};
const updateState = async ({ estado, id }) => {
  console.log(estado);

  try {
    const response = await apiClient.put(`/modificarEstado/${id}`, {
      estadoTruno: estado,
    });

    return response.data;
  } catch (error) {
    console.error("Error registrando mascota:", error);
    throw error;
  }
};
export {
  updateState,
  updateTurn,
  registerTurn,
  deleteTurno,
  getAllClients,
  getAllMecanics,
  getAllServices,
  getAllSpareParts,
  getCar,
  getAllTurns,
  getUnicTrun,
};
