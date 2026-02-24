class Serie {
    constructor(nombre, descripcion, link) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.link = link;
        this.map_capitulos = new Map();
    }
    anadirCapitulo(num, link) {
        if (this.map_capitulos.has(num)) throw new Error("Capítulo ya existe");
        this.map_capitulos.set(num, link);
    }
    borrarCapitulo(num) {
        if (!this.map_capitulos.has(num)) throw new Error("Capítulo no existe");
        this.map_capitulos.delete(num);
    }
    getLinkCapitulo(num) {
        if (!this.map_capitulos.has(num)) throw new Error("Capítulo no encontrado");
        return this.map_capitulos.get(num);
    }
}
exports.default = Serie;