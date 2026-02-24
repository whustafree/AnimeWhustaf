// src/services/animeApi.js

// Si levantas un proxy en Node.js, aquí iría tu localhost o dominio de producción
const BASE_URL = 'https://tu-api-animeflv-proxy.com/api/v1'; 

export const getLatestAnimes = async () => {
  try {
    // Reemplazar con el endpoint real de tu scraper de AnimeFLV
    // const response = await fetch(`${BASE_URL}/latest`);
    // const data = await response.json();
    // return data;

    // Simulación de respuesta de API para seguir maquetando:
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 'solo-leveling', title: "Solo Leveling", episodes: 12, image: "https://www3.animeflv.net/uploads/animes/covers/3924.jpg", type: "Anime" },
          { id: 'ninja-kamui', title: "Ninja Kamui", episodes: 13, image: "https://www3.animeflv.net/uploads/animes/covers/3938.jpg", type: "Anime" },
          { id: 'frieren', title: "Sousou no Frieren", episodes: 28, image: "https://www3.animeflv.net/uploads/animes/covers/3860.jpg", type: "Anime" },
        ]);
      }, 800); // Simulamos el retraso de la red
    });
  } catch (error) {
    console.error("Error obteniendo los animes:", error);
    return [];
  }
};

export const getAnimeDetails = async (id) => {
  try {
    // Simulación para los detalles y lista de episodios:
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id,
          title: id.replace('-', ' ').toUpperCase(),
          description: "Descripción detallada traída desde la API de AnimeFLV. Aquí se cuenta la sinopsis oficial de la serie.",
          status: "En emisión",
          episodes: [
            { number: 1, id: `${id}-1` },
            { number: 2, id: `${id}-2` },
            { number: 3, id: `${id}-3` },
          ]
        });
      }, 500);
    });
  } catch (error) {
    console.error(`Error obteniendo detalles del anime ${id}:`, error);
    return null;
  }
};