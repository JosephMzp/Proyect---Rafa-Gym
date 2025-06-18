import Task from '../models/task.model.js'

export const getTasks = async (req, res) => {
    try{
        const tasks = await Task.find({
        usuario: req.usuario.id
        }).populate('usuario')
        res.json(tasks)
    }catch(error){
        return res.status(500).json({message:"Task not found"});
    }
}

export const createTasks = async (req, res) => {
    try{
        const {title, description, date} = req.body;
        const  newTask = new Task({
        title,
        description,
        date,
        usuario: req.usuario.id,
        })
        const savedTask = await newTask.save()
        res.json(savedTask)
    }catch(error){
        return res.status(500).json({message:"Task not found"});
    }
}

export const getTask = async (req, res) => {
    try{
     const task = await Task.findById(req.params.id).populate('usuario');
     if(!task) return res.status(404).json({message: 'Task no encontrada'})
     res.json(task)
    }catch(error){
        return res.status(404).json({message:"Task not found"});
    }
}

export const deleteTasks = async (req, res) => {
    try{
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task) return res.status(404).json({message: 'Task not found'})
        return res.sendStatus(204);
    }catch(error){
        return res.status(404).json({message:"Task not found"})
    }
}

export const updateTasks = async (req, res) => {
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true
        })
        if(!task) return res.status(404).json({message: 'Task not found'})
        res.json(task)
    }catch(error){
        return res.status(404).json({message:"Task not found"})
    }
}
