const uuid = require('uuid/v1')

class Vacuna {
    constructor(nombre, fecha_colocacion, rela_mascota) {
        this._id = uuid()
        this.nombre = nombre
        this.fecha_colocacion = fecha_colocacion
        this.rela_mascota = rela_mascota
    }
}

module.exports = Vacuna