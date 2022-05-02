//Archivo Controlador de el routing de usuarios.

import Usuario from "../models/Usuario.js" //importamos el schema de usuario
import generarId from "../helpers/generarId.js" //importamos el generador del id


//crea un nuevo usuario
const registrar = async (req, res) => {

    //Evitar registros duplicados
    const {email} = req.body //destructuring
    const existeUsuario = await Usuario.findOne({ email })

    if (existeUsuario) {
        const error = new Error("Usuario ya registrado")
        return res.status(400).json({ msg: error.message })
    }

    try {
        //creamos un nuevo usuario y lo almacenamos en la bdd
        const usuario = new Usuario(req.body) //crea un objeto con la info del schema
        //el token lo que le enviamos para que confirme el usuario
        usuario.token = generarId() //le ponemos como token el id creado en helpers
        //con await esperamos/bloqueamos a que finalice el guardado del registro, porque no sabemos cuanto puede tardar.
        // save() guarda el objeto creado en mongodb
        const usuarioAlmacenado = await usuario.save() 
        res.json(usuarioAlmacenado)

    } catch (error) {
        console.log(error);
    }

    
}

// autenticar los usuarios
// se coloca el async porque vamos a interactuar con la bdd
const autenticar = async () => {
    
}




export {
    registrar,
    autenticar
}