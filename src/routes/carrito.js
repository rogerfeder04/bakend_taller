const express = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const router = express.Router();

const { httpCarrito } = require("../controllers/carrito");

const { CarritoHelper } = require("../helpers/carrito");
const { clienteHelper } = require("../helpers/clientes");
const { productoHelper } = require("../helpers/producto");
const { validarJWT } = require("../middlewares/validar-Token");
const jwt = require("jsonwebtoken");

// const {productoHelper}=require('../helpers/producto')
// const {usuarioHelper}=require('../helpers/usuarios')

// //VENTAS:
//listar carritoh cliente
router.get(
  "/listarCarroCliente/:idCliente",
  [
    // Cambiado de :id a :idCliente
    validarJWT,
    check("idCliente", "El cliente es obligatorio!").isMongoId(), // Cambiado de idcliente a idCliente
    check("idCliente").custom(clienteHelper.existeClienteID),
    validarCampos,
  ],
  httpCarrito.getListarcliente
);

router.post(
  "/insertarVentas",
  [
    validarJWT,
    check("idcliente", "El usuario es obligatorio!").isMongoId(),
    check("idcliente").custom(clienteHelper.existeClienteID),
    check("idproducto", "No es un ID es..").isMongoId(),
    check("idproducto").custom(productoHelper.existeProductoID),
    check("cantidad", "La cantidad debe ser un valor numérico")
      .not()
      .isEmpty()
      .isNumeric(),
    check("estado", "El documento es obligatorio!").not().isEmpty(),
    validarCampos,
  ],
  httpCarrito.postCarrito
);

router.delete(
  "/eliminarCarrito/:idcarrito",
  [
    validarJWT,
    check("idcarrito", "El carrito es obligatorio!").isMongoId(),
    check("idcarrito").custom(CarritoHelper.existeID),
    validarCampos,
  ],
  httpCarrito.deleteCarrito
); //eliminar carrito

module.exports = router;
