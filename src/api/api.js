import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080",
});

const getAllClients = async () => {
  try {
    const response = await apiClient.get("/mascota/raza");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getAllMecanics = async () => {
  try {
    const response = await apiClient.get("/mascota/raza");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getAllServices = async () => {
  try {
    const response = await apiClient.get("/mascota/raza");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

const getAllSpareParts = async () => {
  try {
    const response = await apiClient.get("/mascota/raza");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : "Network Error"
    );
  }
};

export { getAllClients, getAllMecanics, getAllServices, getAllSpareParts };
