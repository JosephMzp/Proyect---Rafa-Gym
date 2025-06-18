import mongoose from "mongoose";

const sedesSchema = new mongoose.Schema({
    nombre: {
        type: String,
        require: true,
    },
    direccion: {
        type: String,
        require: true,
    },
}, {
    timestamps: true
})

export default mongoose.model("Sedes", sedesSchema);