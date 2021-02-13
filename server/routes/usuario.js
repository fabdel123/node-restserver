const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');
const app = express();
// const { verificaToken } = require('../middlewares/autenticacion');

//PETICIÓN GET
// app.get('/usuario', verificaToken, (req, res) => {
   app.get('/user', function (req, res)  {

    // Controla desde que pagina envía la paginación
    let desde = req.query.desde || 0;
    desde = Number(desde);

    // Controla el limite de registros que se solicita por pagina
    let limite = req.query.limite || 5;
    limite = Number(limite);

            // Entrega paginación por valores de 5 los datos entregados de busqueda
            Usuario.find({ estado: true })
            .skip(desde)
            .limit(limite)
            .exec( (err, usuarios) => {

                if ( err ) {
                   return res.status( 400 ).json({
                    ok: false,
                    err
                });
            }
            Usuario.countDocuments({ estado: true }, (err, conteo) => {

                res.json({
                    ok: true,
                    usuarios,
                    Total_registros: conteo
            });

            });


    });

});
// PETICIÓN POST
// app.post('/usuario', verificaToken, function(req, res) {
    app.post('/user/create', function (req, res) {

        let body = req.body;

        let usuario = new Usuario({

            nombres: body.nombres,
            apellidos: body.apellidos,
            codigo: body.codigo,
            email: body.email,
            password: bcrypt.hashSync( body.password,10 ),
            role: body.role,
        });

        usuario.save( (err, usuarioDB) => {

            if ( err ) {
                return res.status( 400 ).json( {
                    ok: false,
                    err
                });
            }


            // usuario.password = null;


            res.json({
                ok: true,
                usuario: usuarioDB
            });
        });
    });


//PETICIÓN PUT
// app.put('/usuario/:id', [verificaToken], function (req, res) {
    app.put('/user/update/:id', function (req, res) {

        // const user = {
        //     nombres: req.body.nombres || req.usuario.nombres,
        //     apellidos: req.body.apellidos || req.usuario.apellidos,
        //     email : req.body.email  || req.usuario.email,
        //     password : req.body.password  || req.usuario.email,
        // }

        let _id = req.params.id;
        let body = _.pick( req.body, ['nombres', 'apellidos', 'email', 'codigo', 'role', 'estado'] );

        Usuario.findByIdAndUpdate( _id, body, { new: true }, ( err, usuarioDB ) => {

            if ( err ) {
                return res.status( 400 ).json( {
                    ok: false,
                    err
                });
            }

            res.json({
               ok: true,
               usuario: usuarioDB
            });

        });

    });


//PETICIÓN DELETE
    // app.delete('/usuario/:id', [verificaToken], function (req, res) {
    app.delete('/delete/:id', function ( req, res ) {
        let id = req.params.id;
        let cambiarEstado = {
            estado: false
        };

        Usuario.findByIdAndUpdate(id, cambiarEstado, { new: true }, (err, estadoUsuario) => {
        // Usuario.findByIdAndUpdate( id, { new: true }, ( err, estadoUsuario ) => {

            res.json({
                ok: true,
                message: 'Se ha deshabilitado el usuario correctamente',
                usuario: estadoUsuario
            });


        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
    });

});

module.exports = app;