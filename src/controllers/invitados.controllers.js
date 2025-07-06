import mongoose from 'mongoose'
import Invitado from '../models/invitados.model.js'
import Pago from '../models/pagos.model.js'

export const getInvitados = async (req, res) => {
    // try{
    //     const invitados = await Invitado.find();
    //     res.json(invitados)
    // }catch(error){
    //     return res.status(500).json({message:"Invitado not found"});
    // }
    try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const total = await Invitado.countDocuments();

    const invitadosDocs = await Invitado.find()
      .populate('idCliente')
      .populate('idSede')
      .skip(skip)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    return res.json({ invitados: invitadosDocs, total });
  } catch (error) {
    console.error('Error en getInvitados:', error);
    return res.status(500).json({ message: "Invitado not found" });
  }
}

export const createInvitados = async (req, res) => {
    try {
    const { idCliente } = req.params
    const { idSede, dni, nombre, telefono } = req.body

    const ultimoPago = await Pago.findOne({ idCliente }).limit(1).sort({ fechaPago: -1 }).populate('idMembresia')
        console.log('idCliente recibido:', req.body.idCliente);
console.log('Último pago:', ultimoPago);
    if (!ultimoPago) return res.status(400).json({message: 'Cliente sin membresía activa'})

    const { tipo, invitadosMensuales } = ultimoPago.idMembresia
    if (tipo !== 'Gold') return res.status(403).json({ message: 'Solo miembros Gold pueden registrar invitados.' })

    const inicioMes = new Date()
    inicioMes.setDate(1)
    inicioMes.setHours(0,0,0,0)

    const totalUsados = await Invitado.countDocuments({
      idCliente: new mongoose.Types.ObjectId(idCliente),
      createdAt: { $gte: inicioMes }
    })

    if (totalUsados + 1 > invitadosMensuales) {
      return res.status(409).json({ message: 'Has superado tu límite mensual de invitados.' })
    }

    const newInv = new Invitado({ idCliente,idSede, dni, nombre, telefono })
    const saved = await newInv.save()
    res.status(201).json(saved)

  } catch (error) {
    console.error('Error createInvitado:', error)
    res.status(500).json({ message: 'Error al crear invitado' })
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
