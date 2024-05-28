

const Cliente =  require('../models/clientes');
const Carrito = require('../models/carrito');

const Producto = require('../models/producto');
const Ventas = require('../models/ventas');


// const Producto  = require('../models/Producto'); // Importa el modelo de producto

const httpVentas = {

  // Insertar una nueva venta:
  postVentainsertar: async (req, res) => {
    try {
        // Recupera los datos de la solicitud
        const { idcliente,idcarrito, fecha, descuento, estado } = req.body;

        // Encuentra el carrito correspondiente en la base de datos
        const carrito = await Carrito.findById(idcarrito);
        const cliente = await Carrito.findById(idcliente);
        // Verifica si el carrito existe
        if (!carrito) {
            return res.status(404).json({ error: "El carrito especificado no existe" });
        }

        // Calcula el total de la venta basado en el total del carrito y el descuento
        let totalVenta = carrito.total;
        if (descuento) {
            totalVenta -= descuento;
        }

        // Crea un nuevo documento de venta
        const nuevaVenta = new Ventas({
           idcliente: idcliente,
            idcarrito: carrito,
            fecha: fecha,
            descuento: descuento || 0,
            estado: estado,
            total: totalVenta
        });

        // Guarda la venta en la base de datos
        await nuevaVenta.save();

        // Responde con un mensaje de éxito
        res.status(201).json({ mensaje: "Venta realizada exitosamente" });
    } catch (error) {
        console.error("Error al realizar la venta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
},
  // Obtener todas las ventas
  getVentastodo: async (req, res) => {
    try {
      const ventas = await Ventas.find();
      res.json({ ventas });
    } catch (error) {
      console.error("Error al obtener todas las ventas:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  // Obtener una venta por ID
  getventasXId: async (req, res) => {
    const { id } = req.params;
    try {
      const venta = await venta.findById(id);
      if (!venta) {
        return res.status(404).json({ error: "Venta no encontrada" });
      }
      res.json({ venta });
    } catch (error) {
      console.error("Error al obtener la venta por ID:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  // Obtener ventas activas
  getActivos: async (req, res) => {
    try {
      const ventasActivas = await Ventas.find({ estado: 1 });
      res.json({ ventasActivas });
    } catch (error) {
      console.error("Error al obtener las ventas activas:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  // Obtener todas las ventas del usuario c on ID especificado
   //aca habria que modificar el modleo con la referencia de usuario para que no me arroje vacio

  getListarventaUsuario: async (req, res) => {
    const { id } = req.params;
    try {
      const ventasUsuario = await Ventas.find({ cliente: id });
      res.json({ ventasUsuario });
    } catch (error) {
      console.error("Error al obtener las ventas del usuario:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  // Obtener todas las ventas entre dos fechas especificadas
  getTodasventasentreFechas: async (req, res) => {
    try {
        // Define manualmente las fechas de inicio y fin
        const fechaInicio = new Date('2024-05-08'); // Cambia esta fecha según sea necesario
        const fechaFin = new Date('2024-05-15'); // Cambia esta fecha según sea necesario
      
        // Busca las ventas entre las fechas especificadas
        const ventas = await Ventas.find({
            fecha: { $gte: fechaInicio, $lte: fechaFin }
        });

        // Envía las ventas encontradas como respuesta
        res.json({ ventas });
    } catch (error) {
        // Maneja cualquier error que ocurra durante la búsqueda de ventas
        console.error("Error al obtener las ventas entre fechas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
},

  // Obtener la venta con el valor máximo
  getVentaValormax: async (req, res) => {
    try {
      const ventaMaxima = await Ventas.findOne().sort({ valor: -1 });
      res.json({ ventaMaxima });
    } catch (error) {
      console.error("Error al obtener la venta con el valor máximo:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  // Obtener el total de descuento aplicado en todas las ventas
  getTotaldescuento :async (req, res) => {
    try {
        const { id } = req.params; // Suponiendo que envíes el ID de la venta como parte de la URL

        // Busca la venta específica por su ID
        const venta = await Ventas.findById(id);

        // Verifica si la venta existe
        if (!venta) {
            return res.status(404).json({ error: "La venta especificada no existe" });
        }

        // Obtiene la información del carrito asociado a la venta
        const carrito = await Carrito.findById(venta.idcarrito);

        // Verifica si el carrito existe
        if (!carrito) {
            return res.status(404).json({ error: "El carrito asociado a la venta no existe" });
        }

        // Calcula el descuento total considerando la cantidad de productos en el carrito
        const descuentoTotal = venta.descuento * carrito.cantidad;

        // Devuelve el descuento total de la venta
        res.json({ descuento: descuentoTotal });
    } catch (error) {
        console.error("Error al obtener el descuento de la venta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}
,


  // Modificar una venta existente
  posteditarVenta:async (req, res) => {
    const { id } = req.params;
    const { idcliente, idcarrito, fecha, descuento, estado } = req.body; // Actualiza los campos que deseas editar
    try {
        // Encuentra la venta correspondiente en la base de datos
        const ventaExistente = await Ventas.findById(id);
        
        // Verifica si la venta existe
        if (!ventaExistente) {
            return res.status(404).json({ error: "Venta no encontrada" });
        }

        // Encuentra el carrito correspondiente en la base de datos
        const carrito = await Carrito.findById(idcarrito);
        if (!carrito) {
            return res.status(404).json({ error: "El carrito especificado no existe" });
        }

        // Calcula el total de la venta basado en el total del carrito y el nuevo descuento
        let totalVenta = carrito.total;
        if (descuento) {
            totalVenta -= descuento;
        }

        // Actualiza los campos de la venta
        ventaExistente.idcliente = idcliente;
        ventaExistente.idcarrito = idcarrito;
        ventaExistente.fecha = fecha;
        ventaExistente.descuento = descuento;
        ventaExistente.total = totalVenta;
        // Guarda los cambios en la base de datos
        const ventaActualizada = await ventaExistente.save();

        res.json({ mensaje: "Venta actualizada exitosamente", venta: ventaActualizada });
    } catch (error) {
        console.error("Error al actualizar la venta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
},

  // Activar una venta
  putActivarVenta:async (req, res) => {
    const { id } = req.params;
    try {
        const ventaActivada = await Ventas.findByIdAndUpdate(id, { estado: 1 });
        if (!ventaActivada) {
            return res.status(404).json({ error: "Venta no encontrada" });
        }
        res.json({ mensaje: "Venta activada exitosamente" });
    } catch (error) {
        console.error("Error al activar la venta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
},

  // Desactivar una venta
  putDesactivarVenta: async (req, res) => {
    const { id } = req.params;
    try {
        const ventaDesactivada = await Ventas.findByIdAndUpdate(id, { estado: 0 });
        if (!ventaDesactivada) {
            return res.status(404).json({ error: "Venta no encontrada" });
        }
        res.json({ mensaje: "Venta desactivada exitosamente" });
    } catch (error) {
        console.error("Error al desactivar la venta:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}
}
module.exports = { httpVentas };



