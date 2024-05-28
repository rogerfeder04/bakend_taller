


// const jwt = require('jsonwebtoken');
const usuarios=require('../routes/usuarios')
const mongoose = require('mongoose');

// const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
    // idproducto: { type: mongoose.Schema.Types.ObjectId,ref:'Producto' },
    email: { type: String, required: true, unique:true },
    password: { type: String, required: true, default: "",min:8,max:15 },
    estado: { type: Number, required: true, default: 1 }
}, { timestamps: true });

// usuarioSchema.methods.comparePassword = async (candidatePassword) => {
//     try {
//         const isMatch = await bcrypt.compare(candidatePassword, this.password);
//         return isMatch;
//     } catch (error) {
//         throw new Error('Error comparacion contraseñas');
//     }
// }
module.exports= mongoose.model("Usuario", usuarioSchema)
