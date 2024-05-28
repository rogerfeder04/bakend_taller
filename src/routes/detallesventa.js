
const express = require("express");
const router = express.Router();
const {check} = require('express-validator');

const { httpDventas } = require('../controllers/detallesventas');
const {productoHelper}=require('../helpers/producto');
const {ventaHelper}=require('../helpers/ventas');
const {DetallesventaHelper}=require('../helpers/detalleventas');
const { validarCampos } = require("../middlewares/validar-campos");
const Detalleventa = require("../models/detalleventas");


// const router = router()


router.get("/listartodo", httpDventas.getDetallVentas);//get//listar todo el carrito


router.post("/Insertardetalleventa", [
    check('idventa', 'No es un ID es..').isMongoId(),
    check('idventa').custom(ventaHelper.existeVentaID),
    check("idproducto", "No es un ID es..").isMongoId(),
    check("idproducto").custom(productoHelper.existeProductoID),
    check('sistema_pago', 'El campo es obligatorio!').not().isEmpty(),
    validarCampos
], httpDventas.postInsertar);//insertar


router.put("/Modificar/:id",[
    check('idventa', 'No es un ID es..').isMongoId(),
    check('idventa').custom(ventaHelper.existeVentaID),
    check("idproducto", "No es un ID es..").isMongoId(),
    check("idproducto").custom(productoHelper.existeProductoID),
    check('sistema_pago', 'El campo es obligatorio!').not().isEmpty(),
    validarCampos
], httpDventas.putModificar);//modificar


router.delete("/eliminarDetalVenta/:id",[
    check('id', 'No es un ID es..').isMongoId(),
    check('id').custom(DetallesventaHelper.existeDetalVentaID),
    validarCampos
], httpDventas.deleteDetalleventa)// delet//eliminar


module.exports=router;