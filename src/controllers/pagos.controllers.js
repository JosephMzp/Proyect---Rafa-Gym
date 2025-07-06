import Pago from '../models/pagos.model.js'
import Membresia from '../models/membresia.model.js'

export const getPagos = async (req, res) => {
    try{
        const filter = {};
        const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const total = await Pago.countDocuments(filter);

    const pagosDocs = await Pago.find(filter)
      .populate('idCliente')
      .populate('idMembresia')
      .skip(skip)
      .limit(Number(limit))
      .sort({ fechaInicio: -1 });

    return res.json({
      pagos: pagosDocs,
      total
    });
        // if (req.query.idCliente) filter.idCliente = req.query.idCliente;
        // if (req.query.idSede) filter.idSede = req.query.idSede;
        // const asistencias = await Asistencia.find(filter)
        // .populate('idCliente')
        // .populate('idSede');
        // res.json(asistencias);
        // const asistencias = await Asistencia.find({
        // idCliente: req.query.idCliente,
        // idSede: req.query.idSede,
        // }).populate('idCliente').populate('idSede')
        // res.json(asistencias)
    }catch(error){
        return res.status(500).json({message:"Pago not found"});
    }
}

export const createPagos = async (req, res) => {
  try {
    const {
      idCliente,
      idMembresia,
      fechaInicio,
      fechaPago,
      accesoSedes,
      monto,
      metodoPago
    } = req.body;

    const ahora = new Date();
    // 1. Verificar si hay un pago activo (fechaPago > ahora)
    const activo = await Pago.findOne({
      idCliente,
      fechaPago: { $gt: ahora }
    });

    if (activo) {
      return res
        .status(409)
        .json({ message: 'El cliente ya tiene un pago activo en este momento' });
    }

    // 2. Crear el nuevo pago (tendrá fechaPago ~ 1 mes desde hoy)
    const newPago = new Pago({
      idCliente,
      idMembresia,
      fechaInicio,
      fechaPago,
      accesoSedes,
      monto,
      metodoPago
    });

    const savedPago = await newPago.save();
    res.status(201).json(savedPago);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Pago no creado' });
  }
};


export const getPago = async (req, res) => {
    try{
     const pago = await Pago.findById(req.params.id).populate('idCliente').populate('idMembresia')
     .populate("accesoSedes");
     if(!pago) return res.status(404).json({message: 'Pago no encontrada'})
     res.json(pago)
    }catch(error){
        return res.status(404).json({message:"Pago not found"});
    }
}

export const ultimoPago = async (req, res) => {
    try{
        const lastPayment = await Pago.findOne({ idCliente })
    .sort({ fechaPago: -1 })
    .populate('idMembresia');

    if (!lastPayment) {
    return res.status(400).json({ message: "Cliente sin membresía activa" });
    }const memb = lastPayment.idMembresia;
    }catch(error){
        return res.status(404).json({message:"Pago not found"});
    }
}

export const deletePago = async (req, res) => {
    try{
        const pago = await Pago.findByIdAndDelete(req.params.id)
        if(!pago) return res.status(404).json({message: 'Pago not found'})
        return res.sendStatus(204);
    }catch(error){
        return res.status(404).json({message:"Pago not found"})
    }
}

export const updatePago = async (req, res) => {
    try{
        const pago = await Pago.findByIdAndUpdate(req.params.id, req.body, {
        new: true
        })
        if(!pago) return res.status(404).json({message: 'Pago not found'})
        res.json(pago)
    }catch(error){
        return res.status(404).json({message:"Pago not found"})
    }
}
