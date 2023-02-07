import express from "express";

const router = express.Router()

import { 
    homeUsuario, 
    registrarUsuario, 
    autenticarUsuario, 
    confirmarUsuario, 
    forgotPasswordUsuario, 
    checkTokenUsuario, 
    newPasswordUsuario,
    profile
} from "../controllers/usuarioController.js";

import checkAuth from "../middlewares/checkAuth.js";


//ruta raiz provisoria para que no salga el cannot get
router.get("/", homeUsuario)

// LLama a Controllers de Autenticacion, registro y confirmacion de usuarios
router.post("/", registrarUsuario) // crea un nuevo usuario
router.post("/login", autenticarUsuario) // autenticacion de usuarios
router.get("/confirmar/:token", confirmarUsuario) // routing dinamico para confirmar usuarios dependiendo del token
router.post("/forgot-password", forgotPasswordUsuario) // el usuario envia el email para cambiar la contraseña


// Con .route podemos mapear distintos metodos http para la misma uri
// router.get("/forgot-password/:token", checkTokenUsuario) 
// router.post("/forgot-password/:token", newPasswordUsuario)

router.route("/forgot-password/:token")
        .get(checkTokenUsuario) // validamos el token
        .post(newPasswordUsuario) // crea nueva password



router.get("/profile", checkAuth, profile)


export default router;