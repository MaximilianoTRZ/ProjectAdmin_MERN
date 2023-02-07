//Archivo Controlador de el routing de Proyectos.

import Proyectos from "../models/Proyectos.js" //importamos el schema de usuario

// ruta raiz de Proyectos
const homeProyectos =  (res,req) =>{
    req.json({msg: "Ruta raiz de Proyectos GET /api/proyectos/" })
}

// trae los proyectos del usuario autenticado
const obtenerProyectos = async (req, res) => { }

// crea un proyecto
const nuevoProyecto = async (req, res) => { }

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
}