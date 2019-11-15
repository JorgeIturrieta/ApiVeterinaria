const { Router } = require('express')
const router = Router()

const db = require('../database')
const Mascota = require('../database/modelos/Mascota')
const Vacuna= require('../database/modelos/Vacuna')
// Importamos el middleware de autorizacion
const autorizar = require('../middleware/autorizar')

router.get('/', autorizar, function (req, res, next) {
    db.mascotas
        .find({ idUsuario: res.locals.idUsuario }, function (error, mascotas) {
            if (error) {
                return next(error)
            }
            res.send(mascotas)
        })
})

router.post('/', function (req, res, next) {
    const mascota = new Mascota(req.body.nombre, res.locals.idUsuario)

    db.mascotas
        .insert(mascota, function (error, mascotaInsertada) {
            if (error) {
                return next(error)
            }
            res.header('Location', `/mascotas/${mascotaInsertada._id}`)
                .status(200)
                .send(mascotaInsertada)
        })
})
 // Creamos una vacuna para una mascota en particular 
router.post('/:idMascota', function (req, res, next) {
    // Si el token del usuario es correcto insertamos la vacuna para la mascota idMascota

    // se debe verificar si el id de la vacuna es correcto 
          // -----------
    //

 


    let idMascota = req.params.idMascota 
                   
    const vacuna = new Vacuna(req.body.nombre, req.body.fecha_colocacion,idMascota )
    console.log(req.body.fecha_colocacion)
    db.vacunas
        .insert(vacuna, function (error, vacunaInsertada) {
            if (error) {
                return next(error)
            }
            res.status(200)
            .send(vacunaInsertada) 
        })
     

     
})

module.exports = router;
