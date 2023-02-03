import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    token: {
        type: String
    },
    confirmado: {
        type: Boolean,
        default: false
    }
  },
  {
      timestamps: true,
  }
)

// MIDDLEWARE de Mongoose
// .pre se dispara antes de guardar el objeto
// es decir se ejecuta cuando en el controlador se ejecuta el .save (antes de) para guardar el objeto
//usuarioSchema es el objeto con la estructurad de arriba
usuarioSchema.pre("save", async function(next) {
    //si no se modifica el password, no se vuelve a hashear el pass
    // this es el objeto que queremos guardar del usuario
    if (!this.isModified("password")){
        next() //no ejecuta lo que sigue pero a diferencia del return, manda a ejecutar el siguiente middleware
    }
    const salt = await bcrypt.genSalt(10) //genera un hash de 10 rondas para hashear la pass
    this.password = await bcrypt.hash(this.password, salt) //hashea la pass y utiliza el hash que generamos
    //estar atento a las librerias de hasheo porque dejan de dar soporte al hasheo
})

//comprueba el password que el usuario ingresa al formlario y lo compara con el password
// de la instancia actual de usuario.
usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password)
}

const Usuario = mongoose.model("Usuario",usuarioSchema)

export default Usuario;