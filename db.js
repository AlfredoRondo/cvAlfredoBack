//traemos la librería mongoose
const mongoose = require('mongoose');


//definimos la estructura usamos la url local de mongobd
const urlMongo = process.env.MONGO_URL;

//añadimos la configuracion
const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

//nos conectamos con la base de datos y le pasamos la url [después lo mandamos a app]
mongoose.connect(urlMongo,config);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', (stream) => {
    console.log('connected!');
});

db.once('open', function() {
    console.log("Connection Successful!");
     
    // define Schema
    var BookSchema = mongoose.Schema({
//       name: String,
      price: Number,
      quantity: Number
    });
 
    // compile schema to model
    var Book = mongoose.model('Book', BookSchema, 'bookstore');
 
    // documents array
    var books = [{ name: 'Mongoose Tutorial', price: 10, quantity: 25 },
                    { name: 'NodeJS tutorial', price: 15, quantity: 5 },
                    { name: 'MongoDB Tutorial', price: 20, quantity: 2 }];
 
    // save multiple documents to the collection referenced by Book Model
    Book.collection.insertMany(books, function (err, docs) {
      if (err){ 
          return console.error(err);
      } else {
        console.log("Multiple documents inserted to Collection");
      }
    });
     
});