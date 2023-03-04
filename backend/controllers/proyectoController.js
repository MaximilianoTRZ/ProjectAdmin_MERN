//Archivo Controlador del routing de Proyectos.
import Proyecto from "../models/Proyecto.js" //importamos el schema de proyecto
import Tarea from "../models/Tarea.js" //importamos el schema de tarea


// crea un proyecto
const nuevoProyecto = async (req, res) => { 
    const nuevoProyecto = new Proyecto(req.body)
    nuevoProyecto.creador = req.usuario._id // Le asignamos el usuario autenticado como creador del proyecto
    try {
       const proyectoGuardado = await nuevoProyecto.save() // guardamos en la DB
        return res.status(200).json(proyectoGuardado)   
    } catch (error) {
        return res.status(403).json({msg: error.message})
    }
}

// trae los proyectos del usuario autenticado
const obtenerProyectos = async (req, res) => {
    //traemos los proyectos que pertenecen al usuario autenticado
    const proyectos = await Proyecto.find().where('creador').equals(req.usuario) 
    return res.status(200).json(proyectos)
}

// obtiene un proyecto por id del usuario autenticado 
const obtenerProyecto = async (req, res) => {
    // tomamos el id del routing dinamico
    const { id } = req.params
    try {
        //traemos un proyecto que pertenecen al usuario autenticado
        const proyectoObtenido = await Proyecto.findById(id) //.where('creador').equals(req.usuario) 

        // if (!proyectoObtenido) {
        //     const error = new Error('Proyecto no encontrado.')
        //     return res.status(404).json({ msg: error.message })
        // }

        if (proyectoObtenido.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('Solo el creador o colaborador puede obtener un proyecto.')
            return res.status(401).json({ msg: error.message })
        }

        //Obtener las tareas del proyecto
        const tareas = await Tarea.find().where("proyecto").equals(proyecto._id)

        // response con el proyecto y sus tareas 
        res.status(200).json({
            proyectoObtenido, 
            tareas
        })
    } catch (error) {
        return res.status(404).json({ msg: 'Proyecto no encontrado.' })
    }

 }

// editar los datos del proyecto
const editarProyecto = async (req, res) => {
    const { id } = req.params
    try {
        const proyectoObtenido = await Proyecto.findById(id) 

        if (proyectoObtenido.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('Solo el creador puede editar un proyecto.')
            return res.status(401).json({ msg: error.message })
        }

        proyectoObtenido.nombre = req.body.nombre || proyectoObtenido.nombre
        proyectoObtenido.descripcion = req.body.descripcion || proyectoObtenido.descripcion
        proyectoObtenido.fechaEntrega = req.body.fechaEntrega || proyectoObtenido.fechaEntrega
        proyectoObtenido.cliente = req.body.cliente || proyectoObtenido.cliente

        const proyectoAlmacenado = await proyectoObtenido.save()
        return res.status(200).json(proyectoAlmacenado)
    } catch (error) {
        return res.status(404).json({ msg: error.message })
    }
 }

// elimina un proyecto existente
const eliminarProyecto = async (req, res) => {
    const { id } = req.params
    try {
        const proyectoObtenido = await Proyecto.findById(id) 

        if (proyectoObtenido.creador.toString() !== req.usuario._id.toString()) {
            const error = new Error('Solo el creador puede eliminar un proyecto.')
            return res.status(401).json({ msg: error.message })
        }

        await proyectoObtenido.deleteOne()
        return res.status(204).json({ msg: "Proyecto eliminador con éxito."}) // 204 No Content (Se eliminó correctamente y no devuelve contenido)

    } catch (error) {
        return res.status(404).json({ msg: 'Proyecto no encontrado.' })
    }
 }

// agregar un colaborador existente al proyecto
const agregarColaborador = async (req, res) => { }

// Quitar al colaborador del proyecto pero no de la DB
const eliminarColaborador = async (req, res) => { }

export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
}