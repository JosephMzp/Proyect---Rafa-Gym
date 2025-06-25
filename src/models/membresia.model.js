import mongoose from "mongoose";

const membresiasSchema = new mongoose.Schema({
    tipo: {
        type: String,
        require: true,
        unique: true
    },
    costo: {
        type: Number,
        require: true,
    },
    accesoSedes: {
        type: String,
        require: true,
    },
    ingresoDiario: {
        type: Number,
        require: true,
    },
    asesoramiento:{
        type: Boolean,
        required: true,
    },
    invitadosMensuales: {
        type: Number,
        require: true,
    }
}, {
    timestamps: true
})

export default mongoose.model("Membresias", membresiasSchema);