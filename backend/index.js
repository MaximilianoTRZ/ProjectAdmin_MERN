// Este archivo contiene la configuracion del server

// Commonjs
// const express = require("express")

//ESModules - misma sintaxis que Js del cliente con import y export.
import express from "express";
import dotenv from "dotenv"; //variables de entorno para ocultar credenciales
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";


const app = express()
app.use(express.json())

dotenv.config()

conectarDB()

//Routing
//con 'use' podemos usar cualquiera de los 4 verbos (get,post,put,delete) 
app.use("/api/usuarios", usuarioRoutes) 
app.use("/api/proyectos", proyectoRoutes)


const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

