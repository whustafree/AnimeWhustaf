class Usuario {
    constructor(nombre, descripcion) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.series = new Map();
    }
    getSerie(nombre) {
        if (!this.series.has(nombre)) throw new Error("Serie no encontrada");
        return this.series.get(nombre);
    }
    anadirSerie(serie) {
        if (this.series.has(serie.nombre)) throw new Error("Serie ya existe");
        this.series.set(serie.nombre, serie);
    }
    borrarSerie(serie) {
        if (!this.series.has(serie.nombre)) throw new Error("Serie no existe");
        this.series.delete(serie.nombre);
    }
}
exports.default = Usuario;