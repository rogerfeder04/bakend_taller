
const Cliente = require('../models/clientes')

const clienteHelper = {

    existeClienteID: async (id, req) => {
        const existe = await Cliente.findById(id)
        if (!existe) {
            throw new Error(`Registro no existe ${id}`)
        }

        req.req.clientebd = existe
    },
    existenombrecliente:async (nombre, req) => {
        if (nombre) {
            const existe = await Cliente.findOne({ nombre })
            if (existe) {
                if (req.req.method === "PUT") {
                    if (existe.nombre !== req.req.clientebd.nombre)
                        throw new Error(`Ya existe ese nombre la base de datos!!! ${nombre}}`)

                } else {
                    throw new Error(`Ya existe ese nombre en la base de datos!!! ${nombe}`)
                }
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
            const existe = await Cliente.findOne({ email })
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

        req.req.usuariobd = existe;

    }

}
module.exports= {clienteHelper}