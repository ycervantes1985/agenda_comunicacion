const { Schema, model } = require('mongoose');

const ComunicacionesSchema = new Schema({
    asunto: {
        type: String,
        required: [true, "Debe ingresar un asunto"],
        minlength: [3, "Asunto no puede tener menos de 2 caracteres"]
    },

    comunicacion: {
        type: String,
        required: [true, "Debe ingresar una comunicacion"],
        minlength: [3, "Comunicacion no puede tener menos de 2 caracteres"]
    },

    leido: {
        type: Boolean,   
        default: false             
    },

    tipo: {
        type: String,
        required: [true, "Debe ingresar un tipo"],
    },

    respuesta: {
        type: String,
    },

    foto: {
        default:"https://res.cloudinary.com/dcng4kp6i/image/upload/v1671049268/imgDefault_dljs8t.png",
        type: String,
    },

    
}, { timestamps: true });

const Comunicacion = model('Comunicacion', ComunicacionesSchema);

module.exports = {
    Comunicacion,
    ComunicacionesSchema
};