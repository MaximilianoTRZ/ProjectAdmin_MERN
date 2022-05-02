import express from "express";
const router = express.Router()

import { registrar, autenticar } from "../controllers/usuarioController.js";

//pa que no salga el cannot get :v
router.get("/", (res,req) =>{
    req.send("<h1>En proceso :D</h1>")
})

// Autenticacion, registro y confirmacion de usuarios
router.post("/", registrar) //crea un nuevo usuario.
router.post("/login", autenticar) //autenticacion de usuarios

export default router;