const Cliente = require("../models/clientes");

const httpClientes = {
  // Obtener todos los clientes
  getlistartodos: async (req, res) => {
    try {
      const clientes = await Cliente.find();
      res.json({ clientes });
    } catch (error) {
      console.error("Error al obtener todos los clientes:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  // Obtener un cliente por ID
  getlistarid: async (req, res) => {
    const { id } = req.params;
    try {
      const cliente = await Cliente.findById(id);
      if (!cliente) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }
      res.json({ cliente });
    } catch (error) {
      console.error("Error al obtener el cliente por ID:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  // Obtener clientes activos
  getlistaractivos: async (req, res) => {
    try {
      const clientesActivos = await Cliente.find({ estado: 1 });
      res.json({ clientesActivos });
    } catch (error) {
      console.error("Error al obtener los clientes activos:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  // Insertar un nuevo cliente
  postInsertar: async (req, res) => {
    const { nombre, direccion, telefono, email, documento } = req.body;
    try {
      const nuevoCliente = new Cliente({
        nombre,
        direccion,
        telefono,
        email,
        documento
      });
      await nuevoCliente.save();
      res.status(201).json({ mensaje: "Cliente creado exitosamente" });
    } catch (error) {
      console.error("Error al insertar el cliente:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  // Modificar un cliente existente
  putModificar: async (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, telefono, email, documento } = req.body;
    try {
        const clienteActualizado = await Cliente.findByIdAndUpdate(id, {
            nombre,
            direccion,
            telefono,
            email,
            documento
        }, { new: true }); // Agrega { new: true } para devolver el documento actualizado

        if (!clienteActualizado) {
            return res.status(404).json({ error: "Cliente no encontrado" });
        }
        res.json({ mensaje: "Cliente actualizado exitosamente", cliente: clienteActualizado });
    } catch (error) {
        console.error("Error al actualizar el cliente:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
},

  // Activar un cliente
  putActivar: async (req, res) => {
    const { id } = req.params;
    try {
      const clienteActivado = await Cliente.findByIdAndUpdate(id, { estado: 1 });
      if (!clienteActivado) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }
      res.json({ mensaje: "Cliente activado exitosamente" });
    } catch (error) {
      console.error("Error al activar el cliente:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  },

  // Desactivar un cliente
  putDesactivar: async (req, res) => {
    const { id } = req.params;
    try {
      const clienteDesactivado = await Cliente.findByIdAndUpdate(id, { estado: 0 });
      if (!clienteDesactivado) {
        return res.status(404).json({ error: "Cliente no encontrado" });
      }
      res.json({ mensaje: "Cliente desactivado exitosamente" });
    } catch (error) {
      console.error("Error al desactivar el cliente:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  }
};

module.exports = { httpClientes };