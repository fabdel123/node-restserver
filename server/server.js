require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Configurar CORS (Para que permita hacer peticiones tanto entrantes como salientes)
app.use( function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-token");
    next();
});

//Configuración Global de Rutas
app.use( require('./routes/index') );

mongoose.connect(process.env.URLDB,
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    },
    (err, res) => {
    if ( err ) throw err;
    console.log('Base de datos ONLINE');
});

app.listen( process.env.PORT, () => {
    console.log('Escuchando comunicación en el puerto:', 3000);
});
