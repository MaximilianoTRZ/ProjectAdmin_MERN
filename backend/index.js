// Contiene la configuracion del server
// Commonjs
// const express = require("express")

//ESM misma sintaxis que Js del cliente con import y export.
import express from "express";

const app = express()

console.log("App Reiniciada..")

app.listen(4000, () => {
    console.log("Servidor corriendo en el puerto 4000")
})
