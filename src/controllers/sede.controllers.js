import Sede from '../models/sede.model.js'

export const getSedes = async (req, res) => {
    try{
        const sedes = await Sede.find({
        usuario: req.usuario.id
        }).populate('usuario')
        res.json(sedes)
    }catch(error){
        return res.status(500).json({message:"Sede not found"});
    }
}

export const createSedes = async (req, res) => {
    try{
        const {nombre, direccion} = req.body;
        const  newSedes= new Sede({
        nombre,
        direccion,
        })
        const savedSede = await newSedes.save()
        res.json(savedSede)
    }catch(error){
        return res.status(500).json({message:"Task not found"});
    }
}

export const getSede = async (req, res) => {
    try{
     const sede = await Sede.findById(req.params.id).populate('usuario');
     if(!sede) return res.status(404).json({message: 'Task no encontrada'})
     res.json(sede)
    }catch(error){
        return res.status(404).json({message:"Task not found"});
    }
}

export const deleteSedes = async (req, res) => {
    try{
        const sede = await Sede.findByIdAndDelete(req.params.id)
        if(!sede) return res.status(404).json({message: 'Task not found'})
        return res.sendStatus(204);
    }catch(error){
        return res.status(404).json({message:"Task not found"})
    }
}

export const updateSedes = async (req, res) => {
    try{
        const sede = await Sede.findByIdAndUpdate(req.params.id, req.body, {
        new: true
        })
        if(!sede) return res.status(404).json({message: 'Task not found'})
        res.json(sede)
    }catch(error){
        return res.status(404).json({message:"Task not found"})
    }
}
