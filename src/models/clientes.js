const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
    
    nombre: { type: String, required: true, max:50},
    direccion: { type: String, required: true, max:50},
    telefono: { type: String, required: true, max:10},
    email:{  type: String, required: true, max:10},
    documento: { type: String, required: true, default: "",min:8,max:15,unique:true },
    estado: { type: Number, required: true, default: 1 }
}, { timestamps: true })


module.exports= mongoose.model("Cliente", clienteSchema);