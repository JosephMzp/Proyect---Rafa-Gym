import mongoose from "mongoose";

const invitadosSchema = new mongoose.Schema({
    idCliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cliente',
        require: true
    },
    dni: {
        type: Number,
        require: true,
    },
    nombre: {
        type: String,
        require: true,
    },
    fechaVisita: {
        type: Date,
        default: Date.now,
    },
    
}, {
    timestamps: true
})

export default mongoose.model("Invitados", invitadosSchema);