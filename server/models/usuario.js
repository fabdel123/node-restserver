const mongoose = require('mongoose');

// Plugin para no permitir las datos repetidos y hacerlos de forma única
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rolesValidos = {
    values: [ 'ADMIN_ROLE', 'TEACHER_ROLE', 'STUDENT_ROLE'],
    message: '{VALUE} no es un rol válido'
};

let usuarioSchema = new Schema({

    // Esquema del modelo del o los nombres del estudiante
    nombres: {
        type: String,
        required: [true, 'El/Los nombres del estudiante son necesarios']
    },

    // Esquema del modelo del o los apellidos del estudiante
    apellidos: {
        type: String,
        required: [true, 'El/Los apellidos del estudiante son necesarios']
    },

    // Esquema del modelo del correo del estudiante
    codigo: {
        type: String,
        unique: true,
        required: [true, 'El codigo del estudiante es necesario']
    },

    // Esquema del modelo del correo del estudiante
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo del estudiante es necesario']
    },

    // Esquema del modelo de la contraseña del estudiante
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    },

    role: {
        type: String,
        default: 'STUDENT_ROLE',
        enum: rolesValidos
    },

    estado: {
        type: Boolean,
        default: true,
    },

});

// Permite no devolver un valor en la contraseña del usuario
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
};


// Plugin personalizado que arroja un mensaje de error al momento de hacer una petición con un objeto único en la BD
usuarioSchema.plugin( uniqueValidator, { message: '{PATH} debe ser único' } );

module.exports = mongoose.model( 'Usuario', usuarioSchema );