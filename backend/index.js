// Este archivo contiene la configuracion del server

// Commonjs
// const express = require("express")

//ESModules - misma sintaxis que Js del cliente con import y export.
import express from "express";
import dotenv from "dotenv"; //variables de entorno para ocultar credenciales
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";

const app = express()
app.use(express.json())

dotenv.config()

conectarDB()

//Routing
//registramos las rutas
app.use("/api/usuarios", usuarioRoutes) //con 'use' podemos usar cualquiera de los 4 verbos (get,post,put,delete) 



const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

