const { json, text } = require('express');
const mongoose =require('mongoose');

const detalleventaSchema = new mongoose.Schema({
    idventa: { type: mongoose.Schema.Types.ObjectId, ref: 'Venta' }, // ID de la venta asociada
    idproducto: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto' }, // ID del producto vendido
    sistema_pago: { type: String, required: true, max:50} //formas de pago
}, { timestamps: true })

module.exports=mongoose.model("Detalleventa", detalleventaSchema)
