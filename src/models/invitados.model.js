import mongoose from "mongoose";

const invitadosSchema = new mongoose.Schema({
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
    dni: {
        type: Number,
        require: true,
    },
    nombre: {
        type: String,
        require: true,
    },
    telefono:{
        type: Number,
    }
    
}, {
    timestamps: true
})

export default mongoose.model("Invitados", invitadosSchema);