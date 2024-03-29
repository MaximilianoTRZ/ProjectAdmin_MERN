import Proyecto from '../models/Proyecto.js'
import Tarea from '../models/Tarea.js'



const agregarTarea = async (req, res) => {
    const { proyecto } = req.body

    const existeProyecto = await Proyecto.findById(proyecto)

    if (!existeProyecto) {
        const error = new Error('El proyecto no existe')
        return res.status(404).json({msg: error.message})
    }

    if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
        const error = new Error('No tienes los permisos para añadir tareas')
        return res.status(401).json({msg: error.message}) 
    }

    try {
        const tareaAlmacenada = await Tarea.create(req.body)
        return res.status(200).json(tareaAlmacenada)
    } catch (error) {
        console.log(error)
    }
}

const obtenerTarea = async (req, res) => {

    const { id } = req.params

    try {
        // populate trae los datos del proyecto relacionado en esa variable haciendo solo una consulta.
        const tarea = await Tarea.findById(id).populate('proyecto') 
        
        if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('Acción no válida.')
            return res.status(403).json({msg: error.message}) 
        }

        return res.status(200).json(tarea)

    } catch (error) {
        console.log(error.message)
    }
}

const actualizarTarea = async (req, res) => {

    const { id } = req.params

    try {
        const tarea = await Tarea.findById(id).populate('proyecto') 

        if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('Acción no válida.')
            return res.status(403).json({msg: error.message}) 
        }

        tarea.nombre = req.body.nombre || tarea.nombre
        tarea.descripcion = req.body.descripcion || tarea.descripcion
        tarea.prioridad = req.body.prioridad || tarea.prioridad
        tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega

        const tareaAlmacenada = await tarea.save()
        res.status(200).json(tareaAlmacenada)

    } catch (error) {
        console.log(error.message)
    }
}


const eliminarTarea = async (req, res) => {

    const { id } = req.params
    
    try {
        const tarea = await Tarea.findById(id).populate('proyecto') 

        // if (!tarea) {
        //     const error = new Error('Tarea no encontrada.')
        //     return res.status(404).json({msg: error.message}) 
        // }

        if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('Acción no válida.')
            return res.status(403).json({msg: error.message}) 
        }

        await tarea.deleteOne()
        res.status(204).json({ msg : 'Tarea eliminada con éxito.' })

    } catch (error) {
        res.status(404).json({ msg : 'Tarea no encontrada.' })
    }
}

const cambiarEstadoTarea = async (req, res) => {}


export {
    agregarTarea,
    obtenerTarea,
    actualizarTarea,
    eliminarTarea,
    cambiarEstadoTarea,
}