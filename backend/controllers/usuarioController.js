//Archivo Controlador del routing de usuarios.

import Usuario from "../models/Usuario.js" //importamos el schema de usuario
import generarId from "../helpers/generarId.js" //importamos el generador del id
import generarJWT from "../helpers/generarJWT.js" //importamos el generador del jwt

// ruta raiz de usuario
const homeUsuario =  (res,req) =>{
    req.json({msg: "Ruta raiz de usuarios GET /api/usuarios/" })
}

//crea un nuevo usuario
const registrarUsuario = async (req, res) => {

    // VALIDACION - Para evitar registros duplicados chequeamos que el usuario no exista en la db
    const {email} = req.body //destructuring
    //el await bloquea la linea hasta obtener la respuesta de la base de datos
    const existeUsuario = await Usuario.findOne({ email })

    if (existeUsuario) {
        const error = new Error("Usuario ya registrado")
        return res.status(400).json({ msg: error.message })
    }

    // FUNCIONALIDAD - REGISTRO
    try {
        //creamos un nuevo usuario y lo almacenamos en la bdd
        const usuario = new Usuario(req.body) //crea un objeto con la info del schema

        //el token lo que le enviamos para que confirme el usuario
        usuario.token = generarId() //le ponemos como token el id creado en helpers

        //con await esperamos/bloqueamos a que finalice el guardado del registro, porque no sabemos cuanto puede tardar.
        const usuarioAlmacenado = await usuario.save() // save() guarda el objeto creado en mongodb

        // respuesta del controlador (response)
        res.json(usuarioAlmacenado)

    } catch (error) {
        console.log(error);
    }

    
}

// autenticar los usuarios
// se coloca el async porque vamos a interactuar con la bdd
const autenticarUsuario = async (req, res) => {
    
    const {email, password}= req.body

    //comprobar si el usuario existe
    const usuario = await Usuario.findOne({email})

    if(!usuario){
        const error = new Error("El usuario no existe")
        return res.status(404).json({msg: error.message})
    }

    //comprobar si el usuario esta confirmado
    if (!usuario.confirmado) {
        const error = new Error("tu cuenta no ha sido confirmada.")
        return res.status(403).json({msg: error.message})
    }

    //comprobar su password
    if (await usuario.comprobarPassword(password)) {
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario._id) // generamos el JWT para confirmar la cuenta
        })
    } else {
        const error = new Error("Incorrect password.")
        return res.status(403).json({msg: error.message})
    }
}

const confirmarUsuario = async (req, res) => {
    
    const { token } = req.params; // cuando tenemos routing dinamico, lo buscamos por req.params y no en req.body

    const usuarioConfirmar = await Usuario.findOne({token})

    if (!usuarioConfirmar) {
        const error = new Error("Invalid token.")
        return res.status(403).json({msg: error.message})
    }

    try {
        usuarioConfirmar.confirmado = true
        usuarioConfirmar.token = "" // es un token de un solo uso asi que se elimina despues de confirmar el usuario
        await usuarioConfirmar.save()
        res.json({ msg : "User confirmed succesfully."})
    } catch (error) {
        return res.status(403).json({msg: error.message})
    }
}

const forgotPasswordUsuario = async (req, res) => {

    const {email, password}= req.body

    //comprobar si el usuario existe
    const usuario = await Usuario.findOne({email})
    if(!usuario){
        const error = new Error("The user does not exist.")
        return res.status(404).json({msg: error.message})
    }

    try {
        usuario.token = generarId()
        await usuario.save()
        res.json({ msg: "We have sent an email with instructions to follow."})
    } catch (error) {
        console.log(error)
    }


}

const checkTokenUsuario = async (req, res) => {

    const { token } = req.params //obtenemos el token del routing dinamico desde el params de la request

    const usuarioTokenValido = await Usuario.findOne({token}) // buscamos el usuario que tiene ese token

    if (usuarioTokenValido) {
        return res.status(200).json({msg: "The token is valid and the user exists."})
    } else {
        const error = new Error("Invalid token.")
        return res.status(403).json({msg: error.message})
    }

}

const newPasswordUsuario = async (req, res) => {

    const { token } = req.params //obtenemos el token del routing dinamico desde el params de la request
    const { password } = req.body

    const usuario = await Usuario.findOne({token}) // buscamos el usuario que tiene ese token

    if (usuario) {

        usuario.password = password
        usuario.token = ''

        try {
            await usuario.save()
            return res.status(200).json({msg: "Password changed succesfully."})
        } catch (error) {
            return res.status(400).json({msg: error.message})
        }
        
    } else {
        const error = new Error("Invalid token.")
        return res.status(403).json({msg: error.message})
    }

}

const profile = async (req, res) => {

    const { usuario } = req

    res.json(usuario)

}

export {
    homeUsuario,
    registrarUsuario,
    autenticarUsuario,
    confirmarUsuario,
    forgotPasswordUsuario,
    checkTokenUsuario,
    newPasswordUsuario,
    profile
}