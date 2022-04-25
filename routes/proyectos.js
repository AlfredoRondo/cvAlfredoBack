//Obtenemos el router 
const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'public/images'});
const fs = require('fs');

const Proyecto = require('../models/proyecto');

//petición deonde vamos devolviendo todos los proyectos
router.get('/', async (req,res) => {
    const proyectos = await Proyecto.find().lean();
    console.log(proyectos);
    res.render('proyectos/index', { proys: proyectos});
});

router.get('/edit/:proyectoId', async (req,res) => {
    const proyecto = await Proyecto.findById(req.params.proyectoId).lean();
    res.render('proyectos/formEdit', {proy: proyecto});
});

//Mostrando formularios de la carperta routes>proyectos
router.get('/new', async(req, res) => {
    //var fulUrl = req.protocol + '://' + req.get('host'); 
    res.render('proyectos/formulario');
});

//Creando proyectos
router.post('/create', upload.single('imagen'), async(req, res) => {
    //Gestionando la imagen
    //console.log(req.file);
    const finalPath = req.file.path + '.' + mimeTypeExtension(req.file.mimetype);
    fs.renameSync(req.file.path, finalPath);
    
    req.body.imagen = finalPath;

    try{
        const proyecto = await Proyecto.create(req.body);
        res.redirect('/proyectos');
    }catch(err){
        res.json({error: err});
    }
});

//Actualizando proyecto
//Creando proyectos
router.post('/upload', upload.single('imagen'), async(req, res) => {
    //Gestionando la imagen
    const finalPath = req.file.path + '.' + mimeTypeExtension(req.file.mimetype);
    fs.renameSync(req.file.path, finalPath);
    
    req.body.imagen = finalPath;

    try{
        await Proyecto.findByIdAndUpdate(req.body.proyectoId, req.body);
        res.redirect('/proyectos');
    }catch(err){
        res.json({error: err});
    }
});

function mimeTypeExtension(mimeType){ 
      return mimeType.split('/')[1]; 
}
module.exports = router;