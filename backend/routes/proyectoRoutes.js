import express from 'express';
import checkAuth from "../middlewares/checkAuth.js"; // middleware de autenticacion

import { 
    obtenerProyectos,
    nuevoProyecto,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminarColaborador,
    obtenerTareas,
 } from "../controllers/proyectoController.js";

 const router = express.Router()

// Para acceder a todas las rutas de Proyecto el usuario necesita estar autenticado

router.route("/")
    .get(checkAuth ,obtenerProyectos)
    .post( checkAuth ,nuevoProyecto)

router.route("/:id")
    .get(checkAuth ,obtenerProyecto)
    .put( checkAuth ,editarProyecto)
    .delete( checkAuth ,eliminarProyecto)

router.get("/tareas/:id", checkAuth , obtenerTareas)
router.post("agregar-colaborador/:id",checkAuth ,agregarColaborador)
router.post("eliminar-colaborador/:id", checkAuth , eliminarColaborador)


 export default router;