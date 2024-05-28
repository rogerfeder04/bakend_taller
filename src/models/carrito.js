
const mongoose = require('mongoose');
const Producto=require('../routes/producto');

const carritoSchema = new mongoose.Schema({
    idcliente: { type: mongoose.Schema.Types.ObjectId,ref:'cliente' },
    idproducto: { type: mongoose.Schema.Types.ObjectId,ref:'producto' },
    cantidad: { type: Number, required: true },
    estado: { type: String, required: true, default: "",min:8,max:15 },
    total: { type: Number, required: true, default: 1 }
}, { timestamps: true })


module.exports= mongoose.model("Carrito", carritoSchema);