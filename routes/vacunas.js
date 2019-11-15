const { Router } = require('express')
const router = Router()

const db = require('../database')
const Vacuna= require('../database/modelos/Vacuna')

// Importamos el middleware de autorizacion
const autorizar = require('../middleware/autorizar')



module.exports = router;