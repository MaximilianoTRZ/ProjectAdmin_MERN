import mongoose from "mongoose";

const proyectosSchema = mongoose.Schema({
    nombre: {
        type: String,
        trim: true,
        required: true,
    },
    descripcion: {
        type: String,
        trim: true,
        required: true
    },
    // Para realizar un date picker con React para la fecha
    fechaEntrega: {
        type: Date,
        default: Date.now(),
    },
    cliente: {
        type: String,
        trim: true,
        required: true
    },
    // creador del proyecto es una relacion con un objeto del tipo Usuario
    creador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    // colaboradores es una relacion con muchos objetos del tipo usuario, ya que pueden haber multiples colaboradores
    colaboradores:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario'
        }
    ],
    },{
        timestamps: true,
    }
);

const Proyecto = mongoose.model("Proyecto",proyectosSchema)
export default Proyecto