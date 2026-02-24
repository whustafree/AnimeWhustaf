const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
app.use(cors()); // Permite que tu React lea los datos
app.use(express.json());

// Ruta principal que hace el "Web Scraping" a AnimeFLV
app.get('/api/latest', async (req, res) => {
    try {
        const url = 'https://www3.animeflv.net';
        // Simulamos ser un navegador real para que AnimeFLV no nos bloquee
        const { data } = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'
            }
        });

        const $ = cheerio.load(data);
        const episodes = [];

        // Buscamos la lista de capítulos en el HTML de la página
        $('.ListEpisodios li').each((i, el) => {
            const aTag = $(el).find('a').attr('href'); 
            const imgTag = $(el).find('.Image img').attr('src') || $(el).find('.Image img').attr('data-src');
            const title = $(el).find('.Title').text().trim();
            const epNum = $(el).find('.Capi').text().trim();
            const type = $(el).find('.Type').text().trim();

            episodes.push({
                id: aTag.split('/').pop(),
                title: title,
                episode: epNum,
                type: type,
                image: imgTag.startsWith('http') ? imgTag : `https://www3.animeflv.net${imgTag}`,
                url: `https://www3.animeflv.net${aTag}` // Link real a AnimeFLV
            });
        });

        res.status(200).json(episodes);
    } catch (error) {
        console.error("Error al scrapear AnimeFLV:", error.message);
        res.status(500).json({ error: "No se pudo obtener la información de AnimeFLV" });
    }
});

// Arrancar el motor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 API de AnifreeW conectada a AnimeFLV corriendo en puerto ${PORT}`);
});