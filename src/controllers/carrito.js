const Carrito = require("../models/carrito");
const Producto = require("../models/producto");
const httpCarrito = {
  // Obtener el carrito de compras de un cliente específico
  getListarcliente: async (req, res) => {
    const { idCliente } = req.params;
    try {
      const carritoCliente = await Carrito.find({ idcliente: idCliente });
      res.json({ carritoCliente });
    } catch (error) {
      console.error("Error al obtener el carrito del cliente:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  // Agregar un producto al carrito de compras de un cliente
  postCarrito: async (req, res) => {
    const { idcliente, idproducto, cantidad, estado } = req.body;
    try {
      // Verificar si los datos requeridos están presentes en el cuerpo de la solicitud
      if (!idcliente || !idproducto || !cantidad || !estado) {
        return res
          .status(400)
          .json({
            error: "Faltan datos requeridos para agregar producto al carrito",
          });
      }

      // Consultar el producto para obtener su precio
      const producto = await Producto.findById(idproducto);

      // Verificar si el producto existe
      if (!producto) {
        return res.status(404).json({ error: "El producto no existe" });
      }

      // Verificar si el producto ya está en el carrito del cliente
      const carritoExistente = await Carrito.findOne({
        idcliente: idcliente,
        idproducto: idproducto,
      });

      if (carritoExistente) {
        // Si el producto ya está en el carrito, responder con un mensaje indicando que ya está insertado
        return res
          .status(400)
          .json({
            error: "El producto ya está insertado en el carrito del cliente",
          });
      }

      // Obtener el precio del producto y calcular el total del nuevo item del carrito
      const precioProducto = producto.precio;
      const totalItem = cantidad * precioProducto;

      // Calcular el total actual del carrito sumando el total del nuevo item al total anterior del carrito
      const carritoActual = await Carrito.findOne({ idcliente: idcliente });
      const totalCarrito = carritoActual
        ? carritoActual.total + totalItem
        : totalItem;

      // Crear un nuevo documento de carrito con los datos proporcionados y el total calculado
      const nuevoItemCarrito = new Carrito({
        idcliente: idcliente,
        idproducto: idproducto,
        cantidad: cantidad,
        estado: estado,
        total: totalCarrito, // Total del carrito es la suma del total actual y el total del nuevo item
      });

      // Guardar el nuevo elemento del carrito en la base de datos
      await nuevoItemCarrito.save();

      // Devolver una respuesta con estado 201 (creado) y un mensaje de éxito
      res
        .status(201)
        .json({ mensaje: "Producto agregado al carrito exitosamente" });
    } catch (error) {
      // Manejar errores internos del servidor
      console.error("Error al agregar producto al carrito:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  // Eliminar un producto del carrito de compras de un cliente
  deleteCarrito: async (req, res) => {
    const { id } = req.params;
    try {
      await Carrito.findByIdAndDelete(id);

      res.json({ mensaje: "Producto eliminado del carrito exitosamente" });
    } catch (error) {
      console.error("Error al eliminar producto del carrito:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

module.exports = { httpCarrito };
