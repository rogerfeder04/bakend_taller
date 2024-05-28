const mongoose = require("mongoose");

const ventaSchema = new mongoose.Schema(
  {
    // Haciendo referencia al carrito de compras
    idcliente: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente" },
    idcarrito: { type: mongoose.Schema.Types.ObjectId, ref: "Carrito" },
    fecha: { type: Date, required: true },
    descuento: { type: Number, default: 0 },
    estado: { type: Number, required: true, default: 1 },
    total: { type: Number, default: 0, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ventas", ventaSchema);
