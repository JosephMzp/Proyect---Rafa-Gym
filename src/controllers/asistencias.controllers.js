import Asistencia from '../models/asistencias.model.js'

export const getAsistencias = async (req, res) => {
    try{
        const asistencias = await Asistencia.find({
        usuario: req.usuario.id
        }).populate('usuario')
        res.json(asistencias)
    }catch(error){
        return res.status(500).json({message:"Task not found"});
    }
}

export const createAsistencias = async (req, res) => {
    try{
        const {fechaIngreso} = req.body;
        const  newAsistencia = new Task({
        fechaIngreso,
        cliente: req.cliente.id,
        sede: req.sede.id,
        })
        const savedAsistencia = await newAsistencia.save()
        res.json(savedAsistencia)
    }catch(error){
        return res.status(500).json({message:"Task not found"});
    }
}

export const getAsistencia = async (req, res) => {
    try{
     const asistencia = await Task.findById(req.params.id).populate('usuario');
     if(!asistencia) return res.status(404).json({message: 'Task no encontrada'})
     res.json(asistencia)
    }catch(error){
        return res.status(404).json({message:"Task not found"});
    }
}

export const deleteAsistencia = async (req, res) => {
    try{
        const asistencia = await Asistencia.findByIdAndDelete(req.params.id)
        if(!asistencia) return res.status(404).json({message: 'Task not found'})
        return res.sendStatus(204);
    }catch(error){
        return res.status(404).json({message:"Task not found"})
    }
}

export const updateAsistencia = async (req, res) => {
    try{
        const asistencia = await Asistencia.findByIdAndUpdate(req.params.id, req.body, {
        new: true
        })
        if(!asistencia) return res.status(404).json({message: 'Task not found'})
        res.json(asistencia)
    }catch(error){
        return res.status(404).json({message:"Task not found"})
    }
}
