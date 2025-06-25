import Asistencia from '../models/asistencias.model.js'

export const getAsistencias = async (req, res) => {
    try{
        const filter = {};
        const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const total = await Asistencia.countDocuments(filter);

    const asistenciasDocs = await Asistencia.find(filter)
      .populate('idCliente')
      .populate('idSede')
      .skip(skip)
      .limit(Number(limit))
      .sort({ fechaIngreso: -1 });

    return res.json({
      asistencias: asistenciasDocs,
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
        return res.status(500).json({message:"Task not found"});
    }
}

export const createAsistencias = async (req, res) => {
    // try{
    //     const {idCliente,idSede,fechaIngreso} = req.body;
    //     const  newAsistencia = new Asistencia({
    //     idCliente,
    //     idSede,
    //     fechaIngreso,
    //     })
    //     const savedAsistencia = await newAsistencia.save()
    //     res.json(savedAsistencia)
    // }catch(error){
    //     return res.status(500).json({message:"Asistencia no creada"});
    // }
    try {
    const { idCliente, idSede } = req.body;

    const hoyInicio = new Date();
    hoyInicio.setHours(0, 0, 0, 0);

    const hoyFin = new Date();
    hoyFin.setHours(23, 59, 59, 999);

    // ¿Existe ya una asistencia del cliente hoy?
    const existe = await Asistencia.exists({
      idCliente,
      fechaIngreso: { $gte: hoyInicio, $lt: hoyFin }
    });

    if (existe) {
      return res.status(409).json({ message: "Ya registraste asistencia hoy." });
    }

    // Si no existe, guardamos la asistencia
    const newAsistencia = new Asistencia({ idCliente, idSede });
    const saved = await newAsistencia.save();
    res.json(saved);

  } catch (error) {
    console.error("Error en createAsistencias:", error);
    return res.status(500).json({ message: "Asistencia no creada" });
  }
}

export const getAsistencia = async (req, res) => {
    try{
     const asistencia = await Asistencia.findById(req.params.id).populate('Clientes');
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
