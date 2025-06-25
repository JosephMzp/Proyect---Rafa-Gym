import mongoose from "mongoose";

const asistenciaSchema = new mongoose.Schema({
    idCliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clientes',
        require: true
    },
    idSede: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sedes',
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