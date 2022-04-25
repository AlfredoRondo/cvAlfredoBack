const router = require('express').Router();
const moment = require('moment');
const jwt = require ('jwt-simple');

const proyecto = require('../models/proyecto');
//gestionando peticiones
const apiRouterProyectos = require('./api/proyectos');//recibimos las peticiones desde [./api/proyectos]

//y la mandamos cualquier peticion que entre desde /api/proyectos lo mandamos a apiRouterproyectos 

const middlewares = require('./middlewares');

router.use('/proyectos',middlewares.checkToken,apiRouterProyectos);

//petición get token (obteniendo el token craremos un objeto con un usuario) 
router.get('/token',(req, res) => {
    //lanzamos la creación del token 
    let payload = {//creando un usuario
        usuario: 'Alfredo',
        createdAd: moment().unix(),//Nos dice la fecha de creación del token 
        expiredAt: moment().add(5, 'days').unix()
    };
    //incriptando el payload y la clave utilizada en .env
    const token = jwt.encode(payload, process.env.SECRET_KEY);
    console.log.apply(token);
    res.json({token});//respondemoos con un json pansandole la variable token.
})

/*router.delete('/:proyectoId', async (req, res) =>{
    const proyectoBorrado = await proyecto.findByIdAndDelete(req.params.proyectoId);//eleiminar un proyecto buscandolo por su ide si lo encuentra lo borra
    res.json(proyectoBorrado);
});*/

module.exports = router;