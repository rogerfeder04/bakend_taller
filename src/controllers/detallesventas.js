const Detalleventa = require("../models/detalleventas");
const venta = require('../models/ventas');

const httpDventas = {
   // Insertar un nuevo detalle de venta
   postInsertar: async (req, res) => {
    const { idventa, idproducto, sistema_pago } = req.body; // Obtener los datos de la solicitud
    try {
        // Crear un nuevo documento de detalle de venta con los datos proporcionados
        const nuevodetalleVenta = new Detalleventa({
            idventa,
            idproducto,
            sistema_pago
        });

        // Guardar el nuevo detalle de venta en la base de datos
        await nuevodetalleVenta.save();

        // Responder con un mensaje de éxito
        res.status(201).json({ mensaje: "Detalle de venta creado exitosamente" });
    } catch (error) {
        // Manejar errores internos del servidor
        console.error("Error al insertar detalle de venta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
},
  // Obtener detalles de venta por ID de venta
  getDetallVentas: async (req, res) => {
    const { idVenta } = req.params;
    try {
      const detallesVenta = await Detalleventa.find({ venta: idVenta });
      res.json({ detallesVenta });
    } catch (error) {
      console.error("Error al obtener detalles de venta por ID de venta:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },


  // Modificar un detalle de venta existente
  putModificar:async (req, res) => {
    const { id } = req.params;
    const { idventa, idproducto, sistema_pago } = req.body; // Obtener los datos actualizados
    try {
        // Buscar y actualizar el detalle de venta por su ID
        const detalleVentaActualizado = await Detalleventa.findByIdAndUpdate(id, {
            idventa,
            idproducto,
            sistema_pago
         // Actualizar el descuento del detalle de venta
        }, { new: true }); // Esto asegura que se devuelva el documento actualizado

        // Verificar si el detalle de venta fue encontrado y actualizado
        if (!detalleVentaActualizado) {
            return res.status(404).json({ error: "Detalle de venta no encontrado" });
        }

        // Responder con un mensaje de éxito y el detalle de venta actualizado
        res.json({ mensaje: "Detalle de venta actualizado exitosamente", detalleVenta: detalleVentaActualizado });
    } catch (error) {
        // Manejar errores internos del servidor
        console.error("Error al actualizar detalle de venta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
},

  // Eliminar un detalle de venta
  deleteDetalleventa:async (req, res) => {
    const { id } = req.params;
    try {
      // Aquí iría el código para eliminar el detalle de venta con el ID proporcionado
      // Por ejemplo, si estás utilizando una base de datos, podrías hacer algo como esto:
      await Detalleventa.findByIdAndDelete(id); // Suponiendo que usas Mongoose para MongoDB
  
      res.json({ mensaje: "Detalle de venta eliminado exitosamente" });
    } catch (error) {
      console.error("Error al eliminar detalle de venta:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

module.exports = { httpDventas };



