const router = require('express').Router();

//gestionando peticiones
const apiRouterProyectos = require('./api/proyectos');//recibimos las peticiones desde [./api/proyectos]

//y la mandamos cualquier peticion que entre desde /api/proyectos lo mandamos a apiRouterproyectos 

router.use('/proyectos',apiRouterProyectos);

module.exports = router;