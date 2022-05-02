import jwt from "jsonwebtoken";

const generarJWT = (id) => {
    //genera el jwt a partir de el id del usuario y una palabra secreta que definimos nosotros
    //tambien le decimos que expira en 30 dias
    return jwt.sign( {id}, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })
}

//en https://jwt.io/ podemos ver la informacion que contiene un JWT

export default generarJWT