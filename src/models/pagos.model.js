import mongoose from "mongoose";

const PagoSchema = new mongoose.Schema({
    idCliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Clientes',
        require: true
    },
    idMembresia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Membresias',
        require: true
    },
    fechaInicio: {
        type: Date,
        default: Date.now,
    },
    fechaPago: {
        type: Date,
        default: () => new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    },
    accesoSedes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sedes"
        // no es required, solo para membresía Básica
    },
    monto: {
        type: Number,
        require: true,
    },
    metodoPago: {
        type: String,
        require: true,
    },
}, {
    timestamps: true
})

export default mongoose.model("Pagos", PagoSchema);