import Membresia from '../models/membresia.model.js'

export const getMembresias = async (req, res) => {
    try{
        const membresias = await Membresia.find()
        res.json(membresias)
    }catch(error){
        return res.status(500).json({message:"Membresia not found"});
    }
}

export const createMembresias = async (req, res) => {
    try{
        const {tipo, costo,  ingresoDiario, asesoramiento, invitadosMensuales} = req.body;
        const  newMembresia = new Membresia({
        tipo, 
        costo, 
        ingresoDiario, 
        asesoramiento, 
        invitadosMensuales
        })
        const savedMembresia = await newMembresia.save()
        res.json(savedMembresia)
    }catch(error){
        return res.status(500).json({message:"Cliente not found"});
    }
}

export const getMembresia = async (req, res) => {
    try{
     const membresia = await Membresia.findById(req.params.id);
     if(!membresia) return res.status(404).json({message: 'Membresia no encontrada'})
     res.json(membresia)
    }catch(error){
        return res.status(404).json({message:"Membresia not found"});
    }
}

export const deleteMembresia = async (req, res) => {
    try{
        const membresia = await Membresia.findByIdAndDelete(req.params.id)
        if(!membresia) return res.status(404).json({message: 'Membresia not found'})
        return res.sendStatus(204);
    }catch(error){
        return res.status(404).json({message:"Membresia not found"})
    }
}

export const updateMembresia = async (req, res) => {
    try{
        const membresia = await Membresia.findByIdAndUpdate(req.params.id, req.body, {
        new: true
        })
        if(!membresia) return res.status(404).json({message: 'Membresia not found'})
        res.json(membresia)
    }catch(error){
        return res.status(404).json({message:"Membresia not found"})
    }
}