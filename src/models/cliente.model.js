import mongoose from "mongoose";

const clientesSchema = new mongoose.Schema({
    dni: {
        type: Number,
        require: true,
        unique: true
    },
    nombre: {
        type: String,
        require: true,
    },
    apellidos: {
        type: String,
        require: true,
    },
    telefono: {
        type: Number,
        require: true,
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    fechaRegistro: {
        type: Date,
        default: Date.now,
    },
    vencimientoMenbresia: {
        type: Date,
        default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    }
}, {
    timestamps: true
})

export default mongoose.model("Clientes", clientesSchema);