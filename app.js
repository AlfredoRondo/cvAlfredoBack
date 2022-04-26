//importo la librería expresss
const express = require('express');
//variable que nos permite conectarnos al cors 
const cors = require('cors');
const exphbs = require('express-handlebars');
const app = express();//creo la variable app 

require('dotenv').config();//llamada a la librería dotenv [Que permite acceder al puerto]
require('./db');//enviamos la peticion

const apiRouter = require('./routes/api');//Almacemanos en una constante la ruta de los proyectos
const proyectosRouter = require('./routes/proyectos');//dirección donde se alojan los proyectos
//const req = require('express/lib/request');

//defino el motor de rutas  router template engine setup
/*app.engine('hbs', exphbs.engine(
    { extname: '.hbs', layoutsDir: './views/layouts' })); */
app.engine('.hbs',exphbs.engine({ extname: '.hbs'}));//.engine({extname: '.hbs'})
app.set('view engine', '.hbs');

//importamos express static 
//app.use(express.static('public'));

//gestionamos las rutas de peticion de datos al servidor
//usamos la conección
app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.use('/api',apiRouter);//Este método lleva como mínimo dos parámetros son [la ruta, y la funcionan manejadora] //[Nos permite mandar una respuesta según la petición]
//Si llega una peticion con proyectos lo enviamos a proyecotos
app.use('/proyectos', proyectosRouter);

//Creamos la constante que permite la conexion con el puerto correspondiente
const PORT = process.env.PORT || 3333;
//una funcion de escucha llamada lisen que el puerto en el que estaremos a la escucha
app.listen(PORT, () => {
    console.log(`servidor escuchando en el puerto ${PORT}!!`);
});





