"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;

const express_1 = __importDefault(require("express"));
const usuario_1 = __importDefault(require("./usuario"));
const serie_1 = __importDefault(require("./serie"));

const app = express_1.default();
exports.app = app;
const fs = require('fs');

// PARA LOS PARAMETROS DEL POST Y CORS
var bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors()); // Permite que React se conecte a la API
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Creamos un usuario "base de datos"
let usuario_server = new usuario_1.default('server', 'infraestructura virtual');

// LOGGER MIDDLEWARE
let logger = (req, res, next) => {
    let hora = new Date();
    let log = `[${hora.toISOString()}] ${req.method}:${req.url} ${res.statusCode}`;
    console.log(log);
    next();
};
app.use(logger);

// --- RUTA PARA EL HOME DE REACT (CATÁLOGO) ---
app.get("/series", (req, res) => {
    const seriesDePrueba = [
        { id: 'solo-leveling', title: "Solo Leveling", image: "https://www3.animeflv.net/uploads/animes/covers/3924.jpg", type: "Anime" },
        { id: 'ninja-kamui', title: "Ninja Kamui", image: "https://www3.animeflv.net/uploads/animes/covers/3938.jpg", type: "Anime" },
        { id: 'frieren', title: "Sousou no Frieren", image: "https://www3.animeflv.net/uploads/animes/covers/3860.jpg", type: "Anime" }
    ];
    res.status(200).send(seriesDePrueba);
});

// Devuelve una serie con toda la informacion asociada
app.get("/serie/:nombreserie", (req, res) => {
    let nombreserie = req.params.nombreserie;
    if (nombreserie) {
        try {
            let serie = usuario_server.getSerie(nombreserie);
            let serie_json = JSON.parse(JSON.stringify(serie));
            serie_json['_capitulos'] = JSON.stringify(Object.fromEntries(serie.map_capitulos));
            res.send(JSON.stringify(serie_json));
        } catch (error) {
            res.status(404).send(error.message);
        }
    } else {
        res.status(400).send("Parametros Invalidos");
    }
});

app.get("/holamundo", (req, res) => { res.send("Hola Mundo!"); });
app.get("/status", (req, res) => { res.send("{ status: \"OK\" }"); });

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor de la API corriendo correctamente en el puerto ${PORT}`);
});

module.exports = app;