const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const bodyParser = require('body-parser')


// Routers
const usuariosRouter = require('./routes/usuarios')
const mascotasRouter = require('./routes/mascotas')
const vacunasRouter = require('./routes/vacunas')
const swaggerUi = require('swagger-ui-express');
const apiDocs = require('./docs/index.js')
const app = express()

// Usamos helmet con opciones por defecto
app.use(helmet())

app.use(morgan('dev'))
app.use(bodyParser.json())

app.get('/', (req, res, next) => {
    res.send({
        nombre: 'API Veterinaria CURSO node API Rest Full',
        version: '1.0.0'
    })
})
 
// Le indicamos a nuestra app que use los routers
app.use('/usuarios', usuariosRouter)
app.use('/mascotas', mascotasRouter)
app.use('/vacunas', vacunasRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocs));
app.use((req, res, next) => {
    next({
        mensaje: 'Recurso no encontrado',
        status: 404
    })
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
        .send({
            error: err.message
        })
})

module.exports = app
