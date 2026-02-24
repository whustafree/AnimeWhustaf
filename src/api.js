// Llamada real a tu propio backend Scraper
const API_URL = 'http://localhost:3000/api/latest';

export const getLatestEpisodes = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error en la conexión con el backend");
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error obteniendo animes reales:", error);
    // Retornamos un array vacío si el backend está apagado
    return [];
  }
};