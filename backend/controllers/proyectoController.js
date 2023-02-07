//Archivo Controlador de el routing de Proyectos.

import Proyecto from "../models/Proyecto.js" //importamos el schema de usuario


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

    console.log('desde obtener proyectos')

    // req.proyectos = await Proyectos.findAll()
    // res.status(200).json(req.proyectos)
}

// obtiene un proyecto por id del usuario autenticado 
const obtenerProyecto = async (req, res) => { }

// editar los datos del proyecto
const editarProyecto = async (req, res) => { }

// elimina un proyecto existente
const eliminarProyecto = async (req, res) => { }

// agregar un colaborador existente al proyecto
const agregarColaborador = async (req, res) => { }

// Quitar al colaborador del proyecto pero no de la DB
const eliminarColaborador = async (req, res) => { }

// Pendiente ver si se mueve a otro controlador de Tarea
const obtenerTareas = async (req, res) => { }

export {
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    obtenerTareas,
}