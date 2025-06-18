import mongoose from "mongoose";

const asistenciaSchema = new mongoose.Schema({
    idCliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        require: true
    },
    idSede: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sede',
        require: true
    },
    fechaIngreso: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true
})

export default mongoose.model("Asistencias", asistenciaSchema);