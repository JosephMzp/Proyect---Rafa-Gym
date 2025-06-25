import Invitado from '../models/invitados.model.js'

export const getInvitados = async (req, res) => {
    try{
        const invitados = await Invitado.find({
        cliente: req.cliente.id
        }).populate('cliente')
        res.json(invitados)
    }catch(error){
        return res.status(500).json({message:"Invitado not found"});
    }
}

export const createInvitados = async (req, res) => {
    try{
        const {dni, nombre, fechaVisita} = req.body;
        const  newInvitado = new Invitado({
        dni,
        nombre,
        fechaVisita,
        cliente: req.cliente.id,
        })
        const savedInvitado = await newInvitado.save()
        res.json(savedInvitado)
    }catch(error){
        return res.status(500).json({message:"Invitado not found"});
    }
}

export const getInvitado = async (req, res) => {
    try{
     const invitado = await Invitado.findById(req.params.id).populate('cliente');
     if(!invitado) return res.status(404).json({message: 'Invitado no encontrada'})
     res.json(invitado)
    }catch(error){
        return res.status(404).json({message:"Invitado not found"});
    }
}

export const deleteInvitado = async (req, res) => {
    try{
        const invitado = await Invitado.findByIdAndDelete(req.params.id)
        if(!invitado) return res.status(404).json({message: 'Invitado not found'})
        return res.sendStatus(204);
    }catch(error){
        return res.status(404).json({message:"Invitado not found"})
    }
}

export const updateInvitado = async (req, res) => {
    try{
        const invitado = await Invitado.findByIdAndUpdate(req.params.id, req.body, {
        new: true
        })
        if(!invitado) return res.status(404).json({message: 'Invitado not found'})
        res.json(invitado)
    }catch(error){
        return res.status(404).json({message:"Invitado not found"})
    }
}
