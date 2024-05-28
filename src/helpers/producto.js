
const Producto=require('../models/producto');

const productoHelper = {

  existeProductoID: async (id, req) => {
    if (id) {
        const existe = await Producto.findOne({ id })
        if (existe) {
            if (req.req.method === "PUT") {
                if (existe.id !== req.req.productobd.id)
                    throw new Error(`Ya existe ese id en la base de datos!!! ${id}`)

            } else {
                throw new Error(`Ya existe ese id en la base de datos!!! ${id}`)
            }
        }
    }
},
existeNombre: async (nombre, req) => {
    if (nombre) {
        const existe = await Producto.findOne({ nombre })
        if (existe) {
            if (req.req.method === "PUT") {
                if (existe.nombre !== req.req.productobd.nombre)
                    throw new Error(`Ya existe ese nombre en la base de datos!!! ${id}`)

            } else {
                throw new Error(`Ya existe ese nombre en la base de datos!!! ${id}`)
            }
        }
    }
},
  existeProductoID: async (id, req) => {
    if (id) {
        const existe = await Producto.findOne({ id })
        if (existe) {
            if (req.req.method === "PUT") {
                if (existe.id !== req.req.productobd.id)
                    throw new Error(`Ya existe ese id en la base de datos!!! ${id}`)

            } else {
                throw new Error(`Ya existe ese id en la base de datos!!! ${id}`)
            }
        }
    }
},
    

    existeEmail: async (email, req) => {
        if (email) {
            const existe = await Usuario.findOne({ email })
            if (existe) {
                if (req.req.method === "PUT") {
                    if (existe.email !== req.req.usuariobd.email)
                        throw new Error(`Ya existe ese email en la base de datos!!! ${email}`)

                } else {
                    throw new Error(`Ya existe ese email en la base de datos!!! ${email}`)
                }
            }
        }
    },

    verificarEmail: async (email, req) => {

        const existe = await Usuario.findOne({ email });

        if (!existe) {
            throw new Error(`El email no está registrado`)
        }

        req.req.usuariobd = existe;

    }
            
}


module.exports= {productoHelper}