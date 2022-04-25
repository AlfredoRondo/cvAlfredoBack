//Al ser un fichero manejador de rutas ponemos lo siguiente
const router = require('express').Router();
//uso del check y validation [check = peticiones de comprobación de errores si estan bien los datos devueltos] [con el reusult = refleja el resumen de todos los errores]
const {check, validationResult} = require('express-validator');
//const proyecto = require('../../models/proyecto');

//Importamos el modelo del proyecto
const Proyecto = require('../../models/proyecto');

router.get('/', async (req,res) => {
    console.log(req.payload);
    //Esperamos que se carguen todos los proyectos y los recuperamos al hacer la petición a la base de datos
    try{
        const proyectos = await Proyecto.find({}).lean();
        //recibimos los proyectos
       const arrMap = proyectos.map(proyecto =>{
            if (proyecto.imagen){
                console.log(proyecto.imagen.indexOf('/'));
            }
            let imagen = proyecto.imagen ? proyecto.imagen.substring(proyecto.imagen.indexOf('/')+1): '';
            return {...proyecto, imagen: imagen}
        });
        res.json(arrMap);
    }catch(err){
        res.status(503).json({'error': err});//devolvemos el estado del programa es decir si hay error se reflejará aquí 
    }

});

router.get('/categoria/:categoria',async(req,res)=>{
    try{
        const proyectos = await Proyecto.find({categoria:req.params.categoria});
        res.json(proyectos);
    }catch(err){
        res.status(503).json({'error': err});
    }
});

//recuperar todos los proyectos desde un id del  proyecto
router.get('/:idProyecto', async(req,res) => {
    try{
        const proyecto = await Proyecto.findById(req.params.idProyecto);
        res.json(proyecto);
    }catch(err){
        res.status(503).json({'error': err});   
    }
});

//Me creo la petición post comprobando enl erro al omitir el título
router.post('/',[
    check('titulo','El título debe incluirse en la petición longitud máxima 40 carácteres')
    .exists()
    .notEmpty()
    .isLength({max: 40}),
    check('descripcion','La descripción debe incluirse en la petición longitud máxima 400 caracteres')
    .exists()
    .notEmpty()
    .isLength({max: 400}),
    check('url','La url del proyecto debe estar correcta').isURL()
],async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array()});
    }

    //realizamos un async awit y le devolvemos el nuevo proyecto json cuando no haya ningun error 
    try{const nuevoProyecto = await Proyecto.create(req.body);
    res.json(nuevoProyecto);
    }catch(err){
        res.status(503).json({'error': err});//en caso de que nos de error capturamos el mismo
    }
});

//PUT
router.put('/:proyectoId', async(req,res)=>{
    try{
        const proyectoEditado = await Proyecto.findByIdAndUpdate(req.params.proyectoId, req.body, {new: true});
        res.json(proyectoEditado);
    }catch (err){
        res.status(503).json({'error': err});
    }
});

//Peticion para BORRAR información del proyecto 
router.delete('/:proyectoId',async(req,res)=>{
    try{
        const proyectoBorrado = await Proyecto.findByIdAndDelete(req.params.proyectoId);
        res.json(proyectoBorrado);
    }catch(err){
        res.status(503).json({'error': err});
    }
});

//Exportamos la ruta
module.exports = router;