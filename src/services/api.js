// src/services/api.js
import axios from "axios";
const API_URL = "http://localhost:5500/api/initiatives";

export const getTiposIniciativa = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los tipos de iniciativa:", error);
    throw error;
  }
};

export const getTipoIniciativa = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el tipo de iniciativa:", error);
    throw error;
  }
};

export const createTipoIniciativa = async (tipoIniciativa) => {
  try {
    const response = await axios.post(API_URL, tipoIniciativa);
    return response.data;
  } catch (error) {
    console.error("Error al crear el tipo de iniciativa:", error);
    throw error;
  }
};

export const updateTipoIniciativa = async (id, tipoIniciativa) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, tipoIniciativa);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el tipo de iniciativa:", error);
    throw error;
  }
};

export const deleteTipoIniciativa = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el tipo de iniciativa:", error);
    throw error;
  }
};
