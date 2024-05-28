
const carrito = require('../models/carrito')



const CarritoHelper = {



    existecarritoID: async (id, req) => {
        const existe = await carrito.findById(id)
        if (!existe) {
            throw new Error(`Registro no existe ${id}`)
        }

        req.req.carritobdbd = existe
    },
    // existecarritoID:  async (id, req) => {
    //     if (id) {
    //         const existe = await carrito.findOne({ id })
    //         if (existe) {
    //             if (req.req.method === "PUT") {
    //                 if (existe.id !== req.req.Carritobd.id)
    //                     throw new Error(`Ya existe ese id en la base de datos!!! ${id}`)
    
    //             } else {
    //                 throw new Error(`Ya existe ese id en la base de datos!!! ${id}`)
    //             }
    //         }
    //     }
    // },

    existeID:  async (id, req) => {
        if (id) {
            const existe = await carrito.findById(id)
            if (!existe) {
                    
                    throw new Error(`no existe ese id en la base de datos!!! ${id}`)
                
            }
        }
    },



    existeDocumento: async (documento, req) => {
        if (documento) {
            const existe = await Cliente.findOne({ documento })
            if (existe) {
                if (req.req.method === "PUT") {
                    if (existe.documento !== req.req.clientebd.documento)
                        throw new Error(`Ya existe ese documento en la base de datos!!! ${documento}}`)

                } else {
                    throw new Error(`Ya existe ese documento en la base de datos!!! ${documento}`)
                }
            }
        }
    },

    existeEmail: async (email, req) => {
        if (email) {
            const existe = await carrito.findOne({ email })
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

        const existe = await Cliente.findOne({ email });

        if (!existe) {
            throw new Error(`El email no está registrado`)
        }

        req.req.carritobd = existe;

    },


}
module.exports = {CarritoHelper};