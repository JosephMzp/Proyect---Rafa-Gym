import Cliente from '../models/cliente.model.js'

export const getClientes = async (req, res) => {
    try{
        const clientes = await Cliente.find()
        res.json(clientes)
    }catch(error){
        return res.status(500).json({message:"Cliente not found"});
    }
}

export const createClientes = async (req, res) => {
    try{
        const {dni, nombre, apellidos, telefono, email, fechaRegistro, vencimientoMenbresia} = req.body;
        const  newCliente = new Cliente({
        dni, 
        nombre, 
        apellidos, 
        telefono, 
        email, 
        fechaRegistro, 
        vencimientoMenbresia
        })
        const savedCliente = await newCliente.save()
        res.json(savedCliente)
    }catch(error){
        return res.status(500).json({message:"Cliente not found"});
    }
}

export const getCliente = async (req, res) => {
    try{
     const cliente = await Cliente.findById(req.params.id).populate('usuario');
     if(!cliente) return res.status(404).json({message: 'Cliente no encontrada'})
     res.json(cliente)
    }catch(error){
        return res.status(404).json({message:"Cliente not found"});
    }
}

export const getClienteDni = async (req, res) => {
    try{
     const {dni} = req.query;
     if (!dni) return res.status(400).json({ message: "Se requiere DNI" });
     const cliente = await Cliente.findOne({ dni: Number(dni) });
     if(!cliente) return res.status(404).json({message: 'Cliente no encontrado'})
     res.json(cliente)
    }catch(error){
        console.log(error)
        return res.status(404).json({message:"Cliente no encontrado"});
    }
}

export const deleteClientes = async (req, res) => {
    try{
        const cliente = await Cliente.findByIdAndDelete(req.params.id)
        if(!cliente) return res.status(404).json({message: 'Cliente not found'})
        return res.sendStatus(204);
    }catch(error){
        return res.status(404).json({message:"Cliente not found"})
    }
}

export const updateClientes = async (req, res) => {
    try{
        const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, {
        new: true
        })
        if(!cliente) return res.status(404).json({message: 'Cliente not found'})
        res.json(cliente)
    }catch(error){
        return res.status(404).json({message:"Cliente not found"})
    }
}