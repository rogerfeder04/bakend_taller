const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const { httpVentas } = require("../controllers/ventas");
const { productoHelper } = require("../helpers/producto");
const { clienteHelper } = require("../helpers/clientes");
const { CarritoHelper } = require("../helpers/carrito");
const { usuarioHelper } = require("../helpers/usuarios");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-Token");
const { ventaHelper } = require("../helpers/ventas");
//VENTAS:

router.get("/listarVentas", httpVentas.getVentastodo); // listar todo
router.get(
  "/listarpor/:id",
  [
    check("cliente", "El id usuario es obligatorio!").isMongoId(),
    check("cliente").custom(clienteHelper.existeClienteID),
    check("id", "No es un ID es..").isMongoId(),
    check("id").custom(productoHelper.existeProductoID),
    validarCampos,
  ],
  httpVentas.getventasXId
); // listar por id

router.get("/ventasactivas", httpVentas.getActivos); // listar activos e inactivos

router.get("/listarfecha", httpVentas.getTodasventasentreFechas); // get//listar todas las ventas entre dos fechas

router.get("/listarVmax", httpVentas.getVentaValormax); // get//listar las ventas con un valor superior a $$x

router.get("/descuento/:id", httpVentas.getTotaldescuento); // get//total descuento

router.post(
  "/insertarVenta",
  [
    validarJWT,
    check("idcarrito", "No, es.mongoid.").isMongoId(),
    check("idcarrito").custom(CarritoHelper.existecarritoID),
    check("idcliente", "No, es.mongoid.").isMongoId(),
    check("idcliente").custom(clienteHelper.existeClienteID),
    check("descuento", "el descuento obligatorio!").not().isEmpty().isNumeric(),
    validarCampos,
  ],
  httpVentas.postVentainsertar
); //insertar

router.put(
  "/editarVenta/:id",
  [
    check("idcarrito", "No, es.mongoid.").isMongoId(),
    check("idcarrito").custom(CarritoHelper.existecarritoID),
    check("idcliente", "No, es.mongoid.").isMongoId(),
    check("idcliente").custom(clienteHelper.existeClienteID),
    check("descuento", "el descuento obligatorio!").not().isEmpty().isNumeric(),
    validarCampos,
  ],
  httpVentas.posteditarVenta
); // modificar

router.get(
  "/listarventausuariox/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(usuarioHelper.existeUsuarioID),
    validarCampos,
  ],
  httpVentas.getListarventaUsuario
); // get//listar ventas del usuario x

router.put(
  "/activarVenta/:id",
  [
    validarJWT,
    check("id", "No, es.mongoid.").isMongoId(),
    check("id").custom(ventaHelper.existeventaID),
    validarCampos,
  ],
  httpVentas.putActivarVenta
); // activar

router.put(
  "/desactivarVenta/:id",
  [
    validarJWT,
    check("id", "No, es.mongoid.").isMongoId(),
    check("id").custom(ventaHelper.existeventaID),
    validarCampos,
  ],
  httpVentas.putDesactivarVenta
); // desactivar

// put //modificar
// put //activar
// put//desactivar

module.exports = router;
