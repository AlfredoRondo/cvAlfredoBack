const router = require('express').Router();

const proyecto = require('../models/proyecto');
//gestionando peticiones
const apiRouterProyectos = require('./api/proyectos');//recibimos las peticiones desde [./api/proyectos]

//y la mandamos cualquier peticion que entre desde /api/proyectos lo mandamos a apiRouterproyectos 

router.use('/proyectos',apiRouterProyectos);

router.delete('/:proyectoId', async (req, res) =>{
    const proyectoBorrado = await proyecto.findByIdAndDelete(req.params.proyectoId);//eleiminar un proyecto buscandolo por su ide si lo encuentra lo borra
    res.json(proyectoBorrado);
});
module.exports = router;