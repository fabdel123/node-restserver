const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const app = express();

app.post('/login', function (req, res)  {

    let body = req.body;

    // console.log(Usuario.findOne({ email: body.email }, (err, usuarioDB)));

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

       console.log(usuarioDB);
        //console.log(err);
        //console.log(res);

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrectos'
                }
            });
        }


        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrectos'
                }
            });
        }

        if (err) {
            return res.status(500).json({
                ok: false,
                err: {
                    message: 'Error de conexión con BD'
                }
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });

    });

});







module.exports = app;