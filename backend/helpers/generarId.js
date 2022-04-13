//los helpers son funciones que puedes llamar en distintas partes de la app para ayudar en algo.

const generarId = () => {
    //genera una cadena con letras y numeros
    const random = Math.random().toString(32).substring(2)
    const fecha = Date.now().toString(32)
    const id = random + fecha //generamos un id con las dos cadenas generadas arriba.
    return id; 
}

export default generarId;