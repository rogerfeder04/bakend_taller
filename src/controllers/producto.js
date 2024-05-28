const producto = require("../models/producto");
const Producto = require("../models/producto")

const httpProducto = {

  getProducto: async (req, res) => {
    const { stockminimo, precio, estado } = req.query;
    let consulta = {};

    if (stockminimo) {
      consulta.stockminimo = { $lt: stockminimo };
    }
    if (precio) {
      consulta.precio = { $gt: precio };
    }
    if (estado) {
      consulta.estado = { $eq: estado };
    }

    try {
      const productos = await Producto.find(consulta);
      res.json({ productos });
    } catch (error) {
      console.error("Error al obtener productos:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },
  getProductoId: async (req, res) => {
    const { id } = req.params;
    try {
        const producto = await Producto.findById(id);
        if (!producto) {
            return res.status(404).json({ error: "Producto no encontrado" });
        }
        res.json({ producto }); // Cambiado de cliente a producto
    } catch (error) {
        console.error("Error al obtener el producto por ID:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
},

getProductosBajoStock:async (req, res) => {
  try {
      // Consultar productos con stock mínimo entre 0 y 5
      const productos = await Producto.find({ stockminimo: { $gte: 0, $lte: 5 } });

      // Verificar si se encontraron productos
      if (productos.length === 0) {
          return res.status(404).json({ mensaje: "No hay productos con stock mínimo entre 0 y 5" });
      }

      // Enviar la lista de productos con stock mínimo entre 0 y 5
      res.json({ productos });
  } catch (error) {
      console.error("Error al obtener los productos con stock mínimo entre 0 y 5:", error);
      res.status(500).json({ error: "Error interno del servidor" });
  }
},




  getpreciomayor:async (req, res) => {
    try {
        // Consultar productos con precio superior a 1000000
        const productos = await Producto.find({ precio: { $gte: 1000000 } });

        // Verificar si se encontraron productos
        if (productos.length === 0) {
            return res.status(404).json({ mensaje: "No hay productos con precio superior a 1000000" });
        }

        // Enviar la lista de productos con precio superior a 1000000
        res.json({ productos });
    } catch (error) {
        console.error("Error al obtener los productos con precio superior a 1000000:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
},

  getListaactivos: async (req, res) => {
    try {
      const productosActivos = await Producto.find({ estado: 1 });
      res.json({ productosActivos });
    } catch (error) {
      console.error("Error al obtener la lista de productos activos:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },
  getListainactivos: async (req, res) => {
    try {
      const productosInactivos = await Producto.find({ estado: 0 });
      res.json({ productosInactivos });
    } catch (error) {
      console.error("Error al obtener la lista de productos activos:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  postInsertar: async (req, res) => {
    const { usuario, nombre, precio, cantidad, stockminimo, estado } = req.body;
    try {
        const nuevoProducto = new Producto({
            usuario, // Inserta el ID del usuario en el producto
            nombre,
            precio,
            cantidad,
            stockminimo,
            estado
        });
        await nuevoProducto.save();
        res.status(201).json({ mensaje: "Producto creado exitosamente" });
    } catch (error) {
        console.error("Error al insertar producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
},

putModificar: async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, cantidad, stockminimo, estado } = req.body;
  try {
    const producto = await Producto.findByIdAndUpdate(id, {
      $set: {
        nombre,
        precio,
        cantidad,
        stockminimo,
        estado
      }
    }, { new: true });
    if (!producto) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json({ mensaje: "Producto modificado exitosamente", producto });
  } catch (error) {
    console.error("Error al modificar producto:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
},



  putActivar: async (req, res) => {
    const { id } = req.params;
    try {
      const producto = await Producto.findByIdAndUpdate(id, { estado: 1 });
      if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json({ mensaje: "Producto activado exitosamente" });
    } catch (error) {
      console.error("Error al activar producto:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  putDesactivar: async (req, res) => {
    const { id } = req.params;
    try {
      const producto = await Producto.findByIdAndUpdate(id, { estado: 0 });
      if (!producto) {
        return res.status(404).json({ error: "Producto no encontrado" });
      }
      res.json({ mensaje: "Producto desactivado exitosamente" });
    } catch (error) {
      console.error("Error al desactivar producto:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
}

module.exports = { httpProducto };
// ,
  
//     getProducto: async (req, res) => {
//         const { stockminimo, precio, estado } = req.query;
      
//         let query = {};
      
//         if (stockminimo) {
//           query.stockminimo = { $lt: stockminimo };
//         }
      
//         if (precio) {
//           query.precio = { $gt: precio };
//         }
      
//         if (estado) {
//           query.estado = { $eq: estado };
//         }
      
//         const productos = await Producto.find(query);
      
//         res.json({ productos });
//       },
// getProductoxid: async (req, res) => {},
// getstock: async (req, res) => {},
// getListaactivos: async (req, res) => {},
// postInsertar: async (req, res) => {},
// putModificar: async (req, res) => {},
// putActivar: async (req, res) => {},
// putDesactivar: async (req, res) => {}
// }
