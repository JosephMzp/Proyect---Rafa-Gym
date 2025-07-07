import mongoose from 'mongoose';
import Asistencia from '../models/asistencias.model.js'
import Pago from '../models/pagos.model.js'

export const getAsistencias = async (req, res) => {
    try{
    const filter = {};
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const total = await Asistencia.countDocuments(filter);

    const asistenciasDocs = await Asistencia.find(filter)
      .populate('idCliente')
      .populate('idSede')
      .skip( (page - 1) * limit )
      .limit(limit)
      .sort({ fechaIngreso: -1 , _id: 1});

    return res.json({
      asistencias: asistenciasDocs,
      total, page, totalPages: Math.ceil(total / limit)
    });
    }catch(error){
        return res.status(500).json({message:"Error al obtener asistencias"});
    }
  }

//     try {
//     const { idCliente, idSede } = req.body;

//     const hoyInicio = new Date();
//     hoyInicio.setHours(0, 0, 0, 0);

//     const hoyFin = new Date();
//     hoyFin.setHours(23, 59, 59, 999);

//     // ¿Existe ya una asistencia del cliente hoy?
//     const existe = await Asistencia.exists({
//       idCliente,
//       fechaIngreso: { $gte: hoyInicio, $lt: hoyFin }
//     });

//     if (existe) {
//       return res.status(409).json({ message: "Ya registraste asistencia hoy." });
//     }

//     // Si no existe, guardamos la asistencia
//     const newAsistencia = new Asistencia({ idCliente, idSede });
//     const saved = await newAsistencia.save();
//     res.json(saved);

//   } catch (error) {
//     console.error("Error en createAsistencias:", error);
//     return res.status(500).json({ message: "Asistencia no creada" });
//   }
// }

export const getAsistencia = async (req, res) => {
     try{
      const asistencia = await Asistencia.findById(req.params.id).populate('Clientes');
      if(!asistencia) return res.status(404).json({message: 'Task no encontrada'})
      res.json(asistencia)
     }catch(error){
         return res.status(404).json({message:"Task not found"});
     }
  }

export const createAsistencias = async (req, res) => {
  try {
    const { idCliente, idSede, invitados = 0 } = req.body;
    const hoyInicio = new Date(); hoyInicio.setHours(0,0,0,0);
    const hoyFin = new Date(); hoyFin.setHours(23,59,59,999);

    // Validación de asistencia duplicada
    if (await Asistencia.exists({ idCliente, fechaIngreso: { $gte: hoyInicio, $lt: hoyFin } })) {
      return res.status(409).json({ message: "Ya registraste asistencia hoy." });
    }

    // Obtener último pago con membresía y sede registrada
    const ultimoPago = await Pago.findOne({ idCliente })
      .sort({ fechaPago: -1 })
      .populate("idMembresia")
      .populate("accesoSedes");
    if (!ultimoPago) return res.status(400).json({ message: "Cliente sin membresía activa." });

    const memb = ultimoPago.idMembresia;
    const tipo = memb.tipo; // "Básica", "Fit", "Gold"

    // Validaciones según tipo
    if (tipo === "Básica") {
      if (!ultimoPago.accesoSedes) {
        return res.status(400).json({ message: "No hay sede registrada en el pago." });
      }
      if (idSede.toString() !== ultimoPago.accesoSedes._id.toString()) {
        return res.status(403).json({ message: "Tu membresía Básica solo permite acceso a tu sede registrada." });
      }
    }

    // Validación ingreso diario 
    if ((tipo === "Básica" || tipo === "Fit") && memb.ingreso_diario != null) {
      const countHoy = await Asistencia.countDocuments({ idCliente, fechaIngreso: { $gte: hoyInicio, $lt: hoyFin } });
      if (countHoy >= memb.ingreso_diario) {
        return res.status(409).json({ message: `Has alcanzado tu límite diario de ${memb.ingreso_diario} ingreso(s).` });
      }
    }

    // Validación invitados (Sólo Gold)
    if (tipo === "Gold") {
      const inicioMes = new Date(hoyInicio.getFullYear(), hoyInicio.getMonth(), 1);
      const agg = await Asistencia.aggregate([
        { $match: { idCliente: mongoose.Types.ObjectId(idCliente), fechaIngreso: { $gte: inicioMes } } },
        { $group: { _id: null, usados: { $sum: "$invitados" } } }
      ]);
      const totalUsados = agg[0]?.usados || 0;
      if (invitados > memb.invitados_mensuales || totalUsados + invitados > memb.invitados_mensuales) {
        return res.status(409).json({ message: `Superaste el límite de ${memb.invitados_mensuales} invitados mensuales.` });
      }
    }

    const asistencia = new Asistencia({ idCliente, idSede, invitados });
    const saved = await asistencia.save();

    return res.json(saved);

  } catch (error) {
    console.error("Error createAsistencias:", error);
    return res.status(500).json({ message: "Asistencia no creada." });
  }
};


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
