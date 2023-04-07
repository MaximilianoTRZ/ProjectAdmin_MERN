// Este archivo contiene la configuracion del server

// Commonjs
// const express = require("express")

//ESModules - misma sintaxis que Js del cliente con import y export.
import express from "express";
import dotenv from "dotenv"; //variables de entorno para ocultar credenciales
import cors from 'cors';
import conectarDB from "./config/db.js";

//Rutas
import usuarioRoutes from "./routes/usuarioRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";
import tareaRoutes from "./routes/tareaRoutes.js";


const app = express()
app.use(express.json())

dotenv.config()

conectarDB()

//Configuracion cors
const whiteList = ['http://localhost:5173']

//de la doc de cors
const corsOptions = {
    origin: function(origin, callback) {
        if (whiteList.includes(origin)) {
            // Puede consultar la API
            callback(null, true)
        } else {
            // No puede consultar la API
            callback(new Error("Error de CORS"))
        }
    }
}

// middleware con opciones de configuracion de CORS
app.use(cors(corsOptions))

//Routing
//con 'use' podemos usar cualquiera de los 4 verbos (get,post,put,delete) 
app.use("/api/usuarios", usuarioRoutes) 
app.use("/api/proyectos", proyectoRoutes)
app.use("/api/tareas", tareaRoutes)


const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})

