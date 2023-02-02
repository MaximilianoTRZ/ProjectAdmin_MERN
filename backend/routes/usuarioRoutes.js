import express from "express";

const router = express.Router()

import { homeUsuario, registrarUsuario, autenticarUsuario } from "../controllers/usuarioController.js";

//ruta raiz provisoria para que no salga el cannot get
router.get("/", homeUsuario)

// LLama a Controllers de Autenticacion, registro y confirmacion de usuarios
router.post("/", registrarUsuario) // crea un nuevo usuario
router.post("/login", autenticarUsuario) // autenticacion de usuarios

export default router;