//importo la librería expresss
const express = require('express');
const app = express();//creo la variable app 

require('dotenv').config();//llamada a la librería dotenv [Que permite acceder al puerto]

require('./db');//enviamos la peticion

const apiRouter = require('./routes/api');

//gestionamos las rutas de peticion de datos al servidor
app.use('/api',apiRouter)//Este método lleva como mínimo dos parámetros son [la ruta, y la funcionan manejadora] //[Nos permite mandar una respuesta según la petición]

//Creamos la constante que permite la conexion con el puerto correspondiente
const PORT = process.env.PORT || 3333;

//una funcion de escucha llamada lisen que el puerto en el que estaremos a la escucha
app.listen(PORT, () => {
    console.log(`servidor escuchando en el puerto ${PORT}!!`);
});





