//Cremos el esquema de mongoose
const mongoose = require('mongoose');

//Necesitamos tambien el objeto esquema que es con el que vamos a crear el modelo
const Schema = mongoose.Schema;

//Generamos el esquema para el proyecto
let proyectoSchema = new Schema ({
    titulo: String,
    descripcion: String,
    url: String,
    cliente: String,
    url_cliente: String
});

//exportar la llamada al metodo mongoose que es quien nos crea el modelo
module.exports = mongoose.model('Proyecto',proyectoSchema);