const Venta=require('../models/ventas')
const ventaHelper = {

    existeventaID: async (id, req) => {
        const existe = await Venta.findById(id)
        if (!existe) {
            throw new Error(`Registro no existe ${id}`)
        }

        req.req.ventabd = existe
    },

    existeVentaID: async (id, req) => {
        const existe = await Venta.findById(id)
        if (!existe) {
            throw new Error(`Registro no existe ${id}`)
        }

        req.req.ventabd = existe
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
    }

}
module.exports= {ventaHelper}