//Al ser un fichero manejador de rutas ponemos lo siguiente
const router = require('express').Router();

//Importamos el modelo del proyecto
const Proyecto = require('../../models/proyecto');

router.get('/',(req,res) => {

    //genero un objeto de tipo proyecto 
    let proyecto = new Proyecto();

    //modificamos su título 
    proyecto.titulo = 'Proyecto de prueba';
    
    //salvamos el titulo 
    proyecto.save().then((p) =>{
        console.log(p);
    }).catch(err => {
        console.log(err);
    })
    res.send('Estoy ya donde tengo que estar');
})
//Exportamos la ruta
module.exports = router;